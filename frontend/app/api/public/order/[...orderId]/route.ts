import { NextRequest, NextResponse } from "next/server";
import { verifyApiKey } from "@/lib/api-auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

const DEFAULT_HEADERS = {
    "Authorization": `Basic ${ORTHANC_AUTH}`,
};

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ orderId: string | string[] }> }
) {
    const authError = verifyApiKey(req);
    if (authError) return authError;

    try {
        const paramsData = await params;
        const orderId = Array.isArray(paramsData.orderId) ? paramsData.orderId.join('/') : paramsData.orderId;

        let study = null;
        const searchTags = ["AccessionNumber", "StudyID", "RequestedProcedureID", "StudyDate"];

        for (const tag of searchTags) {
            const queryRes = await fetch(`${ORTHANC_URL}/tools/find`, {
                method: 'POST',
                headers: {
                    ...DEFAULT_HEADERS,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Level: "Study",
                    Query: {
                        [tag]: orderId
                    },
                    Expand: true
                }),
                cache: "no-store",
            });

            if (queryRes.ok) {
                const results = await queryRes.json();
                if (results && results.length > 0) {
                    study = results[0];
                    break;
                }
            }
        }

        if (!study) {
            return NextResponse.json({ error: "Study not found" }, { status: 404 });
        }

        const uid = study.MainDicomTags?.StudyInstanceUID || "";
        const accessionNumber = study.MainDicomTags?.AccessionNumber;

        const [report, ssIntegration] = await Promise.all([
            db.radiologyReport.findFirst({
                where: { studyInstanceUid: uid },
                select: { studyInstanceUid: true, doctorName: true, doctorId: true, findings: true, examType: true, reportDate: true, measurementImages: true }
            }),
            db.satuSehatIntegration.findFirst({
                where: {
                    OR: [
                        { studyInstanceUid: uid },
                        ...(accessionNumber ? [{ accessionNumber }] : [])
                    ]
                },
                select: { accessionNumber: true, studyInstanceUid: true, status: true, satusehatId: true }
            })
        ]);

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://${req.headers.get('host')}`;
        let dicomImages: string[] = [];

        try {
            const seriesRes = await fetch(`${ORTHANC_URL}/studies/${study.ID}/series`, {
                headers: DEFAULT_HEADERS,
                cache: "no-store"
            });
            if (seriesRes.ok) {
                const seriesList = await seriesRes.json();
                for (const series of seriesList) {
                    // Jangan ambil gambar dari series ber-tipe Structured Report (SR)
                    if (series.MainDicomTags?.Modality === 'SR') {
                        continue;
                    }
                    if (series.Instances && Array.isArray(series.Instances)) {
                        for (const instanceId of series.Instances) {
                            dicomImages.push(`${baseUrl}/api/orthanc/instances/${instanceId}/preview`);
                        }
                    }
                }
            }
        } catch (e) {
            console.error("Failed to fetch instances for study:", study.ID);
        }

        const finalData = {
            id: study.ID,
            studyInstanceUid: uid,
            patientId: study.PatientMainDicomTags?.PatientID || study.MainDicomTags?.PatientID || "",
            patientName: study.PatientMainDicomTags?.PatientName || study.MainDicomTags?.PatientName || "",
            studyDate: study.MainDicomTags?.StudyDate || "",
            accessionNumber: accessionNumber || "",
            orderId: study.MainDicomTags?.StudyID || study.MainDicomTags?.RequestedProcedureID || accessionNumber || "",
            measurementReport: report || null,
            satusehat: ssIntegration || null,
            dicomImages,
        };

        return NextResponse.json({ data: finalData });
    } catch (error: any) {
        console.error("[PUBLIC_ORDER_STUDY_GET]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

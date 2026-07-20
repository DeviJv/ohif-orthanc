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
    { params }: { params: Promise<{ studyId: string }> }
) {
    const authError = verifyApiKey(req);
    if (authError) return authError;

    try {
        const { studyId } = await params;

        if (!studyId) {
            return NextResponse.json({ error: "Missing required parameter: studyId" }, { status: 400 });
        }

        // Search by StudyInstanceUID directly
        let queryBody: any = {
            Level: "Study",
            Query: {
                "StudyInstanceUID": studyId
            },
            Expand: true
        };

        const queryRes = await fetch(`${ORTHANC_URL}/tools/find`, {
            method: 'POST',
            headers: { ...DEFAULT_HEADERS, 'Content-Type': 'application/json' },
            body: JSON.stringify(queryBody),
            cache: "no-store",
        });

        let studies = [];
        if (queryRes.ok) {
            studies = await queryRes.json();
        }

        if (!studies || studies.length === 0) {
            return NextResponse.json({ error: "Study not found with provided studyId" }, { status: 404 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://${req.headers.get('host')}`;
        
        // Since StudyInstanceUID is unique, we just take the first match
        const study = studies[0];
        
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

        let dicomImages: string[] = [];
        try {
            const seriesRes = await fetch(`${ORTHANC_URL}/studies/${study.ID}/series`, {
                headers: DEFAULT_HEADERS,
                cache: "no-store"
            });
            if (seriesRes.ok) {
                const seriesList = await seriesRes.json();
                for (const series of seriesList) {
                    if (series.MainDicomTags?.Modality === 'SR') continue;
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

        // Return a single object to match the order API structure
        return NextResponse.json({ data: finalData });
    } catch (error: any) {
        console.error("[PUBLIC_STUDY_UID_GET]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

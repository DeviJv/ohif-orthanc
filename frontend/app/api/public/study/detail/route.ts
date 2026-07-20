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

export async function GET(req: NextRequest) {
    const authError = verifyApiKey(req);
    if (authError) return authError;

    try {
        const { searchParams } = new URL(req.url);
        const patientId = searchParams.get("patientId");
        const studyDate = searchParams.get("studyDate");
        const orderId = searchParams.get("orderId");
        const studyId = searchParams.get("studyId");

        if (!patientId) {
            return NextResponse.json({ error: "Missing required parameter: patientId" }, { status: 400 });
        }

        let studies = [];
        
        // If orderId is provided, check across AccessionNumber, StudyID, RequestedProcedureID
        if (orderId) {
            const searchTags = ["AccessionNumber", "StudyID", "RequestedProcedureID"];
            for (const tag of searchTags) {
                let queryBody: any = {
                    Level: "Study",
                    Query: {
                        "PatientID": patientId,
                        [tag]: orderId
                    },
                    Expand: true
                };
                if (studyDate) queryBody.Query.StudyDate = studyDate;
                if (studyId) queryBody.Query.StudyInstanceUID = studyId;

                const queryRes = await fetch(`${ORTHANC_URL}/tools/find`, {
                    method: 'POST',
                    headers: { ...DEFAULT_HEADERS, 'Content-Type': 'application/json' },
                    body: JSON.stringify(queryBody),
                    cache: "no-store",
                });

                if (queryRes.ok) {
                    const results = await queryRes.json();
                    if (results && results.length > 0) {
                        studies = results;
                        break; // Found matches with this tag
                    }
                }
            }
        } else {
            // No orderId, search by patientId and optionally studyDate
            let queryBody: any = {
                Level: "Study",
                Query: {
                    "PatientID": patientId
                },
                Expand: true
            };
            if (studyDate) queryBody.Query.StudyDate = studyDate;
            if (studyId) queryBody.Query.StudyInstanceUID = studyId;

            const queryRes = await fetch(`${ORTHANC_URL}/tools/find`, {
                method: 'POST',
                headers: { ...DEFAULT_HEADERS, 'Content-Type': 'application/json' },
                body: JSON.stringify(queryBody),
                cache: "no-store",
            });

            if (queryRes.ok) {
                studies = await queryRes.json();
            }
        }

        if (!studies || studies.length === 0) {
            return NextResponse.json({ error: "Study not found" }, { status: 404 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://${req.headers.get('host')}`;
        const finalData = [];

        for (const study of studies) {
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

            finalData.push({
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
            });
        }

        // Return a single object to match the order API structure
        return NextResponse.json({ data: finalData[0] });
    } catch (error: any) {
        console.error("[PUBLIC_STUDY_DETAIL_GET]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

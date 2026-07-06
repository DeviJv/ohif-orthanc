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
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const searchQuery = searchParams.get("search")?.toLowerCase() || "";

        // 1. Fetch all studies from Orthanc
        const studiesRes = await fetch(`${ORTHANC_URL}/studies?expand`, {
            headers: DEFAULT_HEADERS,
            cache: "no-store",
        });

        if (!studiesRes.ok) {
            throw new Error(`Failed to fetch studies from Orthanc: ${studiesRes.statusText}`);
        }

        const allStudies: any[] = await studiesRes.json();

        // 2. Sort studies by Date/Time descending
        allStudies.sort((a: any, b: any) => {
            const dateA = a.MainDicomTags?.StudyDate || "00000000";
            const dateB = b.MainDicomTags?.StudyDate || "00000000";
            if (dateA === dateB) {
                const timeA = a.MainDicomTags?.StudyTime || "000000";
                const timeB = b.MainDicomTags?.StudyTime || "000000";
                return timeB.localeCompare(timeA);
            }
            return dateB.localeCompare(dateA);
        });

        // 3. Filter by search query if present
        let filteredStudies = allStudies;
        if (searchQuery) {
            filteredStudies = allStudies.filter(study => {
                const pName = (study.MainDicomTags?.PatientName || "").toLowerCase();
                const pId = (study.MainDicomTags?.PatientID || "").toLowerCase();
                const uid = (study.MainDicomTags?.StudyInstanceUID || "").toLowerCase();
                return pName.includes(searchQuery) || pId.includes(searchQuery) || uid.includes(searchQuery);
            });
        }

        // 4. Pagination
        const total = filteredStudies.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedStudies = filteredStudies.slice(startIndex, endIndex);

        // 5. Aggregate external data (AI, DB Reports) for paginated studies
        const studyUids = paginatedStudies.map(s => s.MainDicomTags?.StudyInstanceUID).filter(Boolean);
        const accessionNumbers = paginatedStudies.map(s => s.MainDicomTags?.AccessionNumber).filter(Boolean);

        const [aiResults, reports, ssIntegrations] = await Promise.all([
            db.aiResult.findMany({
                where: { studyInstanceUid: { in: studyUids } }
            }),
            db.radiologyReport.findMany({
                where: { studyInstanceUid: { in: studyUids } },
                select: { studyInstanceUid: true, doctorName: true, doctorId: true, findings: true, examType: true, reportDate: true }
            }),
            db.satuSehatIntegration.findMany({
                where: {
                    OR: [
                        { studyInstanceUid: { in: studyUids } },
                        { accessionNumber: { in: accessionNumbers } }
                    ]
                },
                select: { accessionNumber: true, studyInstanceUid: true, status: true, satusehatId: true }
            })
        ]);

        const aiMap = new Map(aiResults.map((r: any) => [r.studyInstanceUid, r]));
        const reportMap = new Map(reports.map((r: any) => [r.studyInstanceUid, r]));
        
        // Create satusehat map by uid or acsn
        const ssMap = new Map();
        ssIntegrations.forEach((r: any) => {
            if (r.studyInstanceUid) ssMap.set(r.studyInstanceUid, r);
            if (r.accessionNumber) ssMap.set(`acsn_${r.accessionNumber}`, r);
        });

        // 6. Map to clean API Standard JSON and fetch series for modalities
        const finalData = await Promise.all(
            paginatedStudies.map(async (study) => {
                const uid = study.MainDicomTags?.StudyInstanceUID;
                let modalities: string[] = [];

                try {
                    const seriesRes = await fetch(`${ORTHANC_URL}/studies/${study.ID}/series?expand`, { 
                        headers: DEFAULT_HEADERS, 
                        cache: "no-store" 
                    });
                    if (seriesRes.ok) {
                        const series = await seriesRes.json();
                        modalities = Array.from(new Set(
                            series
                                .map((s: any) => s.MainDicomTags?.Modality)
                                .filter(Boolean)
                        )) as string[];
                    }
                } catch (e) {
                    console.error("Failed to fetch series for study:", study.ID);
                }

                return {
                    id: study.ID,
                    studyInstanceUid: uid,
                    patientId: study.PatientMainDicomTags?.PatientID || study.MainDicomTags?.PatientID || "",
                    patientName: study.PatientMainDicomTags?.PatientName || study.MainDicomTags?.PatientName || "",
                    patientBirthDate: study.PatientMainDicomTags?.PatientBirthDate || study.MainDicomTags?.PatientBirthDate || "",
                    patientSex: study.PatientMainDicomTags?.PatientSex || study.MainDicomTags?.PatientSex || "",
                    studyDate: study.MainDicomTags?.StudyDate || "",
                    studyTime: study.MainDicomTags?.StudyTime || "",
                    studyDescription: study.MainDicomTags?.StudyDescription || "",
                    accessionNumber: study.MainDicomTags?.AccessionNumber || "",
                    orderId: study.MainDicomTags?.StudyID || study.MainDicomTags?.RequestedProcedureID || study.MainDicomTags?.AccessionNumber || "",
                    referringPhysicianName: study.MainDicomTags?.ReferringPhysicianName || "",
                    modalities,
                    labels: study.Labels || [],
                    isStable: study.IsStable,
                    aiResult: aiMap.get(uid) || null,
                    report: reportMap.get(uid) || null,
                    satusehat: ssMap.get(uid) || (study.MainDicomTags?.AccessionNumber ? ssMap.get(`acsn_${study.MainDicomTags.AccessionNumber}`) : null) || null,
                    actionLinks: {
                        viewer: `${process.env.NEXT_PUBLIC_APP_URL || `http://${req.headers.get('host')}`}/worklist?viewer=${uid}`,
                        exportPdf: `${process.env.NEXT_PUBLIC_APP_URL || `http://${req.headers.get('host')}`}/worklist?export=${uid}`,
                    }
                };
            })
        );

        return NextResponse.json({
            data: finalData,
            meta: {
                total,
                page,
                limit,
                totalPages
            }
        });
    } catch (error: any) {
        console.error("[PUBLIC_WORKLIST_GET]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

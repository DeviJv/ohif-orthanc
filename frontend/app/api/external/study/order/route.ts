import { NextRequest, NextResponse } from "next/server";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

const fetchOrthanc = async (path: string, options: RequestInit = {}) => {
    const res = await fetch(`${ORTHANC_URL}${path}`, {
        ...options,
        headers: {
            "Authorization": `Basic ${ORTHANC_AUTH}`,
            "Content-Type": "application/json",
            ...options.headers
        }
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Orthanc error (${res.status}): ${errorText || res.statusText}`);
    }
    return res.json();
};

export async function POST(req: NextRequest) {
    try {
        // --- 1. Authentication ---
        const internalKey = process.env.INTERNAL_PACS_KEY;
        const xPacsKey = req.headers.get("x-pacs-key");
        
        let authorized = xPacsKey === internalKey;
        if (!authorized) {
            const authHeader = req.headers.get("authorization");
            if (authHeader?.startsWith("Basic ")) {
                const base64 = authHeader.slice(6);
                const decoded = Buffer.from(base64, "base64").toString("utf-8");
                const password = decoded.split(":").slice(1).join(":");
                authorized = password === internalKey;
            }
        }

        if (!authorized) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // --- 2. Parse Body ---
        const body = await req.json();
        const { 
            patientId,
            studyDate,
            studyUuid,
            orderId
        } = body;

        if (!orderId) {
            return NextResponse.json({ error: "orderId is required" }, { status: 400 });
        }
        if (!patientId && !studyUuid) {
            return NextResponse.json({ error: "patientId or studyUuid is required" }, { status: 400 });
        }

        let targetStudyId: string | null = null;

        // --- 3. Identification ---
        if (studyUuid) {
            // Find by StudyInstanceUID
            const results = await fetchOrthanc("/tools/find", {
                method: "POST",
                body: JSON.stringify({
                    Level: "Study",
                    Query: { StudyInstanceUID: studyUuid }
                })
            });
            if (results.length > 0) targetStudyId = results[0];
        } else if (patientId && studyDate) {
            // Find by PatientID and StudyDate
            const results = await fetchOrthanc("/tools/find", {
                method: "POST",
                body: JSON.stringify({
                    Level: "Study",
                    Query: {
                        PatientID: patientId,
                        StudyDate: studyDate
                    }
                })
            });

            if (results.length === 0) {
                return NextResponse.json({ error: "Study not found with provided criteria" }, { status: 404 });
            }
            if (results.length > 1) {
                return NextResponse.json({ 
                    error: "Multiple studies found", 
                    count: results.length,
                    message: "Please provide studyUuid to be more specific"
                }, { status: 409 });
            }
            targetStudyId = results[0];
        } else {
            return NextResponse.json({ 
                error: "Identification criteria missing. Provide studyUuid OR (patientId AND studyDate)" 
            }, { status: 400 });
        }

        if (!targetStudyId) {
            return NextResponse.json({ error: "No matching study found" }, { status: 404 });
        }

        // --- 4. Modify Study in Orthanc ---
        let newStudyId = targetStudyId;

        const currentStudy = await fetchOrthanc(`/studies/${targetStudyId}`);
        const currentOrderId = currentStudy.MainDicomTags?.StudyID || currentStudy.MainDicomTags?.RequestedProcedureID;

        if (currentOrderId !== orderId) {
            console.log(`[EXTERNAL API] Modifying Order ID from '${currentOrderId}' to '${orderId}' for study ${targetStudyId}`);
            
            const replaceObj: any = { 
                StudyID: orderId,
                RequestedProcedureID: orderId
            };

            const modifyResult = await fetchOrthanc(`/studies/${targetStudyId}/modify`, {
                method: "POST",
                body: JSON.stringify({
                    Replace: replaceObj,
                    Keep: ["StudyInstanceUID", "SeriesInstanceUID", "SOPInstanceUID", "AccessionNumber"],
                    Force: true,
                    KeepSource: true
                })
            });
            newStudyId = modifyResult.ID;
        } else {
            console.log(`[EXTERNAL API] Order ID already matches for study ${targetStudyId}. Skipping modification.`);
        }

        return NextResponse.json({
            success: true,
            oldStudyId: targetStudyId,
            newStudyId: newStudyId,
            orderId: orderId,
            message: "Order ID updated successfully"
        });

    } catch (error: any) {
        console.error("[EXTERNAL API] Order ID Update Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

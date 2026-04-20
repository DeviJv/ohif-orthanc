import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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
        
        // Also support Basic Auth like the webhook route
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
            studyInstanceUid, 
            patientId, 
            studyDate, 
            patientName, 
            description, 
            accessionNumber 
        } = body;

        if (!accessionNumber) {
            return NextResponse.json({ error: "accessionNumber is required" }, { status: 400 });
        }

        let targetStudyId: string | null = null;

        // --- 3. Identification ---
        if (studyInstanceUid) {
            // Find by StudyInstanceUID
            const results = await fetchOrthanc("/tools/find", {
                method: "POST",
                body: JSON.stringify({
                    Level: "Study",
                    Query: { StudyInstanceUID: studyInstanceUid }
                })
            });
            if (results.length > 0) targetStudyId = results[0];
        } else if (patientId && studyDate) {
            // Find by PatientID and StudyDate (SIMRS logic)
            const query: any = {
                PatientID: patientId,
                StudyDate: studyDate
            };
            if (patientName) query.PatientName = `*${patientName}*`; // Wildcard
            if (description) query.StudyDescription = `*${description}*`;

            const results = await fetchOrthanc("/tools/find", {
                method: "POST",
                body: JSON.stringify({
                    Level: "Study",
                    Query: query
                })
            });

            if (results.length === 0) {
                return NextResponse.json({ error: "Study not found with provided criteria" }, { status: 404 });
            }
            if (results.length > 1) {
                return NextResponse.json({ 
                    error: "Multiple studies found", 
                    count: results.length,
                    message: "Please provide more specific criteria (e.g. description or patientName)"
                }, { status: 409 });
            }
            targetStudyId = results[0];
        } else {
            return NextResponse.json({ 
                error: "Identification criteria missing. Provide studyInstanceUid OR (patientId AND studyDate)" 
            }, { status: 400 });
        }

        if (!targetStudyId) {
            return NextResponse.json({ error: "No matching study found" }, { status: 404 });
        }

        // --- 4. Modify Study in Orthanc ---
        // This will replace the AccessionNumber. 
        // KeepSource: false ensures we don't have duplicates.
        const modifyResult = await fetchOrthanc(`/studies/${targetStudyId}/modify`, {
            method: "POST",
            body: JSON.stringify({
                Replace: {
                    AccessionNumber: accessionNumber
                },
                Force: true,
                KeepSource: false
            })
        });

        const newStudyId = modifyResult.ID;

        // --- 5. Sync to Database ---
        // We upsert into SatuSehatIntegration so it appears in the dashboard
        await db.satuSehatIntegration.upsert({
            where: { accessionNumber: accessionNumber },
            update: {
                studyInstanceUid: studyInstanceUid || null,
                status: "PENDING",
                updatedAt: new Date()
            },
            create: {
                accessionNumber: accessionNumber,
                studyInstanceUid: studyInstanceUid || null,
                status: "PENDING"
            }
        });

        return NextResponse.json({
            success: true,
            oldStudyId: targetStudyId,
            newStudyId: newStudyId,
            accessionNumber: accessionNumber,
            message: "Accession Number updated and registered for sync"
        });

    } catch (error: any) {
        console.error("[EXTERNAL API] Accession Update Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

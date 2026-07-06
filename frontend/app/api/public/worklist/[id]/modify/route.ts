import { NextRequest, NextResponse } from "next/server";
import { verifyApiKey } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

const DEFAULT_HEADERS = {
    "Authorization": `Basic ${ORTHANC_AUTH}`,
    "Content-Type": "application/json"
};

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = verifyApiKey(req);
    if (authError) return authError;

    try {
        const { id } = await params;
        const modifications = await req.json();

        const replaceTags: Record<string, string> = {};
        const removeTags: string[] = [];
        const criticalTags = ["PatientID", "PatientName", "StudyDate"];

        Object.entries(modifications).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() !== "") {
                replaceTags[key] = value.trim();
            } else if (!criticalTags.includes(key)) {
                removeTags.push(key);
            }
        });

        const payload: any = { 
            Force: true, 
            KeepSource: true, 
            Asynchronous: true, 
            Keep: ["StudyInstanceUID", "SeriesInstanceUID", "SOPInstanceUID"] 
        };
        if (Object.keys(replaceTags).length > 0) payload.Replace = replaceTags;
        if (removeTags.length > 0) payload.Remove = removeTags;

        const response = await fetch(`${ORTHANC_URL}/studies/${id}/modify`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            throw new Error(errJson.Message || "Failed to modify study");
        }

        const jobData = await response.json();
        
        // Polling background logic can be offloaded, we return immediately.
        return NextResponse.json({ success: true, jobId: jobData.ID, message: "Modification job started" });
    } catch (error: any) {
        console.error("[PUBLIC_STUDY_MODIFY]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

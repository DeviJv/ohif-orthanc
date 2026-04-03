import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const AI_BACKEND_URL = process.env.AI_BACKEND_URL || "http://localhost:8000";

/** POST /api/ai/trigger
 * Triggers AI analysis for a study.
 */
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { studyId } = await req.json();
        
        if (!studyId) {
            return NextResponse.json({ error: "Study ID is required" }, { status: 400 });
        }

        console.log(`Triggering AI for study: ${studyId} at ${AI_BACKEND_URL}`);

        const response = await fetch(`${AI_BACKEND_URL}/process-dicom/${studyId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`AI Backend Error: ${errorText || response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json({ success: true, message: data.message });
    } catch (error: any) {
        console.error("AI Trigger Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

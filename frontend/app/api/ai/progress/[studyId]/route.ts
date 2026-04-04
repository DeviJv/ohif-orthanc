import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const AI_BACKEND_URL = process.env.AI_BACKEND_URL || "http://ai-engine:8000";

/** GET /api/ai/progress/[studyId]
 * Proxies the progress request to the AI Backend.
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ studyId: string }> }
) {
    const { studyId } = await params;
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // const { studyId } = params;
        const response = await fetch(`${AI_BACKEND_URL}/progress/${studyId}`, {
            cache: "no-store"
        });

        if (!response.ok) {
            return NextResponse.json({ progress: 0, status: "error" });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ progress: 0, status: "offline" });
    }
}

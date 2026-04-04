import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

/** DELETE /api/ai/results/[studyInstanceUid]
 * Deletes AI analysis results for a specific study.
 */
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ studyInstanceUid: string }> }
) {
    const { studyInstanceUid } = await params;
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // const { studyInstanceUid } = params;

        if (!studyInstanceUid) {
            return NextResponse.json({ error: "Study Instance UID is required" }, { status: 400 });
        }

        console.log(`Deleting AI results for study: ${studyInstanceUid}`);

        await db.aiResult.delete({
            where: {
                studyInstanceUid: studyInstanceUid
            }
        });

        return NextResponse.json({ success: true, message: "AI results deleted successfully" });
    } catch (error: any) {
        // If it doesn't exist, that's fine, just return success
        if (error.code === 'P2025') {
            return NextResponse.json({ success: true, message: "AI results already gone" });
        }
        console.error("Delete AI Result Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

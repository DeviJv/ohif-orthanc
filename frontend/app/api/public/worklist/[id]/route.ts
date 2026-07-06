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

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = verifyApiKey(req);
    if (authError) return authError;

    try {
        const { id } = await params;
        
        // Fetch study first to get StudyInstanceUID for DB cleanup
        const studyRes = await fetch(`${ORTHANC_URL}/studies/${id}`, {
            headers: DEFAULT_HEADERS
        });
        
        if (!studyRes.ok) {
            return NextResponse.json({ error: "Study not found" }, { status: 404 });
        }
        
        const study = await studyRes.json();
        const studyUid = study.MainDicomTags?.StudyInstanceUID;

        // Delete from Orthanc
        const deleteRes = await fetch(`${ORTHANC_URL}/studies/${id}`, {
            method: "DELETE",
            headers: DEFAULT_HEADERS
        });

        if (!deleteRes.ok) {
            throw new Error(`Failed to delete study: ${deleteRes.statusText}`);
        }

        // Cleanup AI result from DB
        if (studyUid) {
            await db.aiResult.deleteMany({
                where: { studyInstanceUid: studyUid }
            });
        }

        return NextResponse.json({ success: true, message: "Study deleted successfully" });
    } catch (error: any) {
        console.error("[PUBLIC_STUDY_DELETE]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

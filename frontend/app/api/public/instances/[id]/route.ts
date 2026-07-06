import { NextRequest, NextResponse } from "next/server";
import { verifyApiKey } from "@/lib/api-auth";

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
        
        const deleteRes = await fetch(`${ORTHANC_URL}/instances/${id}`, {
            method: "DELETE",
            headers: DEFAULT_HEADERS
        });

        if (!deleteRes.ok) {
            throw new Error(`Failed to delete instance: ${deleteRes.statusText}`);
        }

        return NextResponse.json({ success: true, message: "Instance deleted successfully" });
    } catch (error: any) {
        console.error("[PUBLIC_INSTANCE_DELETE]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

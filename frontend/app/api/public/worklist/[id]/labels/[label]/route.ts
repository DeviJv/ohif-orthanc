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

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string, label: string }> }
) {
    const authError = verifyApiKey(req);
    if (authError) return authError;

    try {
        const { id, label } = await params;
        
        const response = await fetch(`${ORTHANC_URL}/studies/${id}/labels/${label}`, {
            method: "PUT",
            headers: DEFAULT_HEADERS,
        });

        if (!response.ok) {
            throw new Error(`Failed to add label: ${response.statusText}`);
        }

        return NextResponse.json({ success: true, message: `Label '${label}' added successfully` });
    } catch (error: any) {
        console.error("[PUBLIC_LABEL_ADD]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string, label: string }> }
) {
    const authError = verifyApiKey(req);
    if (authError) return authError;

    try {
        const { id, label } = await params;
        
        const response = await fetch(`${ORTHANC_URL}/studies/${id}/labels/${label}`, {
            method: "DELETE",
            headers: DEFAULT_HEADERS,
        });

        if (!response.ok) {
            throw new Error(`Failed to remove label: ${response.statusText}`);
        }

        return NextResponse.json({ success: true, message: `Label '${label}' removed successfully` });
    } catch (error: any) {
        console.error("[PUBLIC_LABEL_REMOVE]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

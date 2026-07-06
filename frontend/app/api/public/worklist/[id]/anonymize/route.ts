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
        const body = await req.json().catch(() => ({}));
        
        // Default to Force: true to anonymize even if inconsistencies exist
        const payload = { Force: true, ...body };

        const response = await fetch(`${ORTHANC_URL}/studies/${id}/anonymize`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.Message || "Failed to anonymize study");
        }

        const data = await response.json();
        return NextResponse.json({ success: true, newStudyId: data.ID, data });
    } catch (error: any) {
        console.error("[PUBLIC_STUDY_ANONYMIZE]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

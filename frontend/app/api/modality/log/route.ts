import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { aeTitle, ipAddress, event, secret } = body;

        // Check secret token
        if (secret !== process.env.INTERNAL_PACS_KEY && secret !== "pacs_secret_token_2026") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!aeTitle || !event) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const log = await db.modalityConnection.create({
            data: {
                aeTitle,
                ipAddress: ipAddress || "unknown",
                event: event, // "CONNECTED" or "DISCONNECTED"
            },
        });

        return NextResponse.json({ success: true, id: log.id });
    } catch (error) {
        console.error("Error logging modality status:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

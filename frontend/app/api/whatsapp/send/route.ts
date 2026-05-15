import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { target, message, file, filename } = body;

        if (!target || !message) {
            return NextResponse.json({ error: "Target and message are required" }, { status: 400 });
        }

        // Get Kirimi.id Config from DB
        const configRows = await db.appConfig.findMany({
            where: { key: { in: ["KIRIMI_USER_CODE", "KIRIMI_DEVICE_ID", "KIRIMI_SECRET"] } }
        });
        const config = Object.fromEntries(configRows.map(r => [r.key, r.value]));

        if (!config["KIRIMI_USER_CODE"] || !config["KIRIMI_SECRET"]) {
            return NextResponse.json({ error: "Kirimi.id API is not configured. Please set it in Settings." }, { status: 500 });
        }

        // Prepare Kirimi.id request
        const formData = new FormData();
        formData.append("user_code", config["KIRIMI_USER_CODE"]);
        formData.append("secret", config["KIRIMI_SECRET"]);
        formData.append("device_id", config["KIRIMI_DEVICE_ID"] || "");
        formData.append("receiver", target);
        formData.append("message", message);

        if (file) {
            // Convert base64 to Buffer then to Blob
            const base64Data = file.split(",")[1] || file;
            const buffer = Buffer.from(base64Data, "base64");
            const blob = new Blob([buffer], { type: "application/pdf" });
            
            formData.append("file", blob, filename || "Laporan_Radiologi.pdf");
        }

        const response = await fetch("https://api.kirimi.id/v1/send-message-file", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log(`[WHATSAPP_SEND] Target: ${target}, File attached: ${!!file}, Kirimi.id Response:`, data);

        if (data.status === true || data.status === "true" || data.status === 200) {
            return NextResponse.json({ success: true, data });
        } else {
            console.error("[WHATSAPP_SEND] Kirimi.id Error:", data);
            return NextResponse.json({ error: data.message || "Failed to send message via Kirimi.id" }, { status: 500 });
        }

    } catch (error: any) {
        console.error("[WHATSAPP_SEND] Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

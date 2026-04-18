import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Support two auth methods:
        // 1. Basic Auth: dicom-router sends WEBHOOK_USER/WEBHOOK_PASSWORD as Basic Auth
        // 2. x-pacs-key: legacy custom header
        const internalKey = process.env.INTERNAL_PACS_KEY;
        let authorized = false;

        const authHeader = req.headers.get("authorization");
        if (authHeader?.startsWith("Basic ")) {
            try {
                const base64 = authHeader.slice(6);
                const decoded = Buffer.from(base64, "base64").toString("utf-8");
                const password = decoded.split(":").slice(1).join(":"); // handle colons in password
                authorized = password === internalKey;
            } catch { /* invalid base64, fall through */ }
        }

        if (!authorized) {
            const xPacsKey = req.headers.get("x-pacs-key");
            authorized = xPacsKey === internalKey;
        }

        if (!authorized) {
            console.error("[WEBHOOK] Unauthorized access attempt");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        const { studyInstanceUid, status, message, errorDetail, patientName } = body;

        // 1. Log the webhook event
        const log = await db.satuSehatWebhookLog.create({
            data: {
                studyInstanceUid,
                patientName,
                status: status ? "SUCCESS" : "FAILED",
                message,
                errorDetail: errorDetail || null,
                rawPayload: body
            }
        });

        console.log(`[WEBHOOK] Received from router: ${studyInstanceUid} - Status: ${status}`);

        // 2. Update SatuSehatIntegration record with syncedAt timestamp
        if (studyInstanceUid) {
            try {
                await db.satuSehatIntegration.updateMany({
                    where: { studyInstanceUid },
                    data: { syncedAt: new Date() }
                });
            } catch (dbErr) {
                // Non-fatal: log but don't fail the webhook response
                console.warn(`[WEBHOOK] Could not update syncedAt for ${studyInstanceUid}:`, dbErr);
            }
        }

        // 3. Trigger Telegram Notification
        await triggerTelegramNotification(body);

        return NextResponse.json({ success: true, logId: log.id });
    } catch (error: any) {
        console.error("[WEBHOOK] Error processing webhook:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function triggerTelegramNotification(data: any) {
    try {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) return;

        const emoji = data.status ? "✅" : "🚨";
        const title = data.status ? "Upload Gambar Berhasil" : "Gagal Upload Gambar";
        
        // Format timestamp in Asia/Jakarta
        const now = new Date();
        const formattedDate = now.toLocaleString("id-ID", { 
            timeZone: "Asia/Jakarta",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        let message = `${emoji} *${title}*\n\n`;
        message += `*Waktu:* ${formattedDate} WIB\n`;
        message += `*Pasien:* ${data.patientName || "Unknown"}\n`;
        message += `*Study UID:* ${data.studyInstanceUid || "N/A"}\n`;
        
        if (data.message) {
            message += `\n*Info:* ${data.message}\n`;
        }
        
        if (data.errorDetail) {
            message += `\n*Detail Error:* \`${JSON.stringify(data.errorDetail).substring(0, 100)}...\``;
        }

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown"
            })
        });
    } catch (err) {
        console.error("[WEBHOOK] Failed to send Telegram notification:", err);
    }
}

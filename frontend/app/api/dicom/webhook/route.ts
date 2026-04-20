import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("[WEBHOOK] Full body:", JSON.stringify(body));

        const internalKey = process.env.INTERNAL_PACS_KEY;
        let authorized = false;

        const authHeader = req.headers.get("authorization");
        if (authHeader?.startsWith("Basic ")) {
            try {
                const base64 = authHeader.slice(6);
                const decoded = Buffer.from(base64, "base64").toString("utf-8");
                const password = decoded.split(":").slice(1).join(":");
                authorized = password === internalKey;
            } catch { }
        }

        if (!authorized) {
            const xPacsKey = req.headers.get("x-pacs-key");
            authorized = xPacsKey === internalKey;
        }

        if (!authorized) {
            console.error("[WEBHOOK] Unauthorized access attempt");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { studyInstanceUid, status, message, error: errorDetail, patientName, data } = body;

        const log = await db.satuSehatWebhookLog.create({
            data: {
                studyInstanceUid: studyInstanceUid || null,
                patientName: patientName || null,
                status: status ? "SUCCESS" : "FAILED",
                message: message || null,
                errorDetail: errorDetail || null,
                rawPayload: body
            }
        });

        console.log(`[WEBHOOK] Received from router: ${studyInstanceUid || 'N/A'} - Status: ${status}, Message: ${message}`);

        if (studyInstanceUid) {
            try {
                await db.satuSehatIntegration.updateMany({
                    where: { studyInstanceUid },
                    data: { syncedAt: new Date() }
                });
            } catch (dbErr) {
                console.warn(`[WEBHOOK] Could not update syncedAt for ${studyInstanceUid}:`, dbErr);
            }
        }

        await triggerTelegramNotification(body);

        return NextResponse.json({ 
            success: true, 
            status: true,
            logId: log.id,
            message: "Webhook processed successfully"
        });
    } catch (error: any) {
        console.error("[WEBHOOK] Error processing webhook:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function triggerTelegramNotification(data: any) {
    try {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        console.log("[TELEGRAM] Starting notification - botToken:", !!botToken, "chatId:", !!chatId);

        if (!botToken || !chatId) {
            console.log("[TELEGRAM] Missing credentials, skipping");
            return;
        }

        const rawStatus = data.status ?? data.data?.status ?? data.success;
        const rawMessage = data.message;
        
        console.log("[TELEGRAM] rawStatus:", rawStatus, "rawMessage:", rawMessage);
        
        const messageText = (rawMessage || data.data?.message || "").toString().toLowerCase();
        const hasBerhasil = messageText.includes("berhasil") || messageText.includes("sukses") || messageText.includes("success");
        
        const isSuccess = 
            rawStatus === true || 
            rawStatus === "true" || 
            rawStatus === 1 ||
            rawStatus === "success" || 
            rawStatus === "SUCCESS" ||
            hasBerhasil;

        const emoji = isSuccess ? "✅" : "🚨";
        const title = isSuccess ? "Upload Gambar Berhasil" : "Gagal Upload Gambar";

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
        
        if (data.patientName) {
            message += `*Pasien:* ${data.patientName}\n`;
        }
        
        if (data.message) {
            message += `\n💬 *Info:* ${data.message}\n`;
        } else if (isSuccess) {
            message += `\n💬 *Info:* Upload ke SatuSehat berhasil\n`;
        }
        
        if (data.data?.id) {
            message += `🆔 *Resource ID:* \`${data.data.id}\`\n`;
        }

        if (!isSuccess && data.error) {
            message += `\n❌ *Error:* ${data.error}\n`;
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
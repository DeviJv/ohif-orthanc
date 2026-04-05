import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        let { botToken, chatId } = await req.json();

        // Helper to check if a value is masked
        const isMasked = (val: string) => !val || val.includes("***");

        // Resolve credentials if masked or empty
        if (isMasked(botToken)) {
            const tokenRow = await db.appConfig.findUnique({ where: { key: "TELEGRAM_BOT_TOKEN" } });
            botToken = tokenRow?.value || process.env.TELEGRAM_BOT_TOKEN || "";
        }
        if (isMasked(chatId)) {
            const chatIdRow = await db.appConfig.findUnique({ where: { key: "TELEGRAM_CHAT_ID" } });
            chatId = chatIdRow?.value || process.env.TELEGRAM_CHAT_ID || "";
        }

        if (!botToken || !chatId) {
            return NextResponse.json({ error: "Token and Chat ID are required for testing" }, { status: 400 });
        }

        const telegramUrl = `https://api.telegram.org/bot${botToken}/getMe`;
        const meResponse = await fetch(telegramUrl);
        
        if (!meResponse.ok) {
            const errorData = await meResponse.json();
            return NextResponse.json({ 
                success: false, 
                error: `Bot Token Invalid: ${errorData.description || "Unknown error"}` 
            }, { status: 400 });
        }

        const meData = await meResponse.json();
        const botName = meData.result.first_name;

        // Try to send a test message
        const sendMessageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const sendResponse = await fetch(sendMessageUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: `✅ Connection Test Successful!\n\nThis bot (${botName}) is now correctly configured for your Quantum PACS system.`,
            }),
        });

        if (!sendResponse.ok) {
            const errorData = await sendResponse.json();
            return NextResponse.json({ 
                success: false, 
                error: `Chat ID Invalid or Bot not started: ${errorData.description || "Unknown error"}` 
            }, { status: 400 });
        }

        return NextResponse.json({ 
            success: true, 
            botName 
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to test connection" }, { status: 500 });
    }
}

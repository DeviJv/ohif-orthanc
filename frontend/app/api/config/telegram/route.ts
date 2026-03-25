import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** GET /api/config/telegram
 * Returns current Telegram config.
 * Priority: DB → env var → empty string
 * Token is masked in response (show only first 6 + *** + last 4 chars)
 */
export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [tokenRow, chatIdRow] = await Promise.all([
        db.appConfig.findUnique({ where: { key: "TELEGRAM_BOT_TOKEN" } }),
        db.appConfig.findUnique({ where: { key: "TELEGRAM_CHAT_ID" } }),
    ]);

    const token = tokenRow?.value || process.env.TELEGRAM_BOT_TOKEN || "";
    const chatId = chatIdRow?.value || process.env.TELEGRAM_CHAT_ID || "";

    // Mask: show first 6 chars + *** + last 4 chars
    const maskSecret = (val: string) => {
        if (!val || val.length < 12) return val ? "***" : "";
        return `${val.slice(0, 6)}***${val.slice(-4)}`;
    };

    return NextResponse.json({
        botToken: maskSecret(token),
        chatId: maskSecret(chatId),
        hasDbToken: !!tokenRow?.value,
        hasDbChatId: !!chatIdRow?.value,
        source: tokenRow?.value ? "database" : "environment",
    });
}

/** POST /api/config/telegram
 * Saves Bot Token and/or Chat ID to DB.
 * Empty string = delete the DB entry (fall back to env)
 */
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { botToken, chatId } = await req.json();

    const ops: Promise<any>[] = [];

    if (typeof botToken === "string") {
        if (botToken.trim() === "") {
            ops.push(db.appConfig.deleteMany({ where: { key: "TELEGRAM_BOT_TOKEN" } }));
        } else {
            ops.push(
                db.appConfig.upsert({
                    where: { key: "TELEGRAM_BOT_TOKEN" },
                    update: { value: botToken.trim() },
                    create: { key: "TELEGRAM_BOT_TOKEN", value: botToken.trim() },
                })
            );
        }
    }

    if (typeof chatId === "string") {
        if (chatId.trim() === "") {
            ops.push(db.appConfig.deleteMany({ where: { key: "TELEGRAM_CHAT_ID" } }));
        } else {
            ops.push(
                db.appConfig.upsert({
                    where: { key: "TELEGRAM_CHAT_ID" },
                    update: { value: chatId.trim() },
                    create: { key: "TELEGRAM_CHAT_ID", value: chatId.trim() },
                })
            );
        }
    }

    await Promise.all(ops);

    return NextResponse.json({ success: true });
}

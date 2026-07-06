import { NextRequest, NextResponse } from "next/server";
import { verifyApiKey } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = verifyApiKey(req);
    if (authError) return authError;

    try {
        const { id } = await params;
        const body = await req.json().catch(() => ({}));
        
        const host = req.headers.get('host');
        const protocol = req.headers.get('x-forwarded-proto') || 'http';
        const telegramUrl = `${protocol}://${host}/api/telegram/send`;

        const res = await fetch(telegramUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ studyId: id, doctorId: body.doctorId })
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Failed to send to Telegram");
        }

        const result = await res.json();
        return NextResponse.json({ success: true, ...result });

    } catch (error: any) {
        console.error("[PUBLIC_TELEGRAM_SEND]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

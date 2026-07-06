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
        const body = await req.json();
        
        const host = req.headers.get('host');
        const protocol = req.headers.get('x-forwarded-proto') || 'http';
        const waUrl = `${protocol}://${host}/api/whatsapp/send`;

        const res = await fetch(waUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                target: body.target, 
                message: body.message, 
                file: body.file, 
                filename: body.filename, 
                variables: body.variables 
            })
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Failed to send to WhatsApp");
        }

        const result = await res.json();
        return NextResponse.json({ success: true, ...result });

    } catch (error: any) {
        console.error("[PUBLIC_WHATSAPP_SEND]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

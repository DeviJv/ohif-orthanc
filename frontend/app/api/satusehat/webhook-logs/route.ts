import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor"); // last item id

        const logs = await db.satuSehatWebhookLog.findMany({
            take: PAGE_SIZE,
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
            orderBy: { createdAt: "desc" }
        });

        const nextCursor = logs.length === PAGE_SIZE ? logs[logs.length - 1].id : null;

        return NextResponse.json({ logs, nextCursor });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

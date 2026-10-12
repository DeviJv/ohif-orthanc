import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    try {
        const integrations = await db.satuSehatIntegration.findMany({
            select: {
                accessionNumber: true,
                studyInstanceUid: true,
                status: true,
                satusehatId: true,
                error: true,
                syncedAt: true,
            }
        });

        return NextResponse.json(integrations, {
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error: any) {
        console.error("[SATUSEHAT_GET_ALL] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

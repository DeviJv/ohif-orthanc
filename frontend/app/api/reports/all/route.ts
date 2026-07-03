import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    try {
        const reports = await db.radiologyReport.findMany({
            select: {
                studyInstanceUid: true,
                doctorName: true,
                doctorId: true,
                isExpertise: true
            }
        });

        return NextResponse.json(reports, {
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error: any) {
        console.error("[REPORTS_GET_ALL] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

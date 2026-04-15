import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { oldUid, newUid } = await req.json();

        if (!oldUid || !newUid) {
            return NextResponse.json({ error: "oldUid and newUid are required" }, { status: 400 });
        }

        // Update the studyInstanceUid in SatuSehatIntegration
        const result = await db.satuSehatIntegration.updateMany({
            where: { studyInstanceUid: oldUid },
            data: { studyInstanceUid: newUid }
        });

        console.log(`[migrate-uid] Migrated ${result.count} record(s): ${oldUid} → ${newUid}`);

        return NextResponse.json({ success: true, migrated: result.count });
    } catch (error: any) {
        console.error("[migrate-uid] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

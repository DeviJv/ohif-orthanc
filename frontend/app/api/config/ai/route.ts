import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** GET /api/config/ai
 * Returns the current AI configuration.
 * Default to "OFF" if not set.
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const isOrthanc = searchParams.get("orthanc") === "1";
    
    if (!isOrthanc) {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    const modeRow = await db.appConfig.findUnique({ where: { key: "AI_MODE" } });
    const mode = modeRow?.value || "OFF";

    return NextResponse.json({
        mode,
        source: modeRow ? "database" : "default"
    });
}

/** POST /api/config/ai
 * Updates the global AI_MODE (AUTO | MANUAL | OFF).
 */
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { mode } = await req.json();
        
        if (!["AUTO", "MANUAL", "OFF"].includes(mode)) {
            return NextResponse.json({ error: "Invalid AI Mode" }, { status: 400 });
        }

        await db.appConfig.upsert({
            where: { key: "AI_MODE" },
            update: { value: mode },
            create: { key: "AI_MODE", value: mode },
        });

        return NextResponse.json({ success: true, mode });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    try {
        const results = await db.aiResult.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });

        return NextResponse.json(results);
    } catch (error) {
        console.error("[AI_RESULTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { studyInstanceUid, modality, conclusion, findings, isUrgent, heatmapBase64 } = body;

        if (!studyInstanceUid) {
            return new NextResponse("Missing StudyInstanceUID", { status: 400 });
        }

        // Upsert to ensure we update if already exists
        const result = await db.aiResult.upsert({
            where: { studyInstanceUid: studyInstanceUid },
            update: {
                modality,
                conclusion,
                findings,
                isUrgent,
                heatmapBase64,
                updatedAt: new Date(),
            },
            create: {
                studyInstanceUid,
                modality,
                conclusion,
                findings,
                isUrgent,
                heatmapBase64,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        
        // Emit event to trigger real-time UI update on the worklist
        try {
            const { emitStudyEvent } = require("@/lib/events");
            emitStudyEvent({ studyInstanceUid, type: "AI_DONE" });
        } catch (e) {
            console.error("Failed to emit AI_DONE event:", e);
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("[AI_RESULT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

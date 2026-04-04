import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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

        return NextResponse.json(result);
    } catch (error) {
        console.error("[AI_RESULT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

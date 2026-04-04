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
        console.error("[AI_RESULTS_GET_ALL]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

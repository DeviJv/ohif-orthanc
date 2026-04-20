import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const history = await db.modalityConnection.findMany({
            orderBy: {
                timestamp: "desc",
            },
            take: 100, // Limit to last 100 events
        });

        return NextResponse.json(history);
    } catch (error) {
        console.error("Error fetching modality history:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

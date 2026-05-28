import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        // 1. Get paginated history
        const [history, total] = await Promise.all([
            db.modalityConnection.findMany({
                orderBy: { timestamp: "desc" },
                take: limit,
                skip: skip,
            }),
            db.modalityConnection.count()
        ]);

        // 2. Get distinct active devices (last connection for each AE Title)
        const latestDevices = await db.modalityConnection.groupBy({
            by: ['aeTitle'],
            _max: { timestamp: true }
        });

        // 3. For each AE Title, fetch the full record of that last timestamp
        const activeDevices = [];
        for (const device of latestDevices) {
            if (device._max.timestamp) {
                const record = await db.modalityConnection.findFirst({
                    where: {
                        aeTitle: device.aeTitle,
                        timestamp: device._max.timestamp,
                    }
                });
                if (record) activeDevices.push(record);
            }
        }

        return NextResponse.json({ 
            history, 
            activeDevices,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error fetching modality history:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

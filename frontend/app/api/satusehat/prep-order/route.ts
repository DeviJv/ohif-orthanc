import { NextRequest, NextResponse } from "next/server";
import { SatuSehatService } from "@/lib/services/satusehat";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { patientId, patientName, accessionNumber, encounterId, conditionId, practitionerId } = body;

        if (!patientId || !patientName || !accessionNumber) {
            return NextResponse.json({ error: "patientId, patientName, and accessionNumber are required" }, { status: 400 });
        }

        const result = await SatuSehatService.createPrepBundle({
            patientId,
            patientName,
            accessionNumber,
            encounterId,
            conditionId,
            practitionerId
        });

        return NextResponse.json({
            success: true,
            ids: result.ids,
            logs: result.logs
        });
    } catch (error: any) {
        console.error("[PREP-ORDER] Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

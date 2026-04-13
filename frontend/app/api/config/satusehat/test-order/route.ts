import { NextResponse } from "next/server";
import { SatuSehatService } from "@/lib/services/satusehat";

export async function POST(req: Request) {
    try {
        const { accessionNumber, patientName } = await req.json();

        if (!accessionNumber) {
            return NextResponse.json(
                { error: "Accession Number wajib diisi" },
                { status: 400 }
            );
        }

        const result = await SatuSehatService.createTestOrder({
            accessionNumber,
            patientName
        });

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("[API TEST ORDER] Error:", error);
        return NextResponse.json(
            { error: error.message || "Terjadi kesalahan internal" },
            { status: 500 }
        );
    }
}

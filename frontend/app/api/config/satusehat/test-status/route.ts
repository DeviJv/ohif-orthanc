import { NextResponse } from "next/server";
import { SatuSehatService } from "@/lib/services/satusehat";

export async function POST(req: Request) {
    try {
        const { accessionNumber } = await req.json();

        if (!accessionNumber) {
            return NextResponse.json(
                { error: "Accession Number wajib diisi" },
                { status: 400 }
            );
        }

        const result = await SatuSehatService.getIntegrationStatus(accessionNumber);

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("[API CHECK STATUS] Error:", error);
        return NextResponse.json(
            { error: error.message || "Terjadi kesalahan internal" },
            { status: 500 }
        );
    }
}

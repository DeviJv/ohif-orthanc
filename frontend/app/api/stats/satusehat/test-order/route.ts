import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { SatuSehatService } from "@/lib/services/satusehat";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { accessionNumber, patientName } = body;

        if (!accessionNumber) {
            return NextResponse.json({ error: "Accession Number wajib diisi" }, { status: 400 });
        }

        const result = await SatuSehatService.createTestOrder({
            accessionNumber,
            patientName
        });

        return NextResponse.json({ 
            success: true, 
            message: "Test Order berhasil dibuat di SatuSehat",
            result 
        });

    } catch (error: any) {
        console.error("Test Order API Error:", error);
        return NextResponse.json({ 
            error: error.message || "Gagal membuat test order" 
        }, { status: 500 });
    }
}

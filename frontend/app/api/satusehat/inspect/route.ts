import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { SatuSehatService } from "@/lib/services/satusehat";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) {
        return NextResponse.json({ error: "Type and ID are required" }, { status: 400 });
    }

    try {
        const data = await SatuSehatService.getResourceRecord(type, id);
        return NextResponse.json({
            success: true,
            status: 200,
            kemkesResponse: data
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: error.status || 500,
            error: error.message,
            kemkesResponse: error.details || null
        }, { status: error.status || 500 });
    }
}

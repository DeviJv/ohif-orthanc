import { prisma } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const accessionNumber = searchParams.get("accessionNumber");

        if (!accessionNumber) {
            return NextResponse.json({
                success: false,
                message: "accessionNumber is required"
            }, { status: 400 });
        }

        const report = await prisma.radiologyReport.findFirst({
            where: {
                accessionNumber: accessionNumber
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        if (!report) {
            return NextResponse.json({ 
                success: false, 
                message: "Report not found for the given accessionNumber" 
            }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: report });

    } catch (error) {
        console.error("API Error [Reports By Accession]:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Internal server error" 
        }, { status: 500 });
    }
}

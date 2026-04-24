import { prisma } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const q = searchParams.get("q") || searchParams.get("accessionNumber");

        if (!q) {
            return NextResponse.json({
                success: false,
                message: "Search parameter 'q' or 'accessionNumber' is required"
            }, { status: 400 });
        }

        const reports = await prisma.radiologyReport.findMany({
            where: {
                OR: [
                    { accessionNumber: { contains: q, mode: "insensitive" } },
                    { patientName: { contains: q, mode: "insensitive" } },
                    { patientId: { contains: q, mode: "insensitive" } }
                ]
            },
            select: {
                id: true,
                patientId: true,
                studyInstanceUid: true,
                studyDate: true,
                accessionNumber: true,
                patientName: true,
                patientSex: true,
                age: true,
                address: true,
                sender: true,
                diagnosis: true,
                soap: true,
                photoNum: true,
                examType: true,
                findings: true,
                conclusion: true,
                recommendation: true,
                selectedSeries: true,
                reportDate: true,
                createdAt: true,
                updatedAt: true,
                doctorId: true,
                doctorName: true,
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json({ 
            success: true, 
            count: reports.length, 
            data: reports 
        });

    } catch (error) {
        console.error("API Error [Search Reports]:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Internal server error" 
        }, { status: 500 });
    }
}

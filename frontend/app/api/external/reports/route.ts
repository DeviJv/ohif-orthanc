import { prisma } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const xPacsKey = req.headers.get("x-pacs-key");
        if (xPacsKey !== process.env.PACS_SECRET_TOKEN) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const patientId = searchParams.get("patientId");
        const studyDate = searchParams.get("studyDate");

        // If both patientId and studyDate are provided, return detail
        if (patientId && studyDate) {
            const report = await prisma.radiologyReport.findFirst({
                where: {
                    patientId: patientId,
                    studyDate: studyDate
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
                    message: "Report not found for the given patientId and studyDate" 
                }, { status: 404 });
            }

            return NextResponse.json({ success: true, data: report });
        }

        // Otherwise, list all (with optional single filters)
        const where: any = {};
        if (patientId) where.patientId = patientId;
        if (studyDate) where.studyDate = studyDate;

        const reports = await prisma.radiologyReport.findMany({
            where,
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
        console.error("API Error [Reports]:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Internal server error" 
        }, { status: 500 });
    }
}

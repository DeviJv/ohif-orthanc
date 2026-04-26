import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Prisma } from "@/app/generated/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const patientName = searchParams.get('patientName');
        const accessionNumber = searchParams.get('accessionNumber');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        const skip = (page - 1) * limit;

        const where: Prisma.RadiologyReportWhereInput = {};

        if (patientName) {
            where.patientName = {
                contains: patientName,
                mode: 'insensitive',
            };
        }

        if (accessionNumber) {
            where.accessionNumber = {
                contains: accessionNumber,
                mode: 'insensitive',
            };
        }

        if (startDate || endDate) {
            where.studyDate = {
                gte: startDate || undefined,
                lte: endDate || undefined,
            };
        }

        const [reports, total] = await Promise.all([
            db.radiologyReport.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            db.radiologyReport.count({ where }),
        ]);

        return NextResponse.json({
            reports,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error: any) {
        console.error("[Reports API] GET Error:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json({ error: 'Invalid IDs' }, { status: 400 });
        }

        await db.radiologyReport.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        return NextResponse.json({ message: 'Reports deleted successfully' });
    } catch (error: any) {
        console.error("[Reports API] DELETE Error:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

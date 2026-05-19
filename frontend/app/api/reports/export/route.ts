import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Prisma } from "@/app/generated/prisma";
import fs from 'fs';
import path from 'path';

// Use a more reliable directory for temporary storage in container environments
const EXPORT_DIR = path.join(process.cwd(), 'storage', 'exports');

function convertToCSV(data: any[]) {
    if (data.length === 0) return '';
    
    const headers = [
        'Patient ID', 'Patient Name', 'Patient Sex', 'Age', 'Accession Number', 
        'Study Date', 'Exam Type', 'Findings', 'Doctor Name', 'Report Date', 'Created At'
    ];

    const rows = data.map(report => [
        `"${report.patientId || ''}"`,
        `"${report.patientName || ''}"`,
        `"${report.patientSex || ''}"`,
        `"${report.age || ''}"`,
        `"${report.accessionNumber || ''}"`,
        `"${report.studyDate || ''}"`,
        `"${report.examType || ''}"`,
        `"${report.findings?.replace(/"/g, '""')?.replace(/\n/g, ' ') || ''}"`,
        `"${report.doctorName || ''}"`,
        `"${report.reportDate || ''}"`,
        `"${report.createdAt || ''}"`
    ]);

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { ids, filters } = body;

        const task = await db.reportExportTask.create({
            data: {
                status: 'PROCESSING',
                filters: filters || {},
                reportIds: ids || [],
            },
        });

        // Background execution
        (async () => {
            try {
                let reports = [];
                
                if (ids && Array.isArray(ids) && ids.length > 0) {
                    reports = await db.radiologyReport.findMany({
                        where: { id: { in: ids } },
                    });
                } else {
                    const where: Prisma.RadiologyReportWhereInput = {};
                    if (filters) {
                        if (filters.patientName) {
                            where.OR = [
                                { patientName: { contains: filters.patientName, mode: 'insensitive' } },
                                { patientId: { contains: filters.patientName, mode: 'insensitive' } }
                            ];
                        }
                        if (filters.accessionNumber) {
                            where.accessionNumber = { contains: filters.accessionNumber, mode: 'insensitive' };
                        }
                        if (filters.startDate || filters.endDate) {
                            where.studyDate = {
                                gte: filters.startDate || undefined,
                                lte: filters.endDate || undefined,
                            };
                        }
                    }
                    reports = await db.radiologyReport.findMany({ where });
                }

                await db.reportExportTask.update({
                    where: { id: task.id },
                    data: { totalItems: reports.length },
                });

                const csvContent = convertToCSV(reports);
                
                if (!fs.existsSync(EXPORT_DIR)) {
                    fs.mkdirSync(EXPORT_DIR, { recursive: true });
                }
                
                const fileName = `export_${task.id}.csv`;
                const filePath = path.join(EXPORT_DIR, fileName);
                fs.writeFileSync(filePath, csvContent);

                await db.reportExportTask.update({
                    where: { id: task.id },
                    data: {
                        status: 'COMPLETED',
                        processedCount: reports.length,
                        fileUrl: `/api/reports/export/download?id=${task.id}`,
                        completedAt: new Date(),
                    },
                });
            } catch (error: any) {
                console.error("[Export Task] Error:", error);
                await db.reportExportTask.update({
                    where: { id: task.id },
                    data: { status: 'FAILED' },
                });
            }
        })();

        return NextResponse.json(task);
    } catch (error: any) {
        console.error("[Export API] Error:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const tasks = await db.reportExportTask.findMany({
            where: {
                status: { in: ['PROCESSING', 'PENDING'] },
            },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });

        const recentCompleted = await db.reportExportTask.findMany({
            where: {
                status: 'COMPLETED',
                completedAt: { gte: new Date(Date.now() - 15000) }, // Show for 15s
            },
            orderBy: { completedAt: 'desc' },
        });

        return NextResponse.json([...tasks, ...recentCompleted]);
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Prisma } from "@/app/generated/prisma";
import fs from 'fs';
import path from 'path';
import { startOfDay, endOfDay, parseISO, format } from "date-fns";

const EXPORT_DIR = path.join(process.cwd(), 'storage', 'exports');

function convertToCSV(data: any[]) {
    if (data.length === 0) return '';
    
    const headers = [
        'Time & Date', 'Resource Type', 'Action', 'Status', 'Code', 'Reference ID', 'Accession Number'
    ];

    const rows = data.map(log => [
        `"${format(new Date(log.createdAt), "yyyy-MM-dd HH:mm:ss")}"`,
        `"${log.resourceType || ''}"`,
        `"${log.method || ''}"`,
        `"${log.status || ''}"`,
        `"${log.responseCode || ''}"`,
        `"${log.resourceId || ''}"`,
        `"${log.accessionNumber || ''}"`
    ]);

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { ids, filters } = body;

        const task = await db.satuSehatLogExportTask.create({
            data: {
                status: 'PROCESSING',
                filters: filters || {},
                logIds: ids || [],
            },
        });

        // Background execution
        (async () => {
            try {
                let logs = [];
                
                if (ids && Array.isArray(ids) && ids.length > 0) {
                    logs = await db.satuSehatResourceLog.findMany({
                        where: { id: { in: ids } },
                        orderBy: { createdAt: 'desc' }
                    });
                } else {
                    const where: any = {};
                    if (filters) {
                        if (filters.environment) {
                            where.environment = filters.environment;
                        }
                        if (filters.startDate && filters.endDate) {
                            where.createdAt = {
                                gte: startOfDay(parseISO(filters.startDate)),
                                lte: endOfDay(parseISO(filters.endDate)),
                            };
                        }
                    }
                    logs = await db.satuSehatResourceLog.findMany({ 
                        where,
                        orderBy: { createdAt: 'desc' }
                    });
                }

                await db.satuSehatLogExportTask.update({
                    where: { id: task.id },
                    data: { totalItems: logs.length },
                });

                const csvContent = convertToCSV(logs);
                
                if (!fs.existsSync(EXPORT_DIR)) {
                    fs.mkdirSync(EXPORT_DIR, { recursive: true });
                }
                
                const fileName = `satusehat_export_${task.id}.csv`;
                const filePath = path.join(EXPORT_DIR, fileName);
                fs.writeFileSync(filePath, csvContent);

                await db.satuSehatLogExportTask.update({
                    where: { id: task.id },
                    data: {
                        status: 'COMPLETED',
                        processedCount: logs.length,
                        fileUrl: `/api/stats/satusehat/export/download?id=${task.id}`,
                        completedAt: new Date(),
                    },
                });
            } catch (error: any) {
                console.error("[SatuSehat Export Task] Error:", error);
                await db.satuSehatLogExportTask.update({
                    where: { id: task.id },
                    data: { status: 'FAILED' },
                });
            }
        })();

        return NextResponse.json(task);
    } catch (error: any) {
        console.error("[SatuSehat Export API] Error:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const tasks = await db.satuSehatLogExportTask.findMany({
            where: {
                status: { in: ['PROCESSING', 'PENDING'] },
            },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });

        const recentCompleted = await db.satuSehatLogExportTask.findMany({
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

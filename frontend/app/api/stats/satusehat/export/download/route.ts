import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import fs from 'fs';
import path from 'path';

const EXPORT_DIR = path.join(process.cwd(), 'storage', 'exports');

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const task = await db.satuSehatLogExportTask.findUnique({
        where: { id },
    });

    if (!task || task.status !== 'COMPLETED' || !task.fileUrl) {
        return NextResponse.json({ error: 'Export not found or not completed' }, { status: 404 });
    }

    const fileName = `satusehat_export_${id}.csv`;
    const filePath = path.join(EXPORT_DIR, fileName);

    if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="satusehat_activity_logs_${new Date().toISOString().split('T')[0]}.csv"`,
        },
    });
}

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const EXPORT_DIR = path.join(process.cwd(), 'storage', 'exports');

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return new Response('Missing ID', { status: 400 });
        }

        const fileName = `export_${id}.csv`;
        const filePath = path.join(EXPORT_DIR, fileName);

        if (!fs.existsSync(filePath)) {
            console.error(`[Export Download] File not found: ${filePath}`);
            return new Response('File not found', { status: 404 });
        }

        const fileBuffer = fs.readFileSync(filePath);

        return new Response(fileBuffer, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="measurement_reports_${id.slice(-6)}.csv"`,
            },
        });
    } catch (error: any) {
        console.error("[Export Download] Error:", error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

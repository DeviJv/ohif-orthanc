import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json({ error: 'Invalid IDs' }, { status: 400 });
        }

        const reports = await db.radiologyReport.findMany({
            where: {
                id: { in: ids },
            },
            select: {
                patientName: true,
                accessionNumber: true,
                measurementImages: true,
            },
        });

        if (reports.length === 0) {
            return NextResponse.json({ error: 'No reports found' }, { status: 404 });
        }

        const zip = new JSZip();

        for (const report of reports) {
            const folderName = `${report.patientName || 'Unknown'}_${report.accessionNumber || 'NoAcc'}`.replace(/[^a-z0-9]/gi, '_');
            const folder = zip.folder(folderName);

            const images = report.measurementImages as any[];
            if (images && Array.isArray(images)) {
                images.forEach((img: any, index: number) => {
                    if (img.base64) {
                        // Remove data:image/jpeg;base64, prefix
                        const base64Data = img.base64.split(',')[1];
                        if (base64Data) {
                            const fileName = img.name || `measurement_${index + 1}.jpg`;
                            folder?.file(fileName, base64Data, { base64: true });
                        }
                    }
                });
            }
        }

        // Using uint8array and casting to any to bypass strict type checks that are failing in this environment
        const zipContent = await zip.generateAsync({ type: 'uint8array' });

        return new Response(zipContent as any, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="measurement_reports.zip"`,
            },
        });
    } catch (error: any) {
        console.error("[Download ZIP API] Error:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

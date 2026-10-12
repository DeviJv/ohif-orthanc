import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        // Construct DICOM date query
        let dateQuery: string | null = null;
        if (startDate && endDate) {
            if (startDate === endDate) {
                dateQuery = startDate;
            } else {
                dateQuery = `${startDate}-${endDate}`;
            }
        } else if (startDate) {
            dateQuery = `${startDate}-`;
        } else if (endDate) {
            dateQuery = `-${endDate}`;
        }

        // 1. Fetch studies from Orthanc
        let orthancRes: Response;
        if (dateQuery) {
            orthancRes = await fetch(`${ORTHANC_URL}/tools/find`, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${ORTHANC_AUTH}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Level: "Study",
                    Query: { StudyDate: dateQuery },
                    Expand: true
                }),
                cache: 'no-store'
            });
        } else {
            orthancRes = await fetch(`${ORTHANC_URL}/studies?expand`, {
                headers: {
                    "Authorization": `Basic ${ORTHANC_AUTH}`
                },
                cache: 'no-store'
            });
        }

        if (!orthancRes.ok) {
            console.error(`[Merged Worklist] Failed to fetch from Orthanc. Status: ${orthancRes.status}`);
            return NextResponse.json({ error: 'Failed to fetch studies from PACS' }, { status: orthancRes.status });
        }

        const studies: any[] = await orthancRes.json();

        // 2. Fetch SatuSehat sync logs from locally hosted DB
        const integrations = await db.satuSehatIntegration.findMany();
        
        // Convert to a Map keyed by accessionNumber for O(1) lookups
        // This is stable across metadata edits (unlike studyInstanceUid)
        const integrationMap = new Map();
        for (const record of integrations) {
            // Key by accessionNumber; fallback to studyInstanceUid for legacy records
            const mapKey = record.accessionNumber;
            integrationMap.set(mapKey, record);
        }

        // 3. Merge data
        const mergedStudies = studies.map(study => {
            const dicomTags = study.MainDicomTags;
            // Use accessionNumber as primary match key; fallback to StudyInstanceUID
            const matchKey = dicomTags?.AccessionNumber || dicomTags?.StudyInstanceUID;
            
            const integrationRecord = matchKey ? integrationMap.get(matchKey) : null;
            
            return {
                ...study,
                satuSehat: integrationRecord || {
                    status: 'NOT_SYNCED',
                    error: null,
                    syncedAt: null,
                    satusehatId: null,
                    bundleResponse: null
                }
            };
        });

        // 4. Sort studies by StudyDate descending
        mergedStudies.sort((a, b) => {
            const dateA = a.MainDicomTags?.StudyDate || "00000000";
            const dateB = b.MainDicomTags?.StudyDate || "00000000";
            return dateB.localeCompare(dateA);
        });

        return NextResponse.json(mergedStudies);
    } catch (error: any) {
        console.error("[Merged Worklist] Error:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

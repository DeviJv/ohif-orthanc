import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

export async function GET() {
    try {
        // 1. Fetch studies from Orthanc
        const orthancRes = await fetch(`${ORTHANC_URL}/studies?expand`, {
            headers: {
                "Authorization": `Basic ${ORTHANC_AUTH}`
            },
            cache: 'no-store' // Avoid caching to get real-time worklist data
        });

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

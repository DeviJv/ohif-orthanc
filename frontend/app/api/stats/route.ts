import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

export async function GET() {
    try {
        // 1. Get General Statistics
        const statsResponse = await fetch(`${ORTHANC_URL}/statistics`, {
            headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
        });
        
        if (!statsResponse.ok) {
            throw new Error(`Failed to fetch orthanc stats: ${statsResponse.status}`);
        }
        
        const statsData = await statsResponse.json();

        // 2. Get All Studies (expanded to get dates and modalities)
        const studiesResponse = await fetch(`${ORTHANC_URL}/studies?expand`, {
            headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
        });

        if (!studiesResponse.ok) {
            throw new Error(`Failed to fetch studies: ${studiesResponse.status}`);
        }

        const studies = await studiesResponse.json();
        
        // 3. Process Data
        const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
        let studiesToday = 0;
        const modalityCounts: Record<string, number> = {};
        
        // Latest 5 studies
        const recentStudies = [...studies]
            .sort((a, b) => b.LastUpdate.localeCompare(a.LastUpdate))
            .slice(0, 5)
            .map(s => ({
                id: s.ID,
                patientName: s.PatientMainDicomTags?.PatientName || s.MainDicomTags?.PatientName || "Unknown",
                studyDate: s.MainDicomTags?.StudyDate,
                modality: s.MainDicomTags?.ModalitiesInStudy || "Unknown",
                lastUpdate: s.LastUpdate
            }));

        studies.forEach((s: any) => {
            // Count today's studies
            if (s.MainDicomTags?.StudyDate === today) {
                studiesToday++;
            }

            // Count modalities
            const modality = s.MainDicomTags?.ModalitiesInStudy;
            if (modality) {
                const modalities = modality.split('\\');
                modalities.forEach((m: string) => {
                    const cleanM = m.trim();
                    if (cleanM) {
                        modalityCounts[cleanM] = (modalityCounts[cleanM] || 0) + 1;
                    }
                });
            }
        });

        return NextResponse.json({
            summary: {
                totalStudies: statsData.CountStudies,
                totalPatients: statsData.CountPatients,
                studiesToday: studiesToday,
                diskSize: statsData.TotalDiskSizeMB
            },
            modalities: modalityCounts,
            recentActivity: recentStudies
        });

    } catch (error: any) {
        console.error("Stats API Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch stats" }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

const DEFAULT_HEADERS = {
    "Authorization": `Basic ${ORTHANC_AUTH}`,
};

export async function GET(req: NextRequest) {
    try {
        // 1. Fetch all studies with details to sort them properly
        const studiesRes = await fetch(`${ORTHANC_URL}/studies?expand`, {
            headers: DEFAULT_HEADERS,
            cache: "no-store",
        });

        if (!studiesRes.ok) {
            throw new Error(`Failed to fetch studies from Orthanc: ${studiesRes.statusText}`);
        }

        const allStudies: any[] = await studiesRes.json();

        // 2. Sort all studies by StudyDate and StudyTime descending to get the most recent ones
        allStudies.sort((a: any, b: any) => {
            const dateA = a.MainDicomTags?.StudyDate || "00000000";
            const dateB = b.MainDicomTags?.StudyDate || "00000000";
            if (dateA === dateB) {
                const timeA = a.MainDicomTags?.StudyTime || "000000";
                const timeB = b.MainDicomTags?.StudyTime || "000000";
                return timeB.localeCompare(timeA);
            }
            return dateB.localeCompare(dateA);
        });

        // 3. Limit removed to ensure all data from Orthanc is retrieved
        const topStudies = allStudies;

        // 4. Fetch series details for these studies to get modalities
        // We aggregate the data on the server to reduce round-trips from the browser
        const detailedStudies = await Promise.all(
            topStudies.map(async (study) => {
                try {
                    const seriesRes = await fetch(`${ORTHANC_URL}/studies/${study.ID}/series?expand`, { 
                        headers: DEFAULT_HEADERS, 
                        cache: "no-store" 
                    });

                    if (!seriesRes.ok) {
                        console.warn(`[Worklist API] Partial failure fetching series for study ${study.ID}`);
                        return {
                            ...study,
                            Modalities: []
                        };
                    }

                    const series = await seriesRes.json();
                    
                    // Extract unique modalities from series
                    const modalities = Array.from(new Set(
                        series
                            .map((s: any) => s.MainDicomTags?.Modality)
                            .filter(Boolean)
                    )) as string[];

                    return {
                        ...study,
                        Modalities: modalities
                    };
                } catch (err) {
                    console.error(`[Worklist API] Error fetching details for study ${study.ID}:`, err);
                    return {
                        ...study,
                        Modalities: []
                    };
                }
            })
        );

        return NextResponse.json(detailedStudies);
    } catch (error: any) {
        console.error("[Worklist API] General Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch worklist" }, { status: 500 });
    }
}

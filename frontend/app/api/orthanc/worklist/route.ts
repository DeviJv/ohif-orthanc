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
        // 1. Fetch study IDs from Orthanc
        const idsRes = await fetch(`${ORTHANC_URL}/studies`, {
            headers: DEFAULT_HEADERS,
            cache: "no-store",
        });

        if (!idsRes.ok) {
            throw new Error(`Failed to fetch studies from Orthanc: ${idsRes.statusText}`);
        }

        const ids: string[] = await idsRes.json();
        // Limit to top 100 to maintain performance as in the current client-side implementation
        const topIds = ids.slice(0, 100);

        // 2. Fetch details for each study and its series in parallel
        // We aggregate the data on the server to reduce round-trips from the browser
        const detailedStudies = await Promise.all(
            topIds.map(async (id) => {
                try {
                    const [studyRes, seriesRes] = await Promise.all([
                        fetch(`${ORTHANC_URL}/studies/${id}`, { headers: DEFAULT_HEADERS, cache: "no-store" }),
                        fetch(`${ORTHANC_URL}/studies/${id}/series?expand`, { headers: DEFAULT_HEADERS, cache: "no-store" })
                    ]);

                    if (!studyRes.ok || !seriesRes.ok) {
                        console.warn(`[Worklist API] Partial failure for study ${id}`);
                        return null;
                    }

                    const study = await studyRes.json();
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
                    console.error(`[Worklist API] Error fetching details for study ${id}:`, err);
                    return null;
                }
            })
        );

        // Filter out any failed fetches
        const validStudies = detailedStudies.filter(Boolean);

        // 3. Sort by StudyDate descending (consistent with orthancApi.fetchStudies)
        validStudies.sort((a: any, b: any) => {
            const dateA = a.MainDicomTags?.StudyDate || "00000000";
            const dateB = b.MainDicomTags?.StudyDate || "00000000";
            return dateB.localeCompare(dateA);
        });

        return NextResponse.json(validStudies);
    } catch (error: any) {
        console.error("[Worklist API] General Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch worklist" }, { status: 500 });
    }
}

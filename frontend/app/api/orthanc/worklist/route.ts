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
        // 1. Fetch studies and series concurrently from Orthanc (only 2 requests total)
        const [studiesRes, seriesRes] = await Promise.all([
            fetch(`${ORTHANC_URL}/studies?expand`, {
                headers: DEFAULT_HEADERS,
                cache: "no-store",
            }),
            fetch(`${ORTHANC_URL}/series?expand`, {
                headers: DEFAULT_HEADERS,
                cache: "no-store",
            }).catch((err) => {
                console.warn("[Worklist API] Could not fetch series for modalities:", err);
                return null;
            }),
        ]);

        if (!studiesRes.ok) {
            throw new Error(`Failed to fetch studies from Orthanc: ${studiesRes.statusText}`);
        }

        const allStudies: any[] = await studiesRes.json();

        // 2. Map series to study ID to extract modalities in-memory in O(N)
        const modalityMap = new Map<string, Set<string>>();
        if (seriesRes && seriesRes.ok) {
            try {
                const allSeries: any[] = await seriesRes.json();
                for (let i = 0; i < allSeries.length; i++) {
                    const s = allSeries[i];
                    const parentStudy = s.ParentStudy;
                    const modality = s.MainDicomTags?.Modality;
                    if (parentStudy && modality) {
                        let set = modalityMap.get(parentStudy);
                        if (!set) {
                            set = new Set<string>();
                            modalityMap.set(parentStudy, set);
                        }
                        set.add(modality);
                    }
                }
            } catch (err) {
                console.warn("[Worklist API] Error parsing series data:", err);
            }
        }

        // 3. Sort all studies by StudyDate and StudyTime descending to get the most recent ones
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

        // 4. Attach modalities
        const detailedStudies = allStudies.map((study) => ({
            ...study,
            Modalities: Array.from(modalityMap.get(study.ID) || []),
        }));

        return NextResponse.json(detailedStudies);
    } catch (error: any) {
        console.error("[Worklist API] General Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch worklist" }, { status: 500 });
    }
}

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
        const { searchParams } = new URL(req.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        // Construct DICOM date query (YYYYMMDD or range YYYYMMDD-YYYYMMDD)
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

        let studiesPromise: Promise<Response>;
        let seriesPromise: Promise<Response | null>;

        if (dateQuery) {
            // Server-side filtered query via Orthanc /tools/find
            studiesPromise = fetch(`${ORTHANC_URL}/tools/find`, {
                method: "POST",
                headers: {
                    ...DEFAULT_HEADERS,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Level: "Study",
                    Query: { StudyDate: dateQuery },
                    Expand: true,
                }),
                cache: "no-store",
            });

            seriesPromise = fetch(`${ORTHANC_URL}/tools/find`, {
                method: "POST",
                headers: {
                    ...DEFAULT_HEADERS,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Level: "Series",
                    Query: { SeriesDate: dateQuery },
                    Expand: true,
                }),
                cache: "no-store",
            }).catch((err) => {
                console.warn("[Worklist API] Could not fetch series for modalities:", err);
                return null;
            });
        } else {
            // Fallback: fetch all studies & series if no date range is specified
            studiesPromise = fetch(`${ORTHANC_URL}/studies?expand`, {
                headers: DEFAULT_HEADERS,
                cache: "no-store",
            });

            seriesPromise = fetch(`${ORTHANC_URL}/series?expand`, {
                headers: DEFAULT_HEADERS,
                cache: "no-store",
            }).catch((err) => {
                console.warn("[Worklist API] Could not fetch series for modalities:", err);
                return null;
            });
        }

        const [studiesRes, seriesRes] = await Promise.all([studiesPromise, seriesPromise]);

        if (!studiesRes.ok) {
            throw new Error(`Failed to fetch studies from Orthanc: ${studiesRes.statusText}`);
        }

        const allStudies: any[] = await studiesRes.json();

        // Map series to study ID to extract modalities in-memory in O(N)
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

        // For studies in date range where series modality wasn't found (e.g. SeriesDate tag missing),
        // fallback fetch series for those few studies (capped at 15)
        const missingModalityStudies = allStudies.filter(
            (s) => s.Series && s.Series.length > 0 && (!modalityMap.has(s.ID) || modalityMap.get(s.ID)!.size === 0)
        );
        if (missingModalityStudies.length > 0 && missingModalityStudies.length <= 15) {
            await Promise.all(
                missingModalityStudies.map(async (s) => {
                    try {
                        const res = await fetch(`${ORTHANC_URL}/studies/${s.ID}/series`, {
                            headers: DEFAULT_HEADERS,
                            cache: "no-store",
                        });
                        if (res.ok) {
                            const seriesList = await res.json();
                            let set = modalityMap.get(s.ID);
                            if (!set) {
                                set = new Set<string>();
                                modalityMap.set(s.ID, set);
                            }
                            for (const ser of seriesList) {
                                if (ser.MainDicomTags?.Modality) {
                                    set.add(ser.MainDicomTags.Modality);
                                }
                            }
                        }
                    } catch (e) {
                        // ignore fallback error
                    }
                })
            );
        }

        // Sort all studies by StudyDate and StudyTime descending to get the most recent ones
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

        // Attach modalities
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

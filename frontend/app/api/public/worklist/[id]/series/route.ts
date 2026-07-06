import { NextRequest, NextResponse } from "next/server";
import { verifyApiKey } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

const DEFAULT_HEADERS = {
    "Authorization": `Basic ${ORTHANC_AUTH}`,
};

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = verifyApiKey(req);
    if (authError) return authError;

    try {
        const { id } = await params;

        const studyRes = await fetch(`${ORTHANC_URL}/studies/${id}`, {
            headers: DEFAULT_HEADERS,
            cache: "no-store",
        });

        if (!studyRes.ok) {
            throw new Error(`Study not found: ${studyRes.statusText}`);
        }

        const study = await studyRes.json();
        
        const seriesDetails = await Promise.all(
            study.Series.map(async (seriesId: string) => {
                const seriesRes = await fetch(`${ORTHANC_URL}/series/${seriesId}`, {
                    headers: DEFAULT_HEADERS,
                    cache: "no-store",
                });
                return seriesRes.json();
            })
        );

        seriesDetails.sort((a, b) => {
            const numA = parseInt(a.MainDicomTags?.SeriesNumber) || 0;
            const numB = parseInt(b.MainDicomTags?.SeriesNumber) || 0;
            return numA - numB;
        });

        // Map to standard API response
        const formattedSeries = seriesDetails.map(s => ({
            id: s.ID,
            seriesInstanceUid: s.MainDicomTags?.SeriesInstanceUID,
            seriesDescription: s.MainDicomTags?.SeriesDescription,
            seriesNumber: s.MainDicomTags?.SeriesNumber,
            modality: s.MainDicomTags?.Modality,
            instancesCount: s.Instances?.length || 0,
        }));

        return NextResponse.json({ success: true, data: formattedSeries });
    } catch (error: any) {
        console.error("[PUBLIC_STUDY_SERIES_GET]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

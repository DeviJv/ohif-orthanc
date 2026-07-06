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

        const seriesRes = await fetch(`${ORTHANC_URL}/series/${id}`, {
            headers: DEFAULT_HEADERS,
            cache: "no-store",
        });

        if (!seriesRes.ok) {
            throw new Error(`Series not found: ${seriesRes.statusText}`);
        }

        const series = await seriesRes.json();
        
        const instancesDetails = await Promise.all(
            series.Instances.map(async (instanceId: string) => {
                const instanceRes = await fetch(`${ORTHANC_URL}/instances/${instanceId}`, {
                    headers: DEFAULT_HEADERS,
                    cache: "no-store",
                });
                return instanceRes.json();
            })
        );

        instancesDetails.sort((a, b) => {
            const numA = parseInt(a.MainDicomTags?.InstanceNumber) || 0;
            const numB = parseInt(b.MainDicomTags?.InstanceNumber) || 0;
            return numA - numB;
        });

        const formattedInstances = instancesDetails.map(i => ({
            id: i.ID,
            sopInstanceUid: i.MainDicomTags?.SOPInstanceUID,
            instanceNumber: i.MainDicomTags?.InstanceNumber,
            fileSize: i.FileSize,
            indexInSeries: i.IndexInSeries
        }));

        return NextResponse.json({ success: true, data: formattedInstances });
    } catch (error: any) {
        console.error("[PUBLIC_SERIES_INSTANCES_GET]", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

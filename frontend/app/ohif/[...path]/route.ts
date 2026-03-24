import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Service name is 'pacs' in docker-compose
const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathStr = path.join("/");
    const url = new URL(`/ohif/${pathStr}`, ORTHANC_URL);

    // Forward query parameters
    req.nextUrl.searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    try {
        const response = await fetch(url.toString(), {
            headers: {
                "Authorization": `Basic ${ORTHANC_AUTH}`,
            },
        });

        if (!response.ok) {
            console.error(`Orthanc OHIF error: ${response.status} for ${url.toString()}`);
        }

        const contentType = response.headers.get("content-type") || "application/octet-stream";
        const body = await response.arrayBuffer();

        return new NextResponse(body, {
            status: response.status,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error) {
        console.error("OHIF Proxy Error:", error);
        return NextResponse.json({ error: "Connection to Orthanc failed" }, { status: 500 });
    }
}

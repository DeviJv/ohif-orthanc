import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
    const url = new URL(`/${pathStr}`, ORTHANC_URL);

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

        const contentType = response.headers.get("content-type") || "application/octet-stream";
        const body = await response.arrayBuffer();

        return new NextResponse(body, {
            status: response.status,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=3600",
                "Cross-Origin-Opener-Policy": "same-origin",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cross-Origin-Resource-Policy": "cross-origin",
            },
        });
    } catch (error) {
        console.error("Orthanc Proxy Error:", error);
        return NextResponse.json({ error: "Connection to Orthanc failed" }, { status: 500 });
    }
}

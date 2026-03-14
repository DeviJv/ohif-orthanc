import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

async function proxyToOrthanc(req: NextRequest, segments: string[]) {
    const pathStr = segments.join("/");
    const url = new URL(`/dicom-web/${pathStr}`, ORTHANC_URL);

    // Forward query parameters
    req.nextUrl.searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    try {
        const fetchOptions: RequestInit = {
            method: req.method,
            headers: {
                "Authorization": `Basic ${ORTHANC_AUTH}`,
            },
        };

        // Forward request body for non-GET methods
        if (req.method !== "GET" && req.method !== "HEAD") {
            const body = await req.arrayBuffer();
            if (body.byteLength > 0) {
                fetchOptions.body = body;
                const contentType = req.headers.get("content-type");
                if (contentType) {
                    (fetchOptions.headers as Record<string, string>)["Content-Type"] = contentType;
                }
            }
        }

        // Forward Accept header for WADO-RS
        const accept = req.headers.get("accept");
        if (accept) {
            (fetchOptions.headers as Record<string, string>)["Accept"] = accept;
        }

        const response = await fetch(url.toString(), fetchOptions);

        const contentType = response.headers.get("content-type") || "application/octet-stream";
        const body = await response.arrayBuffer();

        return new NextResponse(body, {
            status: response.status,
            headers: {
                "Content-Type": contentType,
            },
        });
    } catch (error) {
        console.error("DICOMweb Proxy Error:", error);
        return NextResponse.json({ error: "Connection to Orthanc failed" }, { status: 500 });
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyToOrthanc(req, path);
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyToOrthanc(req, path);
}

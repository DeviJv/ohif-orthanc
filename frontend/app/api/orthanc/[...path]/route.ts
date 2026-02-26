import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

async function proxyRequest(req: NextRequest, segments: string[]) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const path = segments.join("/");
    const url = new URL(path, ORTHANC_URL);

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

        if (req.method !== "GET" && req.method !== "HEAD") {
            const body = await req.text();
            if (body) {
                fetchOptions.body = body;
                // Forward the content type if available
                const contentType = req.headers.get("content-type");
                if (contentType) {
                    (fetchOptions.headers as Record<string, string>)["Content-Type"] = contentType;
                }
            }
        }

        const response = await fetch(url.toString(), fetchOptions);

        if (!response.ok) {
            return NextResponse.json(
                { error: `Orthanc returned ${response.status}` },
                { status: response.status }
            );
        }

        // Support both JSON and binary if needed in the future
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            const data = await response.json();
            return NextResponse.json(data);
        } else {
            const blob = await response.blob();
            return new NextResponse(blob, {
                headers: { "Content-Type": contentType || "application/octet-stream" }
            });
        }
    } catch (error) {
        console.error("Orthanc Proxy Error:", error);
        return NextResponse.json({ error: "Connection to Orthanc failed" }, { status: 500 });
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(req, path);
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(req, path);
}

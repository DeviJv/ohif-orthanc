import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

const DEFAULT_HEADERS = {
    "Authorization": `Basic ${ORTHANC_AUTH}`,
};

function buildOrthancUrl(path: string[], req: NextRequest): string {
    const pathStr = path.join("/");
    const url = new URL(`/${pathStr}`, ORTHANC_URL);
    req.nextUrl.searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
    });
    return url.toString();
}

function buildResponseHeaders(response: Response): Record<string, string> {
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const headers: Record<string, string> = {
        "Content-Type": contentType,
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Resource-Policy": "cross-origin",
    };
    // Forward Content-Disposition if present (for file downloads)
    const disposition = response.headers.get("content-disposition");
    if (disposition) headers["Content-Disposition"] = disposition;
    return headers;
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const orthancUrl = buildOrthancUrl(path, req);

    try {
        const response = await fetch(orthancUrl, {
            headers: DEFAULT_HEADERS,
            cache: "no-store",
        });

        const body = await response.arrayBuffer();
        return new NextResponse(body, {
            status: response.status,
            headers: {
                ...buildResponseHeaders(response),
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
        });
    } catch (error) {
        console.error("Orthanc Proxy GET Error:", error);
        return NextResponse.json({ error: "Connection to Orthanc failed" }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const orthancUrl = buildOrthancUrl(path, req);

    try {
        const contentType = req.headers.get("content-type") || "application/json";
        const body = await req.arrayBuffer();

        const response = await fetch(orthancUrl, {
            method: "POST",
            headers: {
                ...DEFAULT_HEADERS,
                "Content-Type": contentType,
            },
            body,
            cache: "no-store",
        });

        const responseBody = await response.arrayBuffer();
        return new NextResponse(responseBody, {
            status: response.status,
            headers: buildResponseHeaders(response),
        });
    } catch (error) {
        console.error("Orthanc Proxy POST Error:", error);
        return NextResponse.json({ error: "Connection to Orthanc failed" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const orthancUrl = buildOrthancUrl(path, req);

    try {
        const response = await fetch(orthancUrl, {
            method: "DELETE",
            headers: DEFAULT_HEADERS,
            cache: "no-store",
        });

        // Orthanc returns 200 with empty body on successful delete
        const responseBody = await response.arrayBuffer();
        return new NextResponse(responseBody.byteLength > 0 ? responseBody : null, {
            status: response.status,
            headers: buildResponseHeaders(response),
        });
    } catch (error) {
        console.error("Orthanc Proxy DELETE Error:", error);
        return NextResponse.json({ error: "Connection to Orthanc failed" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const orthancUrl = buildOrthancUrl(path, req);

    try {
        const contentType = req.headers.get("content-type") || "application/json";
        const body = await req.arrayBuffer();

        const response = await fetch(orthancUrl, {
            method: "PUT",
            headers: {
                ...DEFAULT_HEADERS,
                "Content-Type": contentType,
            },
            body: body.byteLength > 0 ? body : undefined,
            cache: "no-store",
        });

        const responseBody = await response.arrayBuffer();
        return new NextResponse(responseBody.byteLength > 0 ? responseBody : null, {
            status: response.status,
            headers: buildResponseHeaders(response),
        });
    } catch (error) {
        console.error("Orthanc Proxy PUT Error:", error);
        return NextResponse.json({ error: "Connection to Orthanc failed" }, { status: 500 });
    }
}

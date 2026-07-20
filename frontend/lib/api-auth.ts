import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.PUBLIC_API_KEY || "pacs_secret_token_2026";

export function verifyApiKey(req: NextRequest): NextResponse | null {
    const providedKey = req.headers.get("x-pacs-key");
    if (!providedKey || providedKey !== API_KEY) {
        return NextResponse.json({ error: "Unauthorized. Invalid or missing API Key." }, { status: 401 });
    }
    return null; // Null means validation passed
}

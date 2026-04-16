import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/config/satusehat/dicom-router-compose
 * Fetches the official docker-compose.yml from Kemenkes SATUSEHAT API.
 * Uses stored CLIENT_ID & CLIENT_SECRET to get a Bearer Token first.
 */
export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // 1. Load current SatuSehat config from DB
        const dbSetting = await db.satuSehatSetting.findFirst({ where: { id: 1 } });

        const clientId     = dbSetting?.clientId     || process.env.SATUSEHAT_CLIENT_ID     || "";
        const clientSecret = dbSetting?.clientSecret || process.env.SATUSEHAT_CLIENT_SECRET || "";
        const env          = dbSetting?.environment  || process.env.SATUSEHAT_ENV           || "staging";

        if (!clientId || !clientSecret) {
            return NextResponse.json(
                { error: "Client ID dan Client Secret belum dikonfigurasi. Silakan isi di tab Integrasi SatuSehat terlebih dahulu." },
                { status: 400 }
            );
        }

        const baseUrl = env === "production"
            ? "https://api-satusehat.kemkes.go.id"
            : "https://api-satusehat-stg.dto.kemkes.go.id";

        // 2. Get Bearer Token
        const authUrl    = `${baseUrl}/oauth2/v1/accesstoken?grant_type=client_credentials`;
        const authParams = new URLSearchParams();
        authParams.append("client_id",     clientId.trim());
        authParams.append("client_secret", clientSecret.trim());

        const authResponse = await fetch(authUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: authParams.toString(),
        });

        if (!authResponse.ok) {
            const errText = await authResponse.text();
            return NextResponse.json(
                { error: `Gagal mendapatkan token SatuSehat (${authResponse.status}): ${errText.substring(0, 200)}` },
                { status: 400 }
            );
        }

        const authData    = await authResponse.json();
        const accessToken = authData.access_token;

        if (!accessToken) {
            return NextResponse.json(
                { error: "access_token tidak ditemukan dalam response autentikasi." },
                { status: 400 }
            );
        }

        // 3. Fetch official docker-compose.yml from Kemenkes
        const composeUrl      = `${baseUrl}/dicom-router`;
        const composeResponse = await fetch(composeUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept":        "*/*",
            },
        });

        const composeText = await composeResponse.text();

        if (!composeResponse.ok) {
            return NextResponse.json(
                {
                    error: `Gagal mengunduh docker-compose.yml dari Kemenkes (${composeResponse.status}): ${composeText.substring(0, 200)}`,
                    tokenOk: true,
                },
                { status: 502 }
            );
        }

        return NextResponse.json({
            success:  true,
            content:  composeText,
            env,
            baseUrl,
            tokenPrefix: `${accessToken.substring(0, 20)}...`,
        });

    } catch (error: any) {
        console.error("[DICOM-ROUTER-COMPOSE] Error:", error);
        return NextResponse.json(
            { error: error.message || "Terjadi kesalahan sistem." },
            { status: 500 }
        );
    }
}

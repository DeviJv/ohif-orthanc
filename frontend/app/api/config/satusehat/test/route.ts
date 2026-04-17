import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        let { clientId, clientSecret, env, organizationId } = await req.json();

        if (!clientId || !clientSecret) {
            return NextResponse.json({ error: "Client ID and Client Secret are required for testing" }, { status: 400 });
        }

        const baseUrl = env === "production" 
            ? "https://api-satusehat.kemkes.go.id" 
            : "https://api-satusehat-stg.dto.kemkes.go.id";
            
        // Move grant_type to URL as seen in user's Postman screenshot
        const authUrl = `${baseUrl}/oauth2/v1/accesstoken?grant_type=client_credentials`;

        const params = new URLSearchParams();
        params.append("client_id", clientId.trim());
        params.append("client_secret", clientSecret.trim());

        const authResponse = await fetch(authUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        const authText = await authResponse.text();
        let authData: any = {};
        try { authData = JSON.parse(authText); } catch (e) { authData = { message: authText }; }

        if (!authResponse.ok) {
            return NextResponse.json({ 
                success: false, 
                error: `Gagal Auth (Status ${authResponse.status}): ${authData.message || authData.error_description || authText.substring(0, 100)}`
            }, { status: 400 });
        }

        const token = authData.access_token;

        // STEP 2: Test FHIR Access by fetching Organization details
        // We already have organizationId from the initial req.json() at the top
        if (organizationId) {
            const fhirUrl = `${baseUrl}/fhir-r4/v1/Organization/${organizationId}`;
            const fhirResponse = await fetch(fhirUrl, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "X-Organization-Id": organizationId
                }
            });

            const fhirText = await fhirResponse.text();
            
            if (!fhirResponse.ok) {
                let fhirError = fhirText;
                try {
                    const outcome = JSON.parse(fhirText);
                    if (outcome.issue && outcome.issue.length > 0) {
                        const issue = outcome.issue[0];
                        fhirError = issue.details?.text || issue.diagnostics || JSON.stringify(issue);
                    }
                } catch (e) {}

                return NextResponse.json({ 
                    success: false, 
                    error: `Token OK, tapi FHIR Ditolak (401): ${fhirError.substring(0, 150)}`,
                    debug: { 
                        token_prefix: `${token.substring(0, 12)}...`,
                        org_id_used: organizationId,
                        fhir_status: fhirResponse.status
                    }
                }, { status: 400 });
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: "Koneksi Berhasil! Token diperoleh dan akses FHIR divalidasi.",
            data: {
                token: token,
                issued_at: authData.issued_at,
                application_name: authData.application_name,
                organization_verified: !!organizationId
            }
        });
    } catch (error: any) {
        console.error("[SATUSEHAT TEST] Fatal Error:", error);
        return NextResponse.json({ error: error.message || "Terjadi kesalahan sistem saat mencoba koneksi" }, { status: 500 });
    }
}

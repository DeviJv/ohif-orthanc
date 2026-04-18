import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** GET /api/config/satusehat
 * Returns current Satu Sehat config from the new dynamic model.
 */
export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Try to get from the new dynamic SatuSehatSetting table
    const dbSetting = await db.satuSehatSetting.findFirst({
        where: { id: 1 }
    });

    if (dbSetting) {
        return NextResponse.json({
            orgId: dbSetting.organizationId,
            clientId: dbSetting.clientId,
            clientSecret: dbSetting.clientSecret,
            env: dbSetting.environment,
            authUrl: dbSetting.authUrl,
            baseUrl: dbSetting.baseUrl,

            // New Environment specific fields
            stgOrgId: dbSetting.stgOrganizationId,
            stgClientId: dbSetting.stgClientId,
            stgClientSecret: dbSetting.stgClientSecret,
            stgAuthUrl: dbSetting.stgAuthUrl,
            stgBaseUrl: dbSetting.stgBaseUrl,

            prdOrgId: dbSetting.prdOrganizationId,
            prdClientId: dbSetting.prdClientId,
            prdClientSecret: dbSetting.prdClientSecret,
            prdAuthUrl: dbSetting.prdAuthUrl,
            prdBaseUrl: dbSetting.prdBaseUrl,

            defaultPatientId: dbSetting.defaultPatientId,
            defaultPractitionerId: dbSetting.defaultPractitionerId,
            encounterUrl: dbSetting.encounterUrl,
            conditionUrl: dbSetting.conditionUrl,
            serviceRequestUrl: dbSetting.serviceRequestUrl,
            imagingStudyUrl: dbSetting.imagingStudyUrl,
            observationUrl: dbSetting.observationUrl,
            diagnosticReportUrl: dbSetting.diagnosticReportUrl,
            compositionUrl: dbSetting.compositionUrl,
            patientUrl: dbSetting.patientUrl,
            locationUrl: dbSetting.locationUrl,
            practitionerUrl: dbSetting.practitionerUrl,
            source: "SatuSehatSetting"
        });
    }

    // 2. Fallback to older AppConfig keys (Legacy support for old migrations)
    const [orgIdRow, clientIdRow, secretRow, envRow] = await Promise.all([
        db.appConfig.findUnique({ where: { key: "SATUSEHAT_ORG_ID" } }),
        db.appConfig.findUnique({ where: { key: "SATUSEHAT_CLIENT_ID" } }),
        db.appConfig.findUnique({ where: { key: "SATUSEHAT_CLIENT_SECRET" } }),
        db.appConfig.findUnique({ where: { key: "SATUSEHAT_ENV" } }),
    ]);

    return NextResponse.json({
        orgId: orgIdRow?.value || process.env.SATUSEHAT_ORG_ID || "",
        clientId: clientIdRow?.value || process.env.SATUSEHAT_CLIENT_ID || "",
        clientSecret: secretRow?.value || process.env.SATUSEHAT_CLIENT_SECRET || "",
        env: envRow?.value || process.env.SATUSEHAT_ENV || "staging",
        source: "AppConfig"
    });
}

/** POST /api/config/satusehat
 * Saves Satu Sehat settings to the new dynamic table.
 */
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // Choose active credentials based on selected environment
    const isActiveStaging = body.env === "staging";
    const activeOrgId = isActiveStaging ? body.stgOrgId : body.prdOrgId;
    const activeClientId = isActiveStaging ? body.stgClientId : body.prdClientId;
    const activeClientSecret = isActiveStaging ? body.stgClientSecret : body.prdClientSecret;
    const activeAuthUrl = isActiveStaging ? body.stgAuthUrl : body.prdAuthUrl;
    const activeBaseUrl = isActiveStaging ? body.stgBaseUrl : body.prdBaseUrl;

    const payload = {
        environment: body.env,
        
        // Staging
        stgOrganizationId: body.stgOrgId || "",
        stgClientId: body.stgClientId || "",
        stgClientSecret: body.stgClientSecret || "",
        stgAuthUrl: body.stgAuthUrl || "https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials",
        stgBaseUrl: body.stgBaseUrl || "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1",

        // Production
        prdOrganizationId: body.prdOrgId || "",
        prdClientId: body.prdClientId || "",
        prdClientSecret: body.prdClientSecret || "",
        prdAuthUrl: body.prdAuthUrl || "https://api-satusehat.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials",
        prdBaseUrl: body.prdBaseUrl || "https://api-satusehat.kemkes.go.id/fhir-r4/v1",

        // SYNC ACTIVE CONFIG (Legacy compatibility)
        organizationId: activeOrgId || "",
        clientId: activeClientId || "",
        clientSecret: activeClientSecret || "",
        authUrl: activeAuthUrl || "",
        baseUrl: activeBaseUrl || "",

        defaultPatientId: body.defaultPatientId || "",
        defaultPractitionerId: body.defaultPractitionerId || "",
        encounterUrl: body.encounterUrl || null,
        conditionUrl: body.conditionUrl || null,
        serviceRequestUrl: body.serviceRequestUrl || null,
        imagingStudyUrl: body.imagingStudyUrl || null,
        observationUrl: body.observationUrl || null,
        diagnosticReportUrl: body.diagnosticReportUrl || null,
        compositionUrl: body.compositionUrl || null,
        patientUrl: body.patientUrl || null,
        locationUrl: body.locationUrl || null,
        practitionerUrl: body.practitionerUrl || null
    };

    await db.satuSehatSetting.upsert({
        where: { id: 1 },
        update: payload,
        create: { id: 1, ...payload }
    });

    // --- AUTO INJECT KE DICOM-ROUTER .ENV ---
    try {
        const fs = require("fs").promises;
        const path = require("path");
        const { exec } = require("child_process");

        const envPath = path.join(process.cwd(), "dicom-router", ".env");
        const composeDir = path.join(process.cwd(), "dicom-router");

        // Use the actual Base URL for the router, ensuring it doesn't have the /fhir-r4/v1 suffix if possible
        // but typically SATUSEHAT_URL in router is the root.
        let routerUrl = activeBaseUrl;
        if (routerUrl.includes("/fhir-r4/v1")) {
            routerUrl = routerUrl.split("/fhir-r4/v1")[0];
        } else if (!routerUrl) {
            routerUrl = body.env === "production" 
                ? "https://api-satusehat.kemkes.go.id" 
                : "https://api-satusehat-stg.dto.kemkes.go.id";
        }

        const envContent = `ORG_ID=${activeOrgId}\nCLIENT_ID=${activeClientId}\nCLIENT_SECRET=${activeClientSecret}\nSATUSEHAT_URL=${routerUrl}\nNEXT_PUBLIC_APP_URL=http://pacs-web:3001\nINTERNAL_PACS_KEY=${process.env.INTERNAL_PACS_KEY || 'pacs_secret_token_2026'}\n`;

        await fs.writeFile(envPath, envContent, "utf8");
        console.log(`[DICOM-ROUTER] Berhasil menimpa file .env di ${envPath}`);

        exec(`docker compose -f ${path.join(composeDir, "docker-compose.yml")} up -d --force-recreate`, (err: any) => {
            if (err) {
                console.log("[DICOM-ROUTER] Recreate otomatis gagal (Docker Compose tidak tersedia atau error):", err);
            } else {
                console.log("[DICOM-ROUTER] Container dicom-router berhasil di-recreate otomatis dengan env baru!");
            }
        });
    } catch (injectErr) {
        console.error("[DICOM-ROUTER] Gagal melakukan auto-inject .env", injectErr);
    }

    return NextResponse.json({ success: true });
}


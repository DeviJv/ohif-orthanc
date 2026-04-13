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
    
    // Mapping from frontend field names to DB field names if they differ
    // (Existing frontend uses orgId, clientId, clientSecret, env)
    const payload = {
        organizationId: body.orgId,
        clientId: body.clientId,
        clientSecret: body.clientSecret,
        environment: body.env,
        authUrl: body.authUrl || "",
        baseUrl: body.baseUrl || "",
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

    return NextResponse.json({ success: true });
}

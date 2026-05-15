import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const KEYS = [
    "CLINIC_NAME",
    "CLINIC_ADDRESS",
    "CLINIC_PHONE",
    "CLINIC_CITY",
    "CLINIC_LOGO_BASE64",
    "CLINIC_DOCTORS",
    "KIRIMI_USER_CODE",
    "KIRIMI_DEVICE_ID",
    "KIRIMI_SECRET",
];

export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            console.log("[Clinic API] Unauthorized attempt to access clinic config");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const rows = await db.appConfig.findMany({ 
            where: { key: { in: KEYS } } 
        }).catch(e => {
            console.error("[Clinic API] Database query failed:", e);
            throw e;
        });

        const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

        let doctors = [];
        try {
            doctors = map["CLINIC_DOCTORS"] ? JSON.parse(map["CLINIC_DOCTORS"]) : [];
        } catch (e) {
            console.error("[Clinic API] Failed to parse doctors JSON:", e);
        }

        return NextResponse.json({
            clinicName: map["CLINIC_NAME"] || "",
            clinicAddress: map["CLINIC_ADDRESS"] || "",
            clinicPhone: map["CLINIC_PHONE"] || "",
            clinicCity: map["CLINIC_CITY"] || "",
            clinicLogo: map["CLINIC_LOGO_BASE64"] || "",
            doctors: Array.isArray(doctors) ? doctors : [],
            kirimiUserCode: map["KIRIMI_USER_CODE"] || "",
            kirimiDeviceId: map["KIRIMI_DEVICE_ID"] || "",
            kirimiSecret: map["KIRIMI_SECRET"] || "",
        });
    } catch (error) {
        console.error("[Clinic API] Unexpected error in GET:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown" }, 
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { clinicName, clinicAddress, clinicPhone, clinicCity, clinicLogo, doctors, kirimiUserCode, kirimiDeviceId, kirimiSecret } = body;

    const upsert = (key: string, value: string) =>
        db.appConfig.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        });

    await Promise.all([
        upsert("CLINIC_NAME", clinicName || ""),
        upsert("CLINIC_ADDRESS", clinicAddress || ""),
        upsert("CLINIC_PHONE", clinicPhone || ""),
        upsert("CLINIC_CITY", clinicCity || ""),
        upsert("CLINIC_LOGO_BASE64", clinicLogo || ""),
        upsert("CLINIC_DOCTORS", JSON.stringify(doctors || [])),
        upsert("KIRIMI_USER_CODE", kirimiUserCode || ""),
        upsert("KIRIMI_DEVICE_ID", kirimiDeviceId || ""),
        upsert("KIRIMI_SECRET", kirimiSecret || ""),
    ]);

    return NextResponse.json({ success: true });
}

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
];

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const rows = await db.appConfig.findMany({ where: { key: { in: KEYS } } });
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

    return NextResponse.json({
        clinicName: map["CLINIC_NAME"] || "",
        clinicAddress: map["CLINIC_ADDRESS"] || "",
        clinicPhone: map["CLINIC_PHONE"] || "",
        clinicCity: map["CLINIC_CITY"] || "",
        clinicLogo: map["CLINIC_LOGO_BASE64"] || "",
        doctors: map["CLINIC_DOCTORS"] ? JSON.parse(map["CLINIC_DOCTORS"]) : [],
    });
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { clinicName, clinicAddress, clinicPhone, clinicCity, clinicLogo, doctors } = body;

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
    ]);

    return NextResponse.json({ success: true });
}

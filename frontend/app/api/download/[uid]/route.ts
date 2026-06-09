import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ uid: string }> }
) {
    try {
        const { uid } = await params;

        // 1. Fetch Radiology Report
        const report = await db.radiologyReport.findFirst({
            where: { studyInstanceUid: uid },
        });

        if (!report) {
            return NextResponse.json({ error: "Laporan tidak ditemukan" }, { status: 404 });
        }

        // 2. Fetch Clinic Config (Only public details)
        const configKeys = ["CLINIC_NAME", "CLINIC_ADDRESS", "CLINIC_PHONE", "CLINIC_CITY", "CLINIC_LOGO_BASE64"];
        const configRows = await db.appConfig.findMany({
            where: { key: { in: configKeys } }
        });
        const clinicConfig = Object.fromEntries(configRows.map(r => [r.key, r.value]));

        // 3. Fetch Doctor Signature if available
        let doctorSignature = null;
        if (report.doctorId) {
            const doctor = await db.user.findUnique({
                where: { id: report.doctorId },
                select: { signature: true }
            });
            if (doctor?.signature) {
                doctorSignature = doctor.signature;
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                report,
                clinic: {
                    clinicName: clinicConfig["CLINIC_NAME"] || "",
                    clinicAddress: clinicConfig["CLINIC_ADDRESS"] || "",
                    clinicPhone: clinicConfig["CLINIC_PHONE"] || "",
                    clinicCity: clinicConfig["CLINIC_CITY"] || "",
                    clinicLogo: clinicConfig["CLINIC_LOGO_BASE64"] || "",
                },
                doctorSignature,
            }
        });
    } catch (error) {
        console.error("[Download API] Error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}

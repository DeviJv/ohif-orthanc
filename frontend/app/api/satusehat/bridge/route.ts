import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SatuSehatService } from "@/lib/services/satusehat";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

const fetchOrthanc = async (path: string) => {
    const res = await fetch(`${ORTHANC_URL}${path}`, {
        headers: {
            "Authorization": `Basic ${ORTHANC_AUTH}`
        }
    });
    if (!res.ok) throw new Error(`Orthanc error: ${res.statusText}`);
    return res.json();
};

export async function POST(req: NextRequest) {
    try {
        const { studyInstanceUid, manualNik } = await req.json();

        if (!studyInstanceUid) {
            return NextResponse.json({ error: "studyInstanceUid is required" }, { status: 400 });
        }

        // 1. Ambil data study dari Orthanc
        const studyId = studyInstanceUid; // Frontend kirim Orthanc ID
        const study = await fetchOrthanc(`/studies/${studyId}`);
        
        const tags = study.MainDicomTags;
        const patientTags = study.PatientMainDicomTags;

        // Gunakan manualNik jika ada, jika tidak ambil dari DICOM PatientID
        const nik = manualNik || patientTags?.PatientID || tags?.PatientID;
        
        if (!nik) {
            return NextResponse.json({ error: "NIK tidak ditemukan. Silakan masukkan NIK secara manual." }, { status: 400 });
        }

        // 2. Ambil data series untuk mendapatkan modality
        const seriesIds = study.Series as string[];
        let modality = "OT"; // Default Other
        let instanceCount = 0;
        
        if (seriesIds.length > 0) {
            const firstSeries = await fetchOrthanc(`/series/${seriesIds[0]}`);
            modality = firstSeries.MainDicomTags?.Modality || "OT";
            instanceCount = study.Instances?.length || 0;
        }

        // 3. Cari ID Pasien di Satu Sehat
        let patientSsId: string | null = null;
        try {
            patientSsId = await SatuSehatService.getPatientIdByNik(nik);
        } catch (e: any) {
            return NextResponse.json({ error: `Gagal mencari pasien di Satu Sehat: ${e.message}` }, { status: 500 });
        }

        if (!patientSsId) {
            return NextResponse.json({ error: `Pasien dengan NIK ${nik} tidak ditemukan di Satu Sehat` }, { status: 404 });
        }

        // 4. Kirim ke Satu Sehat
        let result;
        try {
            result = await SatuSehatService.submitImagingStudy({
                studyInstanceUid: tags.StudyInstanceUID,
                patientSsId: patientSsId,
                patientName: patientTags?.PatientName || tags?.PatientName || "Unknown",
                modality: modality,
                studyDate: tags.StudyDate,
                accessionNumber: tags.AccessionNumber,
                description: tags.StudyDescription,
                numberOfSeries: seriesIds.length,
                numberOfInstances: instanceCount
            });
        } catch (e: any) {
            console.error("[SATUSEHAT BRIDGE] Detail Error:", e.message);
            // Update DB dengan status gagal
            await db.satuSehatIntegration.upsert({
                where: { studyInstanceUid: tags.StudyInstanceUID },
                update: { status: "FAILED", error: e.message, patientNik: nik },
                create: { studyInstanceUid: tags.StudyInstanceUID, status: "FAILED", error: e.message, patientNik: nik }
            });
            
            return NextResponse.json({ 
                error: e.message,
                logs: e.logs || ["Terjadi kesalahan saat memproses data di SATUSEHAT."] 
            }, { status: 500 });
        }

        // 5. Simpan status sukses ke DB
        const ssId = result.id;
        await db.satuSehatIntegration.upsert({
            where: { studyInstanceUid: tags.StudyInstanceUID },
            update: { status: "SUCCESS", satusehatId: ssId, error: null, patientNik: nik },
            create: { studyInstanceUid: tags.StudyInstanceUID, status: "SUCCESS", satusehatId: ssId, patientNik: nik }
        });

        return NextResponse.json({ 
            success: true, 
            message: "Berhasil dikirim ke Satu Sehat",
            satusehatId: ssId,
            logs: result.logs
        });

    } catch (error: any) {
        console.error("[SATUSEHAT BRIDGE] Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

// Endpoint untuk verifikasi pasien (digunakan oleh Dialog)
export async function PUT(req: NextRequest) {
    try {
        const { nik } = await req.json();
        if (!nik) return NextResponse.json({ error: "NIK is required" }, { status: 400 });

        const patient = await SatuSehatService.getPatientByNik(nik);
        if (!patient) {
            return NextResponse.json({ error: "Pasien tidak ditemukan di Satu Sehat" }, { status: 404 });
        }

        return NextResponse.json(patient);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// GET status
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const studyInstanceUid = searchParams.get("studyInstanceUid");

    if (!studyInstanceUid) {
        return NextResponse.json({ error: "studyInstanceUid is required" }, { status: 400 });
    }

    const status = await db.satuSehatIntegration.findUnique({
        where: { studyInstanceUid }
    });

    return NextResponse.json(status || { status: "NOT_SYNCED" });
}

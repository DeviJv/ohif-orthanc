import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SatuSehatService } from "@/lib/services/satusehat";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

const fetchOrthanc = async (path: string, options: RequestInit = {}) => {
    const res = await fetch(`${ORTHANC_URL}${path}`, {
        ...options,
        headers: {
            "Authorization": `Basic ${ORTHANC_AUTH}`,
            ...options.headers
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

        // 2. Ambil data semua series yang ada
        const seriesIds = study.Series as string[];
        let modality = "OT"; // Default primary modality
        let instanceCount = study.Instances?.length || 0;
        const seriesList = [];
        
        if (seriesIds.length > 0) {
            // Ambil detail semua series
            const seriesPromises = seriesIds.map(sId => fetchOrthanc(`/series/${sId}`));
            const seriesDetails = await Promise.all(seriesPromises);
            
            // Set primary modality dari series pertama
            modality = seriesDetails[0].MainDicomTags?.Modality || "OT";

            for (const sDetail of seriesDetails) {
                seriesList.push({
                    uid: sDetail.MainDicomTags?.SeriesInstanceUID || sDetail.ID,
                    modality: sDetail.MainDicomTags?.Modality || "OT",
                    instanceCount: sDetail.Instances?.length || 1
                });
            }
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
                numberOfInstances: instanceCount,
                seriesList: seriesList
            });
        } catch (e: any) {
            console.error("[SATUSEHAT BRIDGE] Detail Error:", e.message);
            // Use accessionNumber as stable key; fallback to studyInstanceUid if empty
            const lookupKey = tags.AccessionNumber || tags.StudyInstanceUID;
            await db.satuSehatIntegration.upsert({
                where: { accessionNumber: lookupKey },
                update: { status: "FAILED", error: e.message, patientNik: nik, studyInstanceUid: tags.StudyInstanceUID },
                create: { accessionNumber: lookupKey, studyInstanceUid: tags.StudyInstanceUID, status: "FAILED", error: e.message, patientNik: nik }
            });
            
            return NextResponse.json({ 
                error: e.message,
                logs: e.logs || ["Terjadi kesalahan saat memproses data di SATUSEHAT."] 
            }, { status: 500 });
        }

        // 5. Simpan status sukses ke DB (key by accessionNumber for stability across metadata edits)
        const ssId = result.id;
        const lookupKey = tags.AccessionNumber || tags.StudyInstanceUID;
        await db.satuSehatIntegration.upsert({
            where: { accessionNumber: lookupKey },
            update: { status: "SUCCESS", satusehatId: ssId, error: null, patientNik: nik, syncedAt: new Date(), studyInstanceUid: tags.StudyInstanceUID },
            create: { accessionNumber: lookupKey, studyInstanceUid: tags.StudyInstanceUID, status: "SUCCESS", satusehatId: ssId, patientNik: nik, syncedAt: new Date() }
        });

        // 6. TRIGER PENGIRIMAN FISIK DICOM KE QTM-ROUTER (Kemenkes Dicom Router)
        try {
            console.log(`[SATUSEHAT BRIDGE] Triggering DICOM Send to QTM-ROUTER for Study: ${studyId}`);
            // Mengirim command push secara Asynchronous agar muncul di menu Jobs
            await fetchOrthanc("/modalities/QTM-ROUTER/store", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "Resources": [ studyId ],
                    "Asynchronous": true
                })
            });
            console.log(`[SATUSEHAT BRIDGE] Trigger to QTM-ROUTER sent successfully (Asynchronous Job Created).`);
        } catch (routerErr: any) {
            console.error(`[SATUSEHAT BRIDGE] Warning: Failed to trigger QTM-ROUTER: ${routerErr.message}`);
            // Kita tidak perlu menggagalkan sync FHIR jika upload gambar delay, biarkan background job retry
        }

        return NextResponse.json({ 
            success: true, 
            message: "Berhasil dikirim ke Satu Sehat & Gambar sedang diupload",
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

// GET status by accessionNumber
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const accessionNumber = searchParams.get("accessionNumber");
    const studyInstanceUid = searchParams.get("studyInstanceUid");

    if (!accessionNumber && !studyInstanceUid) {
        return NextResponse.json({ error: "accessionNumber or studyInstanceUid is required" }, { status: 400 });
    }

    // Prefer accessionNumber lookup; fallback to studyInstanceUid for legacy
    const status = accessionNumber
        ? await db.satuSehatIntegration.findUnique({ where: { accessionNumber } })
        : await db.satuSehatIntegration.findFirst({ where: { studyInstanceUid: studyInstanceUid! } });

    return NextResponse.json(status || { status: "NOT_SYNCED" });
}

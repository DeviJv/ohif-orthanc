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

        // Ambil konfigurasi untuk menentukan sumber NIK
        const config = await SatuSehatService.getConfig();
        const patientIdSource = config?.patientIdSource || "PatientID";

        // Logic penentuan NIK berdasarkan konfigurasi
        let nik = manualNik;
        if (!nik) {
            if (patientIdSource === "StudyDescription") {
                // Prioritaskan StudyDescription
                nik = tags?.StudyDescription || patientTags?.PatientID || tags?.PatientID;
            } else {
                // Default: PatientID
                nik = patientTags?.PatientID || tags?.PatientID || tags?.StudyDescription;
            }
        }
        
        // Remove old NIK mandatory check here, it is now handled later after ACSN check.

        // Ambil pengaturan
        const dbSetting = await db.satuSehatSetting.findFirst({ where: { id: 1 } });
        const sendImageStudyFromWeb = dbSetting?.sendImageStudyFromWeb ?? true;
        const acsnNumber = tags?.AccessionNumber;

        console.log(`[SATUSEHAT BRIDGE] Checking ACSN: ${acsnNumber} for Study: ${studyId}`);

        // 2. Validasi Accession Number (WAJIB ADA untuk Fase 2)
        if (config && acsnNumber) {
            const isValidAcsn = await SatuSehatService.checkAccessionNumberValid(acsnNumber, config);
            if (!isValidAcsn) {
                console.error(`[SATUSEHAT BRIDGE] ACSN validation failed for: ${acsnNumber}`);
                const lookupKey = acsnNumber || tags.StudyInstanceUID || studyId;
                await db.satuSehatIntegration.upsert({
                    where: { accessionNumber: lookupKey },
                    update: { status: "FAILED", error: "ops no acsn belum terdaftar", patientNik: nik || "N/A", studyInstanceUid: tags.StudyInstanceUID },
                    create: { accessionNumber: lookupKey, studyInstanceUid: tags.StudyInstanceUID, status: "FAILED", error: "ops no acsn belum terdaftar", patientNik: nik || "N/A" }
                });
                return NextResponse.json({ error: "ops no acsn belum terdaftar" }, { status: 400 });
            }
        } else if (!acsnNumber) {
            console.error(`[SATUSEHAT BRIDGE] Accession Number missing in DICOM tags for Study: ${studyId}`);
            const lookupKey = tags.StudyInstanceUID || studyId;
            await db.satuSehatIntegration.upsert({
                where: { accessionNumber: lookupKey },
                update: { status: "FAILED", error: "Accession Number tidak ditemukan di metadata DICOM.", patientNik: nik || "N/A", studyInstanceUid: tags.StudyInstanceUID },
                create: { accessionNumber: lookupKey, studyInstanceUid: tags.StudyInstanceUID, status: "FAILED", error: "Accession Number tidak ditemukan di metadata DICOM.", patientNik: nik || "N/A" }
            });
            return NextResponse.json({ error: "Accession Number tidak ditemukan di metadata DICOM." }, { status: 400 });
        }

        // 3. Validasi NIK (Hanya jika kita butuh mencari pasien baru, tapi di Fase 2 createRadiologyResultBundle akan mencari via ACSN)
        // Namun kita tetap butuh NIK untuk logging/fallback jika diperlukan. 
        // Jika ACSN valid, NIK menjadi opsional (akan dicari otomatis dari ServiceRequest di SS).
        if (!nik && !acsnNumber) {
             return NextResponse.json({ error: "NIK tidak ditemukan dan Accession Number kosong." }, { status: 400 });
        }

        if (!sendImageStudyFromWeb) {
            const lookupKey = tags.AccessionNumber || tags.StudyInstanceUID;
            
            // TRIGER PENGIRIMAN FISIK DICOM KE QTM-ROUTER SAJA
            try {
                console.log(`[SATUSEHAT BRIDGE] Triggering DICOM Send to QTM-ROUTER for Study: ${studyId} (SatuSehat Web Sync Disabled)`);
                await fetchOrthanc("/modalities/QTM-ROUTER/store", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "Resources": [ studyId ], "Asynchronous": true })
                });
            } catch (routerErr: any) {
                console.error(`[SATUSEHAT BRIDGE] Warning: Failed to trigger QTM-ROUTER: ${routerErr.message}`);
            }

            await db.satuSehatIntegration.upsert({
                where: { accessionNumber: lookupKey },
                update: { status: "SUCCESS", satusehatId: "forwarded-to-router", error: null, patientNik: nik || "N/A", syncedAt: new Date(), studyInstanceUid: tags.StudyInstanceUID },
                create: { accessionNumber: lookupKey, studyInstanceUid: tags.StudyInstanceUID, status: "SUCCESS", satusehatId: "forwarded-to-router", patientNik: nik || "N/A", syncedAt: new Date() }
            });

            return NextResponse.json({ 
                success: true, 
                message: "Accession Number valid. Diteruskan ke dicom-router.",
                satusehatId: null,
                logs: ["Pengiriman ImageStudy dari Web dinonaktifkan. Triger dicom-router berhasil."]
            });
        }

        // 4. Ambil data semua series yang ada
        const seriesIds = study.Series as string[];
        let modality = "OT"; // Default primary modality
        let instanceCount = study.Instances?.length || 0;
        const seriesList = [];
        
        if (seriesIds.length > 0) {
            // Ambil detail semua series
            const seriesPromises = seriesIds.map(sId => fetchOrthanc(`/series/${sId}`));
            const seriesDetails = await Promise.all(seriesPromises);
            
            // Set all unique modalities dari seluruh series
            const allModalities = seriesDetails.map(s => s.MainDicomTags?.Modality || "OT");
            const uniqueModalities = Array.from(new Set(allModalities));

            for (const sDetail of seriesDetails) {
                seriesList.push({
                    uid: sDetail.MainDicomTags?.SeriesInstanceUID || sDetail.ID,
                    modality: sDetail.MainDicomTags?.Modality || "OT",
                    instanceCount: sDetail.Instances?.length || 1
                });
            }

            // 5. Cari ID Pasien di Satu Sehat (Hanya jika kita mau kirim via NIK, tapi Fase 2 bisa otomatis)
            let patientSsId: string | null = null;
            if (nik) {
                try {
                    patientSsId = await SatuSehatService.getPatientIdByNik(nik);
                } catch (e: any) {
                    console.warn(`[SATUSEHAT BRIDGE] Gagal mencari pasien via NIK (${nik}): ${e.message}. Akan mencoba via ACSN.`);
                }
            }

            if (!patientSsId && !acsnNumber) {
                return NextResponse.json({ error: `Pasien dengan NIK ${nik || "N/A"} tidak ditemukan di Satu Sehat dan No ACSN kosong.` }, { status: 404 });
            }

            // 4. Kirim ke Satu Sehat
            let result;
            try {
                result = await SatuSehatService.submitImagingStudy({
                    studyInstanceUid: tags.StudyInstanceUID,
                    patientSsId: patientSsId || undefined,
                    patientName: patientTags?.PatientName || tags?.PatientName || "Unknown",
                    modality: uniqueModalities,
                    studyDate: tags.StudyDate,
                    accessionNumber: tags.AccessionNumber,
                    description: tags.StudyDescription,
                    numberOfSeries: seriesIds.length,
                    numberOfInstances: instanceCount,
                    seriesList: seriesList
                });
            } catch (e: any) {
                console.error("[SATUSEHAT BRIDGE] Detail Error:", e.message);
                const lookupKey = tags.AccessionNumber || tags.StudyInstanceUID;
                await db.satuSehatIntegration.upsert({
                    where: { accessionNumber: lookupKey },
                    update: { status: "FAILED", error: e.message, patientNik: nik || "N/A", studyInstanceUid: tags.StudyInstanceUID },
                    create: { accessionNumber: lookupKey, studyInstanceUid: tags.StudyInstanceUID, status: "FAILED", error: e.message, patientNik: nik || "N/A" }
                });
                
                return NextResponse.json({ 
                    error: e.message,
                    logs: e.logs || ["Terjadi kesalahan saat memproses data di SATUSEHAT."] 
                }, { status: 500 });
            }

            // 5. Simpan status sukses ke DB
            const ssId = result.id;
            const lookupKey = tags.AccessionNumber || tags.StudyInstanceUID;
            await db.satuSehatIntegration.upsert({
                where: { accessionNumber: lookupKey },
                update: { status: "SUCCESS", satusehatId: ssId, error: null, patientNik: nik || "N/A", syncedAt: new Date(), studyInstanceUid: tags.StudyInstanceUID },
                create: { accessionNumber: lookupKey, studyInstanceUid: tags.StudyInstanceUID, status: "SUCCESS", satusehatId: ssId, patientNik: nik || "N/A", syncedAt: new Date() }
            });

            // 6. TRIGER PENGIRIMAN FISIK DICOM KE QTM-ROUTER
            try {
                console.log(`[SATUSEHAT BRIDGE] Triggering DICOM Send to QTM-ROUTER for Study: ${studyId}`);
                await fetchOrthanc("/modalities/QTM-ROUTER/store", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "Resources": [ studyId ], "Asynchronous": true })
                });
            } catch (routerErr: any) {
                console.error(`[SATUSEHAT BRIDGE] Warning: Failed to trigger QTM-ROUTER: ${routerErr.message}`);
            }

            return NextResponse.json({ 
                success: true, 
                message: "Berhasil dikirim ke Satu Sehat & Gambar sedang diupload",
                satusehatId: ssId,
                logs: result.logs
            });
        }

        return NextResponse.json({ error: "Study tidak memiliki series" }, { status: 400 });

    } catch (error: any) {
        console.error("[SATUSEHAT BRIDGE] Global Error:", error);
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

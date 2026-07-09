import { NextRequest, NextResponse } from "next/server";
import { verifyApiKey } from "@/lib/api-auth";
import { db } from "@/lib/db";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { execFile } from "child_process";
import fs from "fs/promises";
import path from "path";
import os from "os";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");
const DEFAULT_HEADERS = { "Authorization": `Basic ${ORTHANC_AUTH}` };

export async function POST(req: NextRequest) {
    // 1. Verify API Key
    const authError = verifyApiKey(req);
    if (authError) {
        return authError;
    }

    try {
        // 2. Parse JSON body
        const body = await req.json();
        const { orderId, protect_pdf, expertise, instances } = body;

        // Validation
        if (!orderId) return NextResponse.json({ success: false, error: "Missing required parameter: orderId" }, { status: 400 });
        if (protect_pdf === undefined) return NextResponse.json({ success: false, error: "Missing required parameter: protect_pdf" }, { status: 400 });
        if (expertise === undefined) return NextResponse.json({ success: false, error: "Missing required parameter: expertise" }, { status: 400 });
        if (!instances || !Array.isArray(instances)) return NextResponse.json({ success: false, error: "Missing required parameter: instances (must be array)" }, { status: 400 });

        // 3. Find Study from Orthanc
        let queryBody = { 
            Level: "Study", 
            Query: { "StudyID": orderId }, 
            Expand: true, 
            Limit: 1 
        };
        
        const orthancRes = await fetch(`${ORTHANC_URL}/tools/find`, {
            method: 'POST',
            headers: { ...DEFAULT_HEADERS, 'Content-Type': 'application/json' },
            body: JSON.stringify(queryBody)
        });

        if (!orthancRes.ok) throw new Error(`Failed to search Orthanc. Status: ${orthancRes.status}`);
        let studies = await orthancRes.json();
        
        if (studies.length === 0) {
            queryBody.Query = { "AccessionNumber": orderId } as any;
            const res2 = await fetch(`${ORTHANC_URL}/tools/find`, {
                method: 'POST',
                headers: { ...DEFAULT_HEADERS, 'Content-Type': 'application/json' },
                body: JSON.stringify(queryBody)
            });
            studies = await res2.json();
        }

        if (studies.length === 0) {
            return NextResponse.json({ success: false, error: "Study not found with provided orderId" }, { status: 404 });
        }

        const study = studies[0];
        const tags = study.MainDicomTags;
        const patientTags = study.PatientMainDicomTags;

        const patientID = patientTags.PatientID || "";
        const patientName = patientTags.PatientName ? patientTags.PatientName.replace(/\^/g, " ") : "";
        const accessionNumber = tags.AccessionNumber || "";
        const studyDateRaw = tags.StudyDate;
        
        // Find series to map instance IDs to Modality (for footer labels)
        const seriesRes = await fetch(`${ORTHANC_URL}/studies/${study.ID}/series?expand=true`, { headers: DEFAULT_HEADERS });
        const seriesData = seriesRes.ok ? await seriesRes.json() : [];

        // 4. Initialize PDF
        const pdf = new jsPDF({ format: "a4", unit: "mm" });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        let currentY = 10;
        let isFirstPageUsed = false;

        // 5. Draw Expertise (Report) Page
        if (expertise) {
            // Fetch clinic config for Kop Surat
            const appConfigs = await db.appConfig.findMany();
            const clinicMap = appConfigs.reduce((acc, curr) => { acc[curr.key] = curr.value; return acc; }, {} as Record<string, string>);
            const clinic = {
                clinicName: clinicMap["CLINIC_NAME"] || "KLINIK RADIOLOGI",
                clinicAddress: clinicMap["CLINIC_ADDRESS"] || "",
                clinicPhone: clinicMap["CLINIC_PHONE"] || "",
                clinicEmail: clinicMap["CLINIC_EMAIL"] || "",
                clinicCity: clinicMap["CLINIC_CITY"] || "Kota",
                clinicLogo: clinicMap["CLINIC_LOGO_BASE64"] || ""
            };

            const report = await db.radiologyReport.findFirst({
                where: { OR: [{ accessionNumber: orderId }, { studyInstanceUid: tags.StudyInstanceUID }] }
            });

            const leftMargin = 20;
            const rightMargin = 20;
            const contentWidth = pageWidth - leftMargin - rightMargin;

            if (clinic?.clinicLogo) {
                try {
                    pdf.addImage(clinic.clinicLogo, "PNG", leftMargin, currentY, 20, 20);
                } catch (e) { console.error("Logo error:", e); }
            }

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(14);
            const clinicName = clinic?.clinicName || "NAMA CLINIC / RUMAH SAKIT";
            pdf.text(clinicName.toUpperCase(), pageWidth / 2 + 10, currentY + 5, { align: "center" });
            
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(9);
            pdf.text(clinic?.clinicAddress || "Alamat lengkap klinik belum diisi", pageWidth / 2 + 10, currentY + 11, { align: "center" });
            pdf.text(`Telp/Fax: ${clinic?.clinicPhone || "-"}`, pageWidth / 2 + 10, currentY + 16, { align: "center" });
            
            currentY += 25;
            pdf.setLineWidth(0.5);
            pdf.line(leftMargin, currentY, pageWidth - rightMargin, currentY);
            pdf.setLineWidth(0.2);
            pdf.line(leftMargin, currentY + 1, pageWidth - rightMargin, currentY + 1);
            
            // Title
            currentY += 10;
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(11);
            const modalityName = seriesData?.[0]?.MainDicomTags?.Modality || "RADIOLOGI";
            pdf.text(`INTERPRETASI HASIL PEMERIKSAAN ${modalityName.toUpperCase()}`, pageWidth / 2, currentY, { align: "center" });
            
            // Patient Info Table Look (Symmetrical Rows)
            currentY += 10;
            pdf.setFontSize(9);
            
            const drawRow = (label1: string, val1: string, label2: string, val2: string, y: number) => {
                pdf.setFont("helvetica", "bold");
                pdf.text(label1, leftMargin + 2, y + 4.5);
                pdf.setFont("helvetica", "normal");
                pdf.text(`: ${val1}`, leftMargin + 27, y + 4.5);
                
                pdf.setFont("helvetica", "bold");
                pdf.text(label2, leftMargin + contentWidth / 2 + 2, y + 4.5);
                pdf.setFont("helvetica", "normal");
                pdf.text(`: ${val2}`, leftMargin + contentWidth / 2 + 25, y + 4.5);
                
                pdf.rect(leftMargin, y, contentWidth, 7);
                pdf.line(leftMargin + contentWidth / 2, y, leftMargin + contentWidth / 2, y + 7);
                return y + 7;
            };

            const drawRowSingle = (label: string, val: string, y: number) => {
                pdf.setFont("helvetica", "bold");
                pdf.text(label, leftMargin + 2, y + 4.5);
                pdf.setFont("helvetica", "normal");
                pdf.text(`: ${val}`, leftMargin + 27, y + 4.5);
                
                pdf.rect(leftMargin, y, contentWidth, 7);
                return y + 7;
            };

            const drawSection = (label: string, content: string, startY: number) => {
                pdf.setFont("helvetica", "bold");
                const splitContent = pdf.splitTextToSize(content, contentWidth - 35);
                const height = Math.max(splitContent.length * 5, 10) + 4;
                
                pdf.rect(leftMargin, startY, contentWidth, height);
                pdf.line(leftMargin + 32, startY, leftMargin + 32, startY + height);
                
                pdf.text(label, leftMargin + 2, startY + 6);
                pdf.setFont("helvetica", "normal");
                pdf.text(splitContent, leftMargin + 35, startY + 6);
                
                return startY + height;
            };

            const patientAgeStr = tags.PatientAge || report?.age || "";
            let patientAgeDisplay = patientAgeStr;
            const patientSex = tags.PatientSex || report?.patientSex || "";
            
            const studyDateFmt = studyDateRaw && studyDateRaw.length === 8 
                ? `${studyDateRaw.substring(6,8)}/${studyDateRaw.substring(4,6)}/${studyDateRaw.substring(0,4)}`
                : studyDateRaw;

            currentY = drawRow("Nama", patientName, "Umur", `${patientAgeDisplay} (${patientSex === "M" ? "L" : patientSex === "F" ? "P" : patientSex})`, currentY);
            currentY = drawRow("No. RM", patientID, "No. Acc", accessionNumber || "-", currentY);
            currentY = drawRow("Tgl Foto", studyDateFmt, "Unit", modalityName, currentY);
            
            currentY = drawRowSingle("Jenis", report?.examType || "-", currentY);
            
            // Body Table: findings
            currentY += 10;
            currentY = drawSection("Exercise", report?.findings || "Tidak ada laporan radiologi.", currentY);
            
            // Signature Section
            currentY += 20;
            if (currentY > 250) { pdf.addPage(); currentY = 20; }
            
            const rightEdgeX = pageWidth - rightMargin;
            const dateText = `${clinic?.clinicCity || ""}, ${report?.reportDate ? report.reportDate : format(new Date(), "d MMMM yyyy", { locale: id })}`;
            
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            const dateWidth = pdf.getTextWidth(dateText);
            pdf.text(dateText, rightEdgeX, currentY, { align: "right" });
            
            const signatureCenterX = rightEdgeX - (dateWidth / 2);

            let docName = report?.doctorName || "Dokter Radiologi";
            let docSip = "";
            if (report?.doctorId) {
                const doc = await db.user.findUnique({ where: { id: report.doctorId } });
                if (doc?.signature) {
                    try { pdf.addImage(doc.signature, "PNG", signatureCenterX - 15, currentY + 5, 30, 15); } catch(e) {}
                }
                if (doc?.name) docName = doc.name;
                if (doc?.sip) docSip = doc.sip;
            }

            currentY += 25;
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(10);
            pdf.text(`( ${docName} )`, signatureCenterX, currentY, { align: "center" });

            if (docSip) {
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(9);
                pdf.text(`SIP. ${docSip}`, signatureCenterX, currentY + 5, { align: "center" });
            }

            isFirstPageUsed = true;
        }

        // 6. Draw DICOM Images
        for (const instanceId of instances) {
            try {
                const imgResp = await fetch(`${ORTHANC_URL}/instances/${instanceId}/preview`, { headers: DEFAULT_HEADERS });
                if (!imgResp.ok) continue;
                
                const arrayBuffer = await imgResp.arrayBuffer();
                const base64 = `data:image/jpeg;base64,${Buffer.from(arrayBuffer).toString('base64')}`;

                if (isFirstPageUsed) {
                    pdf.addPage();
                } else {
                    isFirstPageUsed = true;
                }
                
                const props = pdf.getImageProperties(base64);
                const ratio = props.width / props.height;

                let drawWidth = pageWidth;
                let drawHeight = pageWidth / ratio;

                if (drawHeight > pageHeight) {
                    drawHeight = pageHeight;
                    drawWidth = pageHeight * ratio;
                }

                const xOffset = (pageWidth - drawWidth) / 2;
                const yOffset = (pageHeight - drawHeight) / 2;

                pdf.addImage(base64, "JPEG", xOffset, yOffset, drawWidth, drawHeight);

                const series = seriesData.find((s: any) => s.Instances?.includes(instanceId));
                if (series) {
                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(10);
                    pdf.setTextColor(255, 255, 255);
                    pdf.setDrawColor(0);
                    pdf.setFillColor(0, 0, 0, 0.5);
                    pdf.rect(0, pageHeight - 15, pageWidth, 15, "F");
                    pdf.text(`${series.MainDicomTags.SeriesDescription || "Series"} - ${series.MainDicomTags.Modality} (${series.MainDicomTags.SeriesNumber})`, 10, pageHeight - 6);
                    pdf.setTextColor(0, 0, 0);
                }
            } catch (e) {
                console.error("Error drawing instance:", instanceId, e);
            }
        }

        // 7. Process PDF buffer
        let pdfBuffer = Buffer.from(pdf.output('arraybuffer'));
        const safePatientName = patientName.replace(/[^a-zA-Z0-9]/g, '_') || "Pasien";
        const filename = `Laporan_${safePatientName}.pdf`;

        // 8. Protect PDF if required using qpdf
        if (protect_pdf) {
            try {
                const tempIn = path.join(os.tmpdir(), `in_${Date.now()}_${Math.random().toString(36).substring(7)}.pdf`);
                const tempOut = path.join(os.tmpdir(), `out_${Date.now()}_${Math.random().toString(36).substring(7)}.pdf`);
                
                await fs.writeFile(tempIn, pdfBuffer);
                
                const ownerPw = process.env.PDF_OWNER_PASSWORD || "quantum";
                const userPw = patientID;
                
                await new Promise<void>((resolve, reject) => {
                    execFile('qpdf', ['--encrypt', userPw, ownerPw, '256', '--print=full', '--', tempIn, tempOut], (error) => {
                        if (error) {
                            console.error("qpdf error:", error);
                            reject(new Error("Failed to encrypt PDF"));
                        } else {
                            resolve();
                        }
                    });
                });
                
                pdfBuffer = await fs.readFile(tempOut);
                
                // Cleanup temp files safely
                await fs.unlink(tempIn).catch(() => {});
                await fs.unlink(tempOut).catch(() => {});
            } catch (err) {
                console.error("Failed to protect PDF:", err);
                return NextResponse.json({ success: false, error: "Gagal memproteksi PDF dengan password. Pastikan qpdf terinstall." }, { status: 500 });
            }
        }

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${filename}"`
            }
        });
        
    } catch (error: any) {
        console.error("Error generating PDF via API:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

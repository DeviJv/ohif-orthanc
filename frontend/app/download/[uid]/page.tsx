"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon, Loading02Icon, AlertCircleIcon, File01Icon } from "@hugeicons/core-free-icons";

export default function DownloadReportPage() {
    const params = useParams();
    const uid = params?.uid as string;
    
    const [status, setStatus] = useState<"loading" | "generating" | "success" | "error">("loading");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!uid) return;
        
        let isMounted = true;

        async function fetchAndGenerate() {
            try {
                // 1. Fetch Report Data
                const res = await fetch(`/api/download/${uid}`);
                if (!res.ok) {
                    throw new Error("Laporan tidak ditemukan atau sesi kadaluarsa");
                }
                const { data } = await res.json();
                const { report, clinic, doctorSignature } = data;

                if (!isMounted) return;
                setStatus("generating");

                // 2. Load jsPDF
                const { default: jsPDF } = await import("jspdf");
                
                const patientID = report.patientId || "";
                const pdf = new jsPDF({ 
                    orientation: "portrait", 
                    unit: "mm", 
                    format: "a4",
                    encryption: {
                        userPassword: patientID.trim() || "12345",
                        ownerPassword: patientID.trim() || "12345",
                        userPermissions: ["print", "modify", "copy", "annot-forms"]
                    }
                });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const leftMargin = 20;
                const rightMargin = 20;
                const contentWidth = pageWidth - leftMargin - rightMargin;
                let currentY = 15;

                // Header
                if (clinic?.clinicLogo) {
                    try { pdf.addImage(clinic.clinicLogo, "PNG", leftMargin, currentY, 20, 20); } catch (e) {}
                }
                pdf.setFont("helvetica", "bold"); 
                pdf.setFontSize(14);
                pdf.text((clinic?.clinicName || "LAPORAN RADIOLOGI").toUpperCase(), pageWidth / 2 + 10, currentY + 5, { align: "center" });
                pdf.setFont("helvetica", "normal"); 
                pdf.setFontSize(9);
                pdf.text(clinic?.clinicAddress || "", pageWidth / 2 + 10, currentY + 11, { align: "center" });
                pdf.text(`Telp/Fax: ${clinic?.clinicPhone || "-"}`, pageWidth / 2 + 10, currentY + 16, { align: "center" });
                
                currentY += 25;
                pdf.line(leftMargin, currentY, pageWidth - rightMargin, currentY);
                
                // Info Row
                currentY += 10;
                pdf.setFont("helvetica", "bold"); 
                pdf.setFontSize(11);
                
                // Extract modality name from examType or default to Radiologi
                const examType = report.examType || "";
                const modalityNameMatch = examType.match(/(CT-Scan|MRI|USG|Rontgen|Mammografi)/i);
                const modalityName = modalityNameMatch ? modalityNameMatch[0].toUpperCase() : "RADIOLOGI";
                
                pdf.text(`HASIL PEMERIKSAAN ${modalityName}`, pageWidth / 2, currentY, { align: "center" });
                currentY += 10; 
                pdf.setFontSize(9);
                
                const drawRow = (l1: string, v1: string, l2: string, v2: string, y: number) => {
                    pdf.setFont("helvetica", "bold"); pdf.text(l1, leftMargin + 2, y + 4.5);
                    pdf.setFont("helvetica", "normal"); pdf.text(`: ${v1}`, leftMargin + 27, y + 4.5);
                    pdf.setFont("helvetica", "bold"); pdf.text(l2, leftMargin + contentWidth/2 + 2, y + 4.5);
                    pdf.setFont("helvetica", "normal"); pdf.text(`: ${v2}`, leftMargin + contentWidth/2 + 25, y + 4.5);
                    pdf.rect(leftMargin, y, contentWidth, 7);
                    pdf.line(leftMargin + contentWidth/2, y, leftMargin + contentWidth/2, y + 7);
                    return y + 7;
                };
                
                const reportDateFormatted = report.reportDate || ""; // e.g. 2 Juni 2026
                const studyDateFormatted = report.studyDate ? report.reportDate /* fallback to report date if we don't have formatted study date */ : reportDateFormatted;

                currentY = drawRow("Nama", report.patientName || "-", "Umur", `${report.age || "-"} Thn (${report.patientSex || "-"})`, currentY);
                currentY = drawRow("No. RM", report.patientId || "-", "Tgl Foto", studyDateFormatted, currentY);
                
                currentY += 10;
                pdf.setFont("helvetica", "bold"); pdf.text("Jenis:", leftMargin + 2, currentY + 5);
                pdf.setFont("helvetica", "normal"); pdf.text(`: ${report.examType || "-"}`, leftMargin + 27, currentY + 5);
                pdf.rect(leftMargin, currentY, contentWidth, 8);
                currentY += 8;
                
                pdf.setFont("helvetica", "bold"); pdf.text("Exercise:", leftMargin + 2, currentY + 6);
                const splitFindings = pdf.splitTextToSize(report.findings || "-", contentWidth - 35);
                const findH = Math.max(splitFindings.length * 5, 15) + 4;
                pdf.rect(leftMargin, currentY, contentWidth, findH);
                pdf.line(leftMargin + 32, currentY, leftMargin + 32, currentY + findH);
                pdf.setFont("helvetica", "normal"); pdf.text(splitFindings, leftMargin + 35, currentY + 6);
                currentY += findH + 15;

                // Signature
                const dateText = `${clinic?.clinicCity || ""}, ${report.reportDate || ""}`;
                pdf.text(dateText, pageWidth - rightMargin, currentY, { align: "right" });
                if (doctorSignature) {
                    try { pdf.addImage(doctorSignature, "PNG", pageWidth - rightMargin - 40, currentY + 5, 30, 15); } catch(e){}
                }
                currentY += 25;
                pdf.setFont("helvetica", "bold");
                pdf.text(`( ${report.doctorName || "-"} )`, pageWidth - rightMargin - 15, currentY, { align: "center" });

                // Add Images (Orthanc Previews)
                const selectedInstanceIds = (report.selectedSeries as string[]) || [];
                for (const instanceId of selectedInstanceIds) {
                    try {
                        const imgResp = await fetch(`/api/orthanc/instances/${instanceId}/preview`);
                        if (imgResp.ok) {
                            const blob = await imgResp.blob();
                            const base64 = await new Promise<string>(r => { 
                                const f = new FileReader(); 
                                f.onload = () => r(f.result as string); 
                                f.readAsDataURL(blob); 
                            });
                            pdf.addPage();
                            pdf.addImage(base64, "JPEG", 10, 10, 190, 250);
                        }
                    } catch(e) {
                        console.warn("Failed to load instance image", e);
                    }
                }

                // Add Measurement Images
                const measurementImages = (report.measurementImages as {base64: string, name?: string}[]) || [];
                for (const img of measurementImages) {
                    if (img && img.base64) {
                        try {
                            pdf.addPage();
                            pdf.addImage(img.base64, "JPEG", 10, 10, 190, 250);
                        } catch(e) {
                            console.warn("Failed to load measurement image", e);
                        }
                    }
                }

                const filename = `Laporan_${modalityName}_${(report.patientName || "Pasien").replace(/\s+/g, "_")}.pdf`;
                pdf.save(filename);
                
                if (isMounted) setStatus("success");

            } catch (err: any) {
                console.error("Download generation error:", err);
                if (isMounted) {
                    setStatus("error");
                    setErrorMsg(err.message || "Gagal mengunduh dokumen");
                }
            }
        }

        fetchAndGenerate();

        return () => {
            isMounted = false;
        };
    }, [uid]);

    return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-background rounded-2xl shadow-xl border overflow-hidden">
                <div className="bg-primary/10 p-6 flex justify-center border-b">
                    {status === "loading" || status === "generating" ? (
                        <div className="relative">
                            <HugeiconsIcon icon={File01Icon} className="size-16 text-primary/40" />
                            <HugeiconsIcon icon={Loading02Icon} className="size-8 text-primary absolute -bottom-2 -right-2 animate-spin bg-background rounded-full" />
                        </div>
                    ) : status === "success" ? (
                        <div className="size-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <HugeiconsIcon icon={Download01Icon} className="size-8" />
                        </div>
                    ) : (
                        <div className="size-16 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                            <HugeiconsIcon icon={AlertCircleIcon} className="size-8" />
                        </div>
                    )}
                </div>
                
                <div className="p-6 text-center space-y-4">
                    {status === "loading" && (
                        <>
                            <h2 className="text-xl font-bold">Mengambil Data...</h2>
                            <p className="text-muted-foreground text-sm">Sedang mencari data laporan Anda di server.</p>
                        </>
                    )}
                    {status === "generating" && (
                        <>
                            <h2 className="text-xl font-bold text-primary">Membuat Dokumen PDF...</h2>
                            <p className="text-muted-foreground text-sm">
                                Harap tunggu sebentar, dokumen PDF sedang di-generate khusus untuk Anda.
                                <br/><br/>
                                <strong className="text-amber-600">Catatan:</strong> Dokumen diamankan dengan kata sandi (Gunakan Nomor Rekam Medis Anda).
                            </p>
                        </>
                    )}
                    {status === "success" && (
                        <>
                            <h2 className="text-xl font-bold text-green-700">Unduhan Berhasil</h2>
                            <p className="text-muted-foreground text-sm">
                                Dokumen PDF telah berhasil diunduh ke perangkat Anda. 
                                <br/><br/>
                                Silakan buka file tersebut dan masukkan <strong>Nomor Rekam Medis (RM)</strong> Anda sebagai kata sandi.
                            </p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-4 text-primary text-sm font-semibold hover:underline"
                            >
                                Unduh Ulang
                            </button>
                        </>
                    )}
                    {status === "error" && (
                        <>
                            <h2 className="text-xl font-bold text-red-600">Peringatan</h2>
                            <p className="text-muted-foreground text-sm">{errorMsg}</p>
                            <p className="text-xs text-muted-foreground mt-4">Silakan hubungi admin klinik jika masalah ini berlanjut.</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

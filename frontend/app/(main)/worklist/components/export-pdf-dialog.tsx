"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Study } from "../types";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { HugeiconsIcon } from "@hugeicons/react";
import { FileExportIcon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { 
    Combobox, 
    ComboboxContent, 
    ComboboxEmpty, 
    ComboboxInput, 
    ComboboxItem, 
    ComboboxList 
} from "@/components/ui/combobox";

interface ClinicConfig {
    clinicName: string;
    clinicAddress: string;
    clinicPhone: string;
    clinicCity: string;
    clinicLogo: string;
    doctors: string[];
}

interface ExportPdfDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    study: Study | null;
}

function parseDicomDate(dateStr?: string): Date | null {
    if (!dateStr || dateStr.length !== 8) return null;
    const year = parseInt(dateStr.slice(0, 4));
    const month = parseInt(dateStr.slice(4, 6)) - 1;
    const day = parseInt(dateStr.slice(6, 8));
    return new Date(year, month, day);
}

function calcAge(birthDateStr?: string): string {
    const birth = parseDicomDate(birthDateStr);
    if (!birth) return "";
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return String(age);
}

// Optimized with React.memo to prevent lag, but keeping ORIGINAL layout
export const ExportPdfDialog = React.memo(function ExportPdfDialog({ open, onOpenChange, study }: ExportPdfDialogProps) {
    const [clinic, setClinic] = useState<ClinicConfig | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const studyMainTags = study?.MainDicomTags as any;
    const patientTags = study?.PatientMainDicomTags as any;
    
    // Modality handling
    const rawModality = studyMainTags?.Modality || "";
    const getModalityName = (mod: string) => {
        const map: Record<string, string> = {
            "CT": "CT-Scan",
            "MR": "MRI",
            "US": "USG",
            "DX": "Rontgen",
            "CR": "Rontgen",
            "PX": "Rontgen",
            "MG": "Mammografi",
        };
        return map[mod] || "Radiologi";
    };
    const modalityName = getModalityName(rawModality);

    // Auto-map tags from DICOM
    const patientName = patientTags?.PatientName || studyMainTags?.PatientName || "";
    const patientID = patientTags?.PatientID || studyMainTags?.PatientID || "";
    const patientSex = (patientTags?.PatientSex || studyMainTags?.PatientSex || "").toUpperCase();
    const birthDate = patientTags?.PatientBirthDate || studyMainTags?.PatientBirthDate || "";
    const studyDesc = studyMainTags?.StudyDescription || "";
    const accessionNumber = studyMainTags?.AccessionNumber || "";
    const studyDateRaw = studyMainTags?.StudyDate || "";
    const studyDateFormatted = studyDateRaw && studyDateRaw.length === 8 
        ? format(parseDicomDate(studyDateRaw)!, "d MMMM yyyy", { locale: idLocale })
        : "";

    const [formData, setFormData] = useState({
        age: "",
        gender: patientSex === "M" ? "L" : patientSex === "F" ? "P" : "",
        address: "",
        sender: studyMainTags?.ReferringPhysicianName || "",
        diagnosis: "",
        photoNum: "01",
        examType: studyDesc || `Pemeriksaan ${modalityName}`,
        findings: "",
        conclusion: "",
        recommendation: "",
        doctor: "",
        date: format(new Date(), "d MMMM yyyy", { locale: idLocale }),
    });

    useEffect(() => {
        if (open) {
            fetch("/api/config/clinic")
                .then((r) => r.json())
                .then((data) => {
                    setClinic(data);
                    if (data.doctors?.[0]) setFormData(p => ({ ...p, doctor: data.doctors[0] }));
                })
                .catch(() => toast.error("Gagal memuat profil klinik"));

            setFormData((prev) => ({
                ...prev,
                age: calcAge(birthDate),
                gender: patientSex === "M" ? "L" : patientSex === "F" ? "P" : "",
                sender: studyMainTags?.ReferringPhysicianName || "",
                examType: studyDesc || `Pemeriksaan ${modalityName}`,
                date: format(new Date(), "d MMMM yyyy", { locale: idLocale }),
            }));
            setSearchValue("");
        }
    }, [open, birthDate, patientSex, studyDesc, modalityName, studyMainTags?.ReferringPhysicianName]);

    const filteredDoctors = React.useMemo(() => {
        if (!clinic?.doctors || !searchValue) return clinic?.doctors || [];
        const lower = searchValue.toLowerCase();
        return clinic.doctors.filter((d) => d.toLowerCase().includes(lower));
    }, [clinic?.doctors, searchValue]);

    const set = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData((prev) => ({ ...prev, [key]: e.target.value }));

    const handleGenerate = async () => {
        // Basic validation
        const requiredFields = {
            age: "Umur",
            gender: "L/P",
            examType: "Jenis Pemeriksaan",
            findings: "Temuan Radiologi",
            conclusion: "Kesimpulan",
            doctor: "Dokter Penanggung Jawab"
        };
        
        for (const [key, label] of Object.entries(requiredFields)) {
            if (!formData[key as keyof typeof formData]) {
                toast.error(`Harap isi bidang ${label}`);
                return;
            }
        }

        setIsGenerating(true);
        try {
            const { default: jsPDF } = await import("jspdf");
            const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
            
            // PDF Constants
            const pageWidth = pdf.internal.pageSize.getWidth();
            const leftMargin = 20;
            const rightMargin = 20;
            const contentWidth = pageWidth - leftMargin - rightMargin;
            let currentY = 15;

            // Header Section
            if (clinic?.clinicLogo) {
                try {
                    pdf.addImage(clinic.clinicLogo, "PNG", leftMargin, currentY, 20, 20);
                } catch (e) { console.error("Error adding logo", e); }
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

            currentY = drawRow("Nama", patientName, "Umur", `${formData.age} Thn (${formData.gender})`, currentY);
            currentY = drawRow("No. RM", patientID, "No. Acc", accessionNumber || "-", currentY);
            currentY = drawRow("Tgl Foto", studyDateFormatted, "No. Foto", formData.photoNum, currentY);
            currentY = drawRow("Pengirim", formData.sender || "-", "Diagnosa", formData.diagnosis || "-", currentY);
            currentY = drawRow("Alamat", formData.address || "-", "Unit", modalityName, currentY);
            
            // Body Table: Exam, Findings, Conclusion, Recommendation
            currentY += 10;
            
            // Improved body drawing logic (manual grid for symmetry)
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

            currentY = drawSection("Jenis", formData.examType, currentY);
            currentY = drawSection("Temuan", formData.findings, currentY);
            currentY = drawSection("Kesimpulan", formData.conclusion, currentY);
            currentY = drawSection("Anjuran", formData.recommendation || "-", currentY);
            
            // Signature Section
            currentY += 20;
            if (currentY > 250) { pdf.addPage(); currentY = 20; }
            
            const rightEdgeX = pageWidth - rightMargin;
            const dateText = `${clinic?.clinicCity || ""}, ${formData.date}`;
            
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            const dateWidth = pdf.getTextWidth(dateText);
            pdf.text(dateText, rightEdgeX, currentY, { align: "right" });
            
            currentY += 25; // Space for physical signature
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(10);
            
            // Align center of doctor name with center of date text for better aesthetics
            const signatureCenterX = rightEdgeX - (dateWidth / 2);
            pdf.text(`( ${formData.doctor} )`, signatureCenterX, currentY, { align: "center" });

            const filename = `Laporan_${modalityName}_${patientName.replace(/\s+/g, "_") || "Pasien"}.pdf`;
            pdf.save(filename);
            toast.success("PDF berhasil di-generate secara manual!");
        } catch (err) {
            console.error(err);
            toast.error("Gagal generate PDF");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            {/* Dialog Form */}
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="w-full max-w-4xl sm:max-w-4xl md:max-w-5xl max-h-[90vh] overflow-hidden p-0 gap-0 border-none shadow-2xl bg-background">
                    <DialogHeader className="px-6 py-4 border-b bg-background">
                        <DialogTitle className="flex items-center gap-3 text-xl font-bold">
                            <div className="bg-primary/10 text-primary p-2 rounded-lg">
                                <HugeiconsIcon icon={FileExportIcon} className="size-5" />
                            </div>
                            Export Laporan {modalityName}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="overflow-y-auto p-6 max-h-[calc(90vh-140px)] bg-muted/30">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            
                            {/* Left Column: Demographics & Context */}
                            <div className="md:col-span-4 space-y-6">
                                {/* Read-only Panel */}
                                <div className="bg-card border rounded-xl p-5 shadow-sm">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Identitas Pasien</h3>
                                    <div className="space-y-1 mb-4">
                                        <p className="font-bold text-lg text-foreground">{patientName || "Nama Tidak Diketahui"}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-muted-foreground font-medium">
                                                {patientSex === "M" ? "Laki-laki (M)" : patientSex === "F" ? "Perempuan (F)" : "Kelamin ( Tidak diketahui )"}
                                            </p>
                                            <span className="text-muted-foreground/30">•</span>
                                            <p className="text-sm text-muted-foreground font-medium">RM: {patientID || "-"}</p>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="e-age" className="text-xs font-semibold text-muted-foreground uppercase">Umur <span className="text-destructive">*</span></Label>
                                            <Input id="e-age" value={formData.age} onChange={set("age")} placeholder="23" className="h-9 text-sm bg-background border" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="e-gender" className="text-xs font-semibold text-muted-foreground uppercase">L / P <span className="text-destructive">*</span></Label>
                                            <Input id="e-gender" value={formData.gender} onChange={set("gender")} placeholder="L" className="h-9 text-sm bg-background border" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 mt-4">
                                        <Label htmlFor="e-address" className="text-xs font-semibold text-muted-foreground uppercase">Alamat Pasien <span className="text-muted-foreground/60 leading-none lowercase text-[10px] font-normal italic">(Opsional)</span></Label>
                                        <Textarea id="e-address" value={formData.address} onChange={set("address")} placeholder="Alamat lengkap..." className="h-20 text-sm resize-none bg-background border" />
                                    </div>
                                </div>

                                {/* Examination Context */}
                                <div className="bg-card border rounded-xl p-5 shadow-sm space-y-5">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Konteks Medis</h3>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="e-photo" className="text-xs font-semibold text-muted-foreground uppercase">No. Foto <span className="text-destructive">*</span></Label>
                                            <Input id="e-photo" value={formData.photoNum} onChange={set("photoNum")} placeholder="01" className="h-9 text-sm bg-background border" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-semibold text-muted-foreground uppercase">Acc Number</Label>
                                            <Input value={accessionNumber} readOnly className="h-9 text-sm bg-muted/30 border text-muted-foreground cursor-not-allowed" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="e-sender" className="text-xs font-semibold text-muted-foreground uppercase">Dokter Pengirim <span className="text-muted-foreground/60 leading-none lowercase text-[10px] font-normal italic">(Opsional)</span></Label>
                                        <Input id="e-sender" value={formData.sender} onChange={set("sender")} placeholder="dr. Prodia..." className="h-9 text-sm bg-background border" />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="e-diagnosis" className="text-xs font-semibold text-muted-foreground uppercase">Diagnosa Klinis <span className="text-muted-foreground/60 leading-none lowercase text-[10px] font-normal italic">(Opsional)</span></Label>
                                        <Input id="e-diagnosis" value={formData.diagnosis} onChange={set("diagnosis")} placeholder="Medical Check Up" className="h-9 text-sm bg-background border" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Column: Medical Report Content */}
                            <div className="md:col-span-8 flex flex-col gap-6">
                                <div className="bg-card border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                                    <div className="p-5 border-b bg-muted/40">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="space-y-2 flex-1">
                                                <Label htmlFor="e-examtype" className="text-xs font-bold uppercase text-muted-foreground tracking-tight">Jenis Pemeriksaan <span className="text-destructive">*</span></Label>
                                                <Input id="e-examtype" value={formData.examType} onChange={set("examType")} placeholder="Rontgen Thorax PA" className="font-bold text-xl border-none bg-transparent shadow-none px-0 h-auto focus-visible:ring-0 w-full" />
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Study Date</p>
                                                <p className="text-sm font-semibold">{studyDateFormatted || "-"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex-1 flex flex-col gap-6 bg-card">
                                        <div className="space-y-3 flex-1 flex flex-col">
                                            <Label htmlFor="e-findings" className="font-bold text-base text-foreground">Temuan Radiologi <span className="text-destructive">*</span></Label>
                                            <Textarea
                                                id="e-findings"
                                                value={formData.findings}
                                                onChange={set("findings")}
                                                placeholder={"Cor\t: Ukuran dan bentuk normal\nPulmo\t: Tidak ada proses infiltrat..."}
                                                className="font-mono text-sm min-h-[180px] flex-1 resize-y bg-background border"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="space-y-3">
                                                <Label htmlFor="e-conclusion" className="font-bold text-base text-foreground">Kesimpulan <span className="text-destructive">*</span></Label>
                                                <Textarea 
                                                    id="e-conclusion" 
                                                    value={formData.conclusion} 
                                                    onChange={set("conclusion")} 
                                                    placeholder="Jantung: Normal, Paru-paru: Bronchitis" 
                                                    className="min-h-[80px] resize-y text-sm bg-background border"
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="e-rec" className="font-bold text-base text-foreground">Anjuran <span className="text-muted-foreground/60 leading-none lowercase text-[10px] font-normal italic">(Opsional)</span></Label>
                                                <Input 
                                                    id="e-rec" 
                                                    value={formData.recommendation} 
                                                    onChange={set("recommendation")} 
                                                    placeholder="-" 
                                                    className="bg-background border h-10"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card border rounded-xl shadow-sm p-5 grid grid-cols-12 gap-6">
                                    <div className="col-span-8 space-y-2">
                                        <Label className="text-xs font-bold text-muted-foreground uppercase">Dokter Penanggung Jawab <span className="text-destructive">*</span></Label>
                                        {clinic?.doctors && clinic.doctors.length > 0 ? (
                                            <Combobox
                                                value={formData.doctor}
                                                onValueChange={(v) => v && setFormData((p) => ({ ...p, doctor: v }))}
                                                inputValue={searchValue}
                                                onInputValueChange={setSearchValue}
                                            >
                                                <ComboboxInput
                                                    placeholder="Cari atau pilih nama dokter..."
                                                    className="w-full"
                                                >
                                                    <ComboboxContent>
                                                        <ComboboxList tabIndex={-1}>
                                                            {filteredDoctors.map((d, i) => (
                                                                <ComboboxItem key={i} value={d}>{d}</ComboboxItem>
                                                            ))}
                                                        </ComboboxList>
                                                        <ComboboxEmpty>Dokter tidak ditemukan</ComboboxEmpty>
                                                    </ComboboxContent>
                                                </ComboboxInput>
                                            </Combobox>
                                        ) : (
                                            <Input
                                                value={formData.doctor}
                                                onChange={set("doctor")}
                                                placeholder="dr. Nama Dokter, Sp.Rad"
                                                className="bg-background font-medium border h-10"
                                            />
                                        )}
                                    </div>
                                    <div className="col-span-4 space-y-2">
                                        <Label htmlFor="e-date" className="text-xs font-bold text-muted-foreground uppercase">Tanggal Laporan</Label>
                                        <Input id="e-date" value={formData.date} onChange={set("date")} className="bg-background font-medium border h-10" />
                                    </div>
                                </div>

                                {(!clinic?.clinicName) && (
                                    <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 shadow-sm">
                                        <span className="text-sm">⚠️</span>
                                        <span>Profil klinik belum diisi. Pergi ke <strong>Settings → Profil Klinik</strong> untuk mengisi nama klinik, alamat, logo, dan daftar dokter.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 border-t bg-muted/50 flex items-center justify-end gap-3 h-16">
                        <Button variant="outline" onClick={() => onOpenChange(false)} className="px-8 h-10">Batal</Button>
                        <Button variant="default" onClick={handleGenerate} disabled={isGenerating} className="gap-2 px-8 h-10 font-bold min-w-[180px]">
                            <HugeiconsIcon icon={FileExportIcon} className="size-4" />
                            {isGenerating ? "Membuat PDF..." : "Generate PDF"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
});

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Study, Series } from "../types";
import { format, parse, isValid } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    WhatsappIcon, 
    SentIcon, 
    RefreshIcon, 
    Image01Icon, 
    ArrowDown01Icon,
    Delete02Icon,
    ImageUploadIcon
} from "@hugeicons/core-free-icons";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { getDoctors, upsertRadiologyReport, getRadiologyReport } from "@/lib/actions/report-actions";
import { cn } from "@/lib/utils";
import { normalizePatientName } from "../utils/format";
import { TemplateSelector } from "./template-selector";

interface SendWhatsappDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    study: Study | null;
    onSend: (target: string, message: string, file?: string, filename?: string, variables?: string[]) => Promise<boolean>;
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

export function SendWhatsappDialog({ open, onOpenChange, study, onSend }: SendWhatsappDialogProps) {
    const [clinic, setClinic] = useState<any>(null);
    const [isSending, setIsSending] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [seriesData, setSeriesData] = useState<Series[]>([]);
    const [selectedInstanceIds, setSelectedInstanceIds] = useState<string[]>([]);
    const [isFetchingSeries, setIsFetchingSeries] = useState(false);
    const [measurementImages, setMeasurementImages] = useState<{file?: File, base64: string, name?: string}[]>([]);
    const [dbDoctors, setDbDoctors] = useState<{id: string, name: string, signature?: string | null, sip?: string | null}[]>([]);
    const [phone, setPhone] = useState("");
    const [waMessage, setWaMessage] = useState("");

    const studyMainTags = study?.MainDicomTags as any;
    const patientTags = study?.PatientMainDicomTags as any;
    
    // Modality handling
    const rawModality = studyMainTags?.Modality || "";
    const getModalityName = (mod: string) => {
        const map: Record<string, string> = {
            "CT": "CT-Scan", "MR": "MRI", "US": "USG", "DX": "Rontgen", "CR": "Rontgen", "PX": "Rontgen", "MG": "Mammografi",
        };
        return map[mod] || "Radiologi";
    };
    const modalityName = getModalityName(rawModality);

    const patientName = normalizePatientName(patientTags?.PatientName || studyMainTags?.PatientName || "");
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
        examType: studyDesc || `Pemeriksaan ${modalityName}`,
        findings: "",
        doctor: "",
        doctorId: "",
        date: format(new Date(), "d MMMM yyyy", { locale: idLocale }),
    });

    useEffect(() => {
        if (open) {
            fetch("/api/config/clinic")
                .then(r => r.json())
                .then(data => setClinic(data))
                .catch(() => console.error("Failed to fetch clinic config"));

            // Get phone from DICOM
            const dicomPhone = patientTags?.PatientTelephoneNumbers || studyMainTags?.PatientTelephoneNumbers || "";
            setPhone(dicomPhone);
            setWaMessage(`Halo Bapak/Ibu ${patientName},\n\nBerikut kami lampirkan hasil laporan radiologi (${modalityName}) Anda${studyDateFormatted ? ` tanggal ${studyDateFormatted}` : ''}.\n\n*Catatan: Dokumen ini dilindungi kata sandi. Silakan masukkan Nomor RM (Rekam Medis) Anda yaitu ${patientID} untuk membuka dokumen ini.*\n\nTerima kasih.`);

            setFormData((prev) => ({
                ...prev,
                age: calcAge(birthDate),
                gender: patientSex === "M" || patientSex === "L" ? "L" : patientSex === "F" || patientSex === "P" ? "P" : "",
                examType: studyDesc || `Pemeriksaan ${modalityName}`,
                date: format(new Date(), "d MMMM yyyy", { locale: idLocale }),
            }));

            // Fetch AI Results
            const studyUID = study?.MainDicomTags?.StudyInstanceUID;
            if (studyUID) {
                fetch(`/api/ai/results?studyInstanceUid=${studyUID}`)
                    .then(r => r.ok ? r.json() : null)
                    .then(aiData => {
                        if (aiData?.findings) {
                            const aiFindingsText = Object.entries(aiData.findings)
                                .filter(([k]) => k !== "Clinical Conclusion")
                                .map(([k, v]) => `• ${k}: ${typeof v === 'number' ? `${(v * 100).toFixed(1)}%` : v}`)
                                .join("\n");
                            setFormData(prev => ({ ...prev, findings: aiFindingsText || prev.findings }));
                        }
                    });
            }

            if (study?.ID) {
                setIsFetchingSeries(true);
                const id = study.ID.includes(".") ? study.ID : study.ID; 
                fetch(`/api/orthanc/studies/${id}/series`)
                    .then(r => r.json())
                    .then(data => {
                        if (Array.isArray(data)) {
                            setSeriesData(data);
                            const uniqueTypes = new Set<string>();
                            data.forEach(s => {
                                const sd = s.MainDicomTags?.SeriesDescription || s.MainDicomTags?.ProtocolName;
                                if (sd && sd.length > 3) uniqueTypes.add(sd);
                            });
                            if (uniqueTypes.size > 0) setFormData(prev => ({ ...prev, examType: Array.from(uniqueTypes).join(", ") }));
                        }
                    }).finally(() => setIsFetchingSeries(false));
            }

            getDoctors().then(res => {
                if (res.success && res.data) {
                    const docs = res.data.map(d => ({ id: d.id, name: d.name || "Unknown", signature: d.signature, sip: d.sip }));
                    setDbDoctors(docs);
                    if (!formData.doctorId && docs.length > 0) {
                        setFormData(prev => ({ ...prev, doctor: docs[0].name, doctorId: docs[0].id }));
                        setSearchValue(docs[0].name);
                    }
                }
            });

            // Load Existing Report
            if (patientID && study?.MainDicomTags?.StudyInstanceUID) {
                getRadiologyReport(patientID, study.MainDicomTags.StudyInstanceUID).then(res => {
                    if (res.success && res.data) {
                        const r = res.data;
                        setFormData(prev => ({
                            ...prev,
                            age: r.age || prev.age,
                            gender: r.patientSex || prev.gender,
                            examType: r.examType || prev.examType,
                            findings: r.findings || prev.findings,
                            doctor: r.doctorName || prev.doctor,
                            doctorId: r.doctorId || prev.doctorId,
                            date: r.reportDate || prev.date,
                        }));
                        if (r.doctorName) setSearchValue(r.doctorName);
                        if (r.measurementImages) setMeasurementImages(r.measurementImages as any);
                        if (r.selectedSeries) setSelectedInstanceIds(r.selectedSeries as string[]);
                        toast.info("Laporan sebelumnya berhasil dimuat");
                    }
                });
            }
        }
    }, [open, study, birthDate, patientSex, studyDesc, modalityName, patientName, patientID]);

    const filteredDoctors = React.useMemo(() => {
        if (!dbDoctors.length || !searchValue) return dbDoctors || [];
        return dbDoctors.filter((d) => d.name.toLowerCase().includes(searchValue.toLowerCase()));
    }, [dbDoctors, searchValue]);

    const imageSeriesData = React.useMemo(() => 
        seriesData.filter(s => !["SR", "PR", "KO", "SEG", "DOC", "REG", "PLAN", "RWV"].includes(s.MainDicomTags.Modality))
    , [seriesData]);

    const compressImage = (base64Str: string): Promise<string> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = base64Str;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                if (width > 1200) { height *= 1200 / width; width = 1200; }
                canvas.width = width; canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
        });
    };

    const handleSend = async () => {
        // Phone is optional now
        const selectedDoc = dbDoctors?.find(d => d.id === formData.doctorId);
        if (!selectedDoc || searchValue !== selectedDoc.name) {
            toast.error("Harap pilih dokter dari daftar");
            return;
        }

        if (!phone) {
            toast.error("Nomor WhatsApp pasien wajib diisi");
            return;
        }

        setIsSending(true);
        try {
            const reportData = {
                patientId: patientID,
                studyInstanceUid: study?.MainDicomTags?.StudyInstanceUID,
                studyDate: studyDateRaw,
                accessionNumber: accessionNumber,
                patientName: patientName,
                patientSex: formData.gender,
                age: formData.age,
                examType: formData.examType,
                findings: formData.findings,
                measurementImages: measurementImages.map(img => ({ base64: img.base64, name: img.name })),
                selectedSeries: selectedInstanceIds,
                doctorId: formData.doctorId,
                doctorName: formData.doctor,
                reportDate: formData.date
            };
            await upsertRadiologyReport(reportData);

            const { default: jsPDF } = await import("jspdf");
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
            if (clinic?.clinicLogo) try { pdf.addImage(clinic.clinicLogo, "PNG", leftMargin, currentY, 20, 20); } catch (e) {}
            pdf.setFont("helvetica", "bold"); pdf.setFontSize(14);
            pdf.text((clinic?.clinicName || "LAPORAN RADIOLOGI").toUpperCase(), pageWidth / 2 + 10, currentY + 5, { align: "center" });
            pdf.setFont("helvetica", "normal"); pdf.setFontSize(9);
            pdf.text(clinic?.clinicAddress || "", pageWidth / 2 + 10, currentY + 11, { align: "center" });
            pdf.text(`Telp/Fax: ${clinic?.clinicPhone || "-"}`, pageWidth / 2 + 10, currentY + 16, { align: "center" });
            currentY += 25;
            pdf.line(leftMargin, currentY, pageWidth - rightMargin, currentY);
            
            // Info Row
            currentY += 10;
            pdf.setFont("helvetica", "bold"); pdf.setFontSize(11);
            pdf.text(`HASIL PEMERIKSAAN ${modalityName.toUpperCase()}`, pageWidth / 2, currentY, { align: "center" });
            currentY += 10; pdf.setFontSize(9);
            
            const drawRow = (l1: string, v1: string, l2: string, v2: string, y: number) => {
                pdf.setFont("helvetica", "bold"); pdf.text(l1, leftMargin + 2, y + 4.5);
                pdf.setFont("helvetica", "normal"); pdf.text(`: ${v1}`, leftMargin + 27, y + 4.5);
                pdf.setFont("helvetica", "bold"); pdf.text(l2, leftMargin + contentWidth/2 + 2, y + 4.5);
                pdf.setFont("helvetica", "normal"); pdf.text(`: ${v2}`, leftMargin + contentWidth/2 + 25, y + 4.5);
                pdf.rect(leftMargin, y, contentWidth, 7);
                pdf.line(leftMargin + contentWidth/2, y, leftMargin + contentWidth/2, y + 7);
                return y + 7;
            };
            currentY = drawRow("Nama", patientName, "Umur", `${formData.age} Thn (${formData.gender})`, currentY);
            currentY = drawRow("No. RM", patientID, "Tgl Foto", studyDateFormatted, currentY);
            
            currentY += 10;
            pdf.setFont("helvetica", "bold"); pdf.text("Jenis:", leftMargin + 2, currentY + 5);
            pdf.setFont("helvetica", "normal"); pdf.text(`: ${formData.examType}`, leftMargin + 27, currentY + 5);
            pdf.rect(leftMargin, currentY, contentWidth, 8);
            currentY += 8;
            
            pdf.setFont("helvetica", "bold"); pdf.text("Exercise:", leftMargin + 2, currentY + 6);
            const splitFindings = pdf.splitTextToSize(formData.findings, contentWidth - 35);
            const findH = Math.max(splitFindings.length * 5, 15) + 4;
            pdf.rect(leftMargin, currentY, contentWidth, findH);
            pdf.line(leftMargin + 32, currentY, leftMargin + 32, currentY + findH);
            pdf.setFont("helvetica", "normal"); pdf.text(splitFindings, leftMargin + 35, currentY + 6);
            currentY += findH + 15;

            // Signature
            const dateText = `${clinic?.clinicCity || ""}, ${formData.date}`;
            pdf.text(dateText, pageWidth - rightMargin, currentY, { align: "right" });
            if (selectedDoc?.signature) try { pdf.addImage(selectedDoc.signature, "PNG", pageWidth - rightMargin - 40, currentY + 5, 30, 15); } catch(e){}
            currentY += 25;
            pdf.setFont("helvetica", "bold");
            pdf.text(`( ${formData.doctor} )`, pageWidth - rightMargin - 15, currentY, { align: "center" });

            // Add Images
            for (const instanceId of selectedInstanceIds) {
                try {
                    const imgResp = await fetch(`/api/orthanc/instances/${instanceId}/preview`);
                    if (imgResp.ok) {
                        const blob = await imgResp.blob();
                        const base64 = await new Promise<string>(r => { const f = new FileReader(); f.onload = () => r(f.result as string); f.readAsDataURL(blob); });
                        pdf.addPage();
                        pdf.addImage(base64, "JPEG", 10, 10, 190, 250);
                    }
                } catch(e) {}
            }

            // Add Measurement Images
            for (const img of measurementImages) {
                try {
                    pdf.addPage();
                    pdf.addImage(img.base64, "JPEG", 10, 10, 190, 250);
                } catch(e) {}
            }

            const pdfBase64 = pdf.output("datauristring");
            const filename = `Laporan_${modalityName}_${patientName.replace(/\s+/g, "_")}.pdf`;

            let success = true;
            if (phone) {
                let cleanPhone = phone.replace(/[^0-9]/g, "");
                if (cleanPhone.startsWith("0")) cleanPhone = "62" + cleanPhone.slice(1);
                
                // Siapkan variabel untuk template WABA (hasil_radiologi / radiologi)
                // 1: Nama, 2: Tanggal, 3: RM, 4: Link Download (On the go)
                const wabaVariables = [
                    patientName,
                    studyDateFormatted || formData.date,
                    patientID,
                    `${window.location.origin}/download/${study?.MainDicomTags?.StudyInstanceUID}`
                ];
                
                success = await onSend(cleanPhone, waMessage, pdfBase64, filename, wabaVariables);
            }
            
            if (success) {
                toast.success(phone ? "Laporan berhasil dikirim ke WhatsApp" : "Laporan berhasil disimpan");
                onOpenChange(false);
            }
        } catch (err) {
            console.error(err);
            toast.error("Gagal mengirim WhatsApp");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0 gap-0 border-none shadow-2xl bg-background">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle className="flex items-center gap-2">
                        <HugeiconsIcon icon={WhatsappIcon} className="size-5 text-primary" />
                        Kirim Laporan via WhatsApp (Kirimi.id)
                    </DialogTitle>
                </DialogHeader>

                <div className="overflow-y-auto p-6 max-h-[calc(90vh-130px)] bg-muted/20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* LEFT COLUMN */}
                        <div className="md:col-span-4 space-y-6">
                            <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-primary flex items-center gap-1">
                                        Nomor WhatsApp Pasien <span className="text-destructive">* (Wajib)</span>
                                    </Label>
                                    <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Contoh: 628123456789" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-muted-foreground">Pesan Pengantar</Label>
                                    <Textarea value={waMessage} onChange={e => setWaMessage(e.target.value)} rows={4} className="text-sm" />
                                </div>
                                <Separator />
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <Label className="text-xs text-muted-foreground uppercase">Umur Pasien</Label>
                                        <Input value={formData.age} onChange={e => setFormData(p => ({...p, age: e.target.value}))} className="w-20 h-8 text-xs" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Label className="text-xs text-muted-foreground uppercase">Gender (L/P)</Label>
                                        <Input value={formData.gender} onChange={e => setFormData(p => ({...p, gender: e.target.value}))} className="w-20 h-8 text-xs" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground uppercase">Dokter Penanggung Jawab <span className="text-destructive">*</span></Label>
                                    <Combobox value={formData.doctorId} onValueChange={(val) => {
                                        const d = dbDoctors.find(x => x.id === val);
                                        if (d) { setFormData(p => ({...p, doctorId: d.id, doctor: d.name})); setSearchValue(d.name); }
                                    }}>
                                        <ComboboxInput placeholder="Cari dokter..." value={searchValue} onChange={e => setSearchValue(e.target.value)} className="h-9 text-sm" />
                                        <ComboboxList>
                                            <ComboboxEmpty>Dokter tidak ditemukan.</ComboboxEmpty>
                                            {filteredDoctors.map(d => <ComboboxItem key={d.id} value={d.id}>{d.name}</ComboboxItem>)}
                                        </ComboboxList>
                                    </Combobox>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                                        Gunakan Template Exercise <span className="text-muted-foreground/60 leading-none lowercase text-[10px] font-normal italic">(Opsional)</span>
                                    </Label>
                                    <TemplateSelector 
                                        doctorId={formData.doctorId} 
                                        onSelectTemplate={(templateText) => {
                                            if (templateText) {
                                                setFormData(prev => ({ ...prev, findings: templateText }));
                                            }
                                        }} 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground uppercase">Tanggal Laporan <span className="text-destructive">*</span></Label>
                                    <Input 
                                        value={formData.date} 
                                        onChange={e => setFormData(p => ({...p, date: e.target.value}))} 
                                        placeholder="Contoh: 10 Juni 2026" 
                                        className="h-9 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="md:col-span-8 space-y-6">
                            <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="font-bold">Jenis Pemeriksaan</Label>
                                    <Input value={formData.examType} onChange={e => setFormData(p => ({...p, examType: e.target.value}))} />
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-bold">Exercise (Findings)</Label>
                                    <Textarea value={formData.findings} onChange={e => setFormData(p => ({...p, findings: e.target.value}))} rows={8} className="font-mono text-sm" />
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-3">
                                        <Label className="font-bold text-base text-foreground flex items-center gap-2">
                                            Sertakan Gambar Series <span className="text-muted-foreground/60 leading-none lowercase text-[10px] font-normal italic">(Multi-select)</span>
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger>
                                                <div role="button" className="w-full flex items-center justify-between h-10 px-3 font-normal bg-background border rounded-md cursor-pointer hover:bg-muted/50 transition-colors text-sm">
                                                    <div className="flex items-center gap-2 truncate">
                                                        <HugeiconsIcon icon={Image01Icon} className="size-4 text-primary" />
                                                        {selectedInstanceIds.length > 0 ? (
                                                            <Badge variant="secondary" className="rounded-sm px-1.5 font-bold bg-primary/10 text-primary border-primary/20">
                                                                {selectedInstanceIds.length} Gambar Terpilih
                                                            </Badge>
                                                        ) : (
                                                            <span className="text-muted-foreground">Pilih gambar...</span>
                                                        )}
                                                    </div>
                                                    <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 opacity-50 shrink-0" />
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[500px] p-0" align="start">
                                                <div className="p-3 border-b bg-muted/30">
                                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pilih Gambar dari Series</p>
                                                </div>
                                                <div className="max-h-[400px] overflow-y-auto p-2 space-y-4">
                                                    {imageSeriesData.length === 0 ? (
                                                        <div className="p-8 text-center text-sm text-muted-foreground italic">Tidak ada series ditemukan.</div>
                                                    ) : (
                                                        imageSeriesData.map(series => {
                                                            const selectedInSeries = series.Instances?.filter(id => selectedInstanceIds.includes(id)) || [];
                                                            const allSelected = series.Instances?.length > 0 && selectedInSeries.length === series.Instances.length;
                                                            return (
                                                                <div key={series.ID} className="border rounded-lg overflow-hidden bg-card shadow-sm">
                                                                    <div 
                                                                        className="flex items-center space-x-3 p-3 bg-muted/20 hover:bg-muted/40 cursor-pointer transition-colors"
                                                                        onClick={() => {
                                                                            if (allSelected) {
                                                                                setSelectedInstanceIds(prev => prev.filter(id => !series.Instances.includes(id)));
                                                                            } else {
                                                                                const newIds = series.Instances.filter(id => !selectedInstanceIds.includes(id));
                                                                                setSelectedInstanceIds(prev => [...prev, ...newIds]);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <Checkbox checked={allSelected} />
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-bold truncate">{series.MainDicomTags.SeriesDescription || "No Description"}</p>
                                                                            <p className="text-[10px] text-muted-foreground">Series #{series.MainDicomTags.SeriesNumber} • {series.Instances?.length || 0} Images</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="p-2 grid grid-cols-5 gap-2 bg-background/50 border-t">
                                                                        {series.Instances?.map((instId, idx) => (
                                                                            <div 
                                                                                key={instId}
                                                                                className={cn(
                                                                                    "relative aspect-square rounded border cursor-pointer hover:border-primary transition-all overflow-hidden group",
                                                                                    selectedInstanceIds.includes(instId) ? "border-primary ring-1 ring-primary ring-inset" : "border-muted"
                                                                                )}
                                                                                onClick={() => {
                                                                                    setSelectedInstanceIds(prev => prev.includes(instId) ? prev.filter(id => id !== instId) : [...prev, instId]);
                                                                                }}
                                                                            >
                                                                                <img src={`/api/orthanc/instances/${instId}/preview`} className="w-full h-full object-cover" />
                                                                                <div className={cn("absolute inset-0 bg-primary/10 flex items-center justify-center transition-opacity", selectedInstanceIds.includes(instId) ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                                                                                    {selectedInstanceIds.includes(instId) && <div className="bg-primary text-white rounded-full p-0.5 shadow-lg"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    )}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <Label className="font-bold text-base text-foreground flex items-center gap-2">
                                            Upload Screenshot Measurement <span className="text-muted-foreground/60 leading-none lowercase text-[10px] font-normal italic">(Opsional)</span>
                                        </Label>
                                        <div className="flex flex-col gap-3">
                                            <Input 
                                                type="file" 
                                                accept="image/jpeg,image/png" 
                                                multiple 
                                                onChange={async (e) => {
                                                    if (!e.target.files) return;
                                                    for (const file of Array.from(e.target.files)) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = async () => {
                                                            const comp = await compressImage(reader.result as string);
                                                            setMeasurementImages(p => [...p, { file, base64: comp, name: file.name }]);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="bg-background file:text-sm file:font-semibold h-10 cursor-pointer" 
                                            />
                                            {measurementImages.length > 0 && (
                                                <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                                                    {measurementImages.map((img, i) => (
                                                        <div key={i} className="relative group rounded-md border overflow-hidden bg-muted aspect-square">
                                                            <img src={img.base64} className="w-full h-full object-cover" />
                                                            <button 
                                                                type="button" 
                                                                onClick={() => setMeasurementImages(p => p.filter((_, idx) => idx !== i))}
                                                                className="absolute top-1 right-1 bg-destructive text-white rounded size-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {(!clinic?.kirimiUserCode || !clinic?.kirimiSecret) && (
                            <div className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 shadow-sm mb-2">
                                <span>⚠️</span>
                                <span>API Kirimi.id belum dikonfigurasi. Pergi ke <strong>Settings → Profil Klinik</strong> untuk memasukkan User Code dan Secret API Kirimi.id agar bisa mengirim WhatsApp.</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-6 py-4 border-t bg-muted/50 flex items-center justify-end gap-3">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSending} className="px-8 h-10">
                        Batal
                    </Button>
                    <Button 
                        variant="default"
                        onClick={handleSend} 
                        disabled={isSending || !clinic?.kirimiUserCode || !clinic?.kirimiSecret || !phone} 
                        className="gap-2 px-8 h-10 font-bold min-w-[200px]"
                    >
                        {isSending ? (
                            <HugeiconsIcon icon={RefreshIcon} className="size-4 animate-spin" />
                        ) : (
                            <HugeiconsIcon icon={SentIcon} className="size-4" />
                        )}
                        {isSending ? "Mengirim..." : (phone ? "Simpan & Kirim WA" : "Simpan Laporan")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

"use client";

import React, { useState } from "react";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Study } from "../types";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    SentIcon, 
    Message01Icon, 
    UserIcon, 
    DoctorIcon,
    InformationCircleIcon
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";

interface SendTelegramDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    study: Study | null;
    onSendToDoctor: (studyId: string) => Promise<void>;
}

export function SendTelegramDialog({
    open,
    onOpenChange,
    study,
    onSendToDoctor
}: SendTelegramDialogProps) {
    const [sending, setSending] = useState(false);
    const [sendToDoctor, setSendToDoctor] = useState(true);
    const [sendToPatient, setSendToPatient] = useState(false);

    if (!study) return null;

    const patientName = study.PatientMainDicomTags?.PatientName || study.MainDicomTags.PatientName || "Unknown";
    const patientPhone = study.PatientMainDicomTags?.PatientTelephoneNumbers || study.MainDicomTags.PatientTelephoneNumbers || "";
    const studyDesc = study.MainDicomTags.StudyDescription || "No Description";

    const handleConfirm = async () => {
        setSending(true);
        try {
            // 1. Send to Doctor (Automated via Bot)
            if (sendToDoctor) {
                await onSendToDoctor(study.ID);
            }

            // 2. Share to Patient (Manual via Link)
            if (sendToPatient) {
                if (!patientPhone) {
                    toast.error("Nomor telepon pasien tidak tersedia.");
                } else {
                    const domain = window.location.origin;
                    const shareText = `Halo ${patientName}, berikut adalah hasil pemeriksaan DICOM Anda (${studyDesc}).\nLihat di: ${domain}/orthanc/studies/${study.ID}/viewer/index.html`;
                    
                    // Format phone number (remove leading 0, add 62 if needed)
                    // Note: Telegram share doesn't support direct phone number selection like WhatsApp wa.me
                    // but we can at least provide the text.
                    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(domain)}&text=${encodeURIComponent(shareText)}`;
                    window.open(telegramUrl, "_blank");
                    
                    toast.success("Membuka Telegram untuk share ke pasien...");
                }
            }

            if (sendToDoctor || sendToPatient) {
                onOpenChange(false);
            } else {
                toast.error("Pilih setidaknya satu tujuan pengiriman.");
            }
        } catch (error: any) {
            console.error("Sharing failed:", error);
            toast.error(error.message || "Gagal mengirim data.");
        } finally {
            setSending(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <HugeiconsIcon icon={Message01Icon} className="size-5 text-blue-600" />
                        Kirim Hasil DICOM
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Pilih tujuan pengiriman untuk Study: <span className="font-semibold text-slate-900">{studyDesc}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex items-start space-x-3 p-3 rounded-lg border bg-slate-50/50 border-slate-200">
                        <Checkbox 
                            id="doctor" 
                            checked={sendToDoctor} 
                            onCheckedChange={(checked) => setSendToDoctor(!!checked)}
                            className="mt-1"
                        />
                        <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="doctor" className="text-sm font-bold flex items-center gap-2 cursor-pointer">
                                <HugeiconsIcon icon={DoctorIcon} className="size-4 text-blue-500" />
                                Kirim ke Dokter (Otomatis)
                            </Label>
                            <p className="text-xs text-muted-foreground">
                                Mengirim preview gambar langsung ke Telegram Dokter via Bot.
                            </p>
                        </div>
                    </div>

                    {/* <div className="flex items-start space-x-3 p-3 rounded-lg border bg-slate-50/50 border-slate-200">
                        <Checkbox 
                            id="patient" 
                            checked={sendToPatient} 
                            onCheckedChange={(checked) => setSendToPatient(!!checked)}
                            className="mt-1"
                        />
                        <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="patient" className="text-sm font-bold flex items-center gap-2 cursor-pointer">
                                <HugeiconsIcon icon={UserIcon} className="size-4 text-green-500" />
                                Share ke Pasien (Manual)
                            </Label>
                            <p className="text-xs text-muted-foreground">
                                Membuka chat Telegram Anda untuk mengirim link ke Pasien: 
                                <span className="ml-1 font-medium text-slate-700">{patientName} ({patientPhone || "No Phone"})</span>
                            </p>
                        </div>
                    </div> */}

                    {!patientPhone && sendToPatient && (
                        <div className="flex items-center gap-2 p-2 text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                            <HugeiconsIcon icon={InformationCircleIcon} className="size-4 shrink-0" />
                            Nomor telepon pasien tidak ditemukan. Link akan dibuka tanpa nomor tujuan.
                        </div>
                    )}
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onOpenChange(false)} disabled={sending}>Batal</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={(e) => {
                            e.preventDefault();
                            handleConfirm();
                        }} 
                        disabled={sending}
                        className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {sending ? "Mengirim..." : (
                            <>
                                <HugeiconsIcon icon={SentIcon} className="size-4" />
                                Proses Pengiriman
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

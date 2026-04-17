"use client";

import React, { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Study } from "../types";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    SentIcon, 
    CheckmarkCircle02Icon,
    AlertCircleIcon,
    InformationCircleIcon,
    UserIcon,
    FingerPrintIcon,
    Search01Icon
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { 
    Clock01Icon, 
    ArrowRight01Icon,
    CodeIcon,
    ComputerTerminalIcon
} from "@hugeicons/core-free-icons";

interface BridgeSatuSehatDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    study: Study | null;
    onBridge: (studyId: string, manualNik?: string) => Promise<void>;
}

export function BridgeSatuSehatDialog({
    open,
    onOpenChange,
    study,
    onBridge
}: BridgeSatuSehatDialogProps) {
    const [nik, setNik] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [bridging, setBridging] = useState(false);
    const [patientInfo, setPatientInfo] = useState<{ id: string, name: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(-1);

    const steps = [
        { id: "patient", label: "Verifikasi Data Pasien", icon: UserIcon },
        { id: "bundle", label: "Registrasi Kunjungan & Diagnosis", icon: FingerPrintIcon },
        { id: "order", label: "Pendaftaran Order (ServiceRequest)", icon: InformationCircleIcon },
        { id: "imaging", label: "Pengiriman Hasil Imaging Study", icon: SentIcon }
    ];

    useEffect(() => {
        if (study && open) {
            const initialNik = study.PatientMainDicomTags?.PatientID || study.MainDicomTags.PatientID || study.MainDicomTags.StudyDescription || "";
            setNik(initialNik);
            setPatientInfo(null);
            setError(null);
        }
    }, [study, open]);

    if (!study) return null;

    const handleVerify = async () => {
        if (!nik || nik.length < 16) {
            toast.error("NIK harus 16 digit");
            return;
        }

        setVerifying(true);
        setError(null);
        setPatientInfo(null);

        try {
            const res = await fetch("/api/satusehat/bridge", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nik })
            });

            const data = await res.json();
            if (res.ok) {
                setPatientInfo(data);
                toast.success(`Pasien terverifikasi: ${data.name}`);
            } else {
                const msg = data.error || "Pasien tidak ditemukan";
                setError(msg);
                toast.error("Verifikasi Gagal", { 
                    description: msg,
                    duration: 5000 
                });
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setVerifying(false);
        }
    };

    const handleConfirm = async () => {
        if (!study || !patientInfo) return;
        
        setBridging(true);
        setLogs(["[CLIENT] Memulai proses bridging..."]);
        setCurrentStep(1); // Mulai dari Bundle (karena pasien sudah di step 0)
        setError(null);

        try {
            const res = await fetch("/api/satusehat/bridge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    studyInstanceUid: study.ID, 
                    manualNik: nik 
                })
            });

            const data = await res.json();
            
            if (data.logs) {
                setLogs(prev => [...prev, ...data.logs]);
            }

            if (res.ok) {
                setCurrentStep(4); // Selesai
                toast.success("Bridging Berhasil", {
                    description: "Data radiologi telah terdaftar di SATUSEHAT"
                });
                setTimeout(() => onOpenChange(false), 2000);
            } else {
                setError(data.error || "Gagal melakukan bridging");
                toast.error("Bridging Gagal", {
                    description: data.error
                });
            }
        } catch (err: any) {
            setError(err.message);
            setLogs(prev => [...prev, `[CLIENT ERROR] ${err.message}`]);
        } finally {
            setBridging(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-emerald-600">
                        <HugeiconsIcon icon={SentIcon} className="size-5" />
                        Bridge ke SATUSEHAT
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Kirim data metadata radiologi untuk Study: 
                        <span className="block font-semibold text-slate-900 mt-1">
                            {study.MainDicomTags.AccessionNumber || "No Accession"} - {study.MainDicomTags.StudyDescription || "No Description"}
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="nik" className="text-sm font-semibold flex items-center gap-2">
                            <HugeiconsIcon icon={FingerPrintIcon} className="size-4 text-slate-400" />
                            Nomor Induk Kependudukan (NIK)
                        </Label>
                        <div className="flex gap-2">
                            <Input 
                                id="nik"
                                placeholder="Masukkan 16 digit NIK"
                                value={nik}
                                onChange={(e) => {
                                    setNik(e.target.value);
                                    setPatientInfo(null);
                                    setError(null);
                                }}
                                className={cn(
                                    "flex-1",
                                    patientInfo && "border-emerald-500 bg-emerald-50/10",
                                    error && "border-red-500 bg-red-50/10"
                                )}
                                maxLength={16}
                            />
                            <Button 
                                variant="outline" 
                                size="sm" 
                                type="button"
                                onClick={handleVerify}
                                disabled={verifying || !nik || nik.length < 16}
                                className="shrink-0"
                            >
                                {verifying ? "..." : (
                                    <>
                                        <HugeiconsIcon icon={Search01Icon} className="size-4 mr-1" />
                                        Verify
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {patientInfo ? (
                        <div className="space-y-4">
                            <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50 animate-in fade-in slide-in-from-top-1">
                                <div className="flex items-start gap-3">
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-emerald-900 leading-none">Pasien Teridentifikasi</p>
                                        <p className="text-xs text-emerald-700 flex items-center gap-1 mt-1">
                                            <HugeiconsIcon icon={UserIcon} className="size-3" />
                                            {patientInfo.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* visual Steps Checklist */}
                            <div className="space-y-2 border rounded-xl p-4 bg-slate-50/50">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Progress Integrasi</p>
                                {steps.map((step, index) => {
                                    const isDone = index < currentStep || (index === 0 && patientInfo);
                                    const isActive = index === currentStep;
                                    
                                    return (
                                        <div key={step.id} className={cn(
                                            "flex items-center gap-3 py-1 transition-all duration-300",
                                            isDone ? "opacity-100" : "opacity-40",
                                            isActive && "opacity-100 scale-[1.02]"
                                        )}>
                                            <div className={cn(
                                                "size-6 rounded-full flex items-center justify-center shrink-0 border",
                                                isDone ? "bg-emerald-500 border-emerald-600 text-white" : 
                                                isActive ? "bg-emerald-50 border-emerald-500 text-emerald-600 animate-pulse" : 
                                                "bg-slate-100 border-slate-200 text-slate-400"
                                            )}>
                                                {isDone ? (
                                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3.5" />
                                                ) : (
                                                    <HugeiconsIcon icon={step.icon} className="size-3.5" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={cn(
                                                    "text-xs font-medium truncate",
                                                    isDone ? "text-emerald-700" : isActive ? "text-slate-900" : "text-slate-500"
                                                )}>
                                                    {step.label}
                                                </p>
                                            </div>
                                            {isActive && <HugeiconsIcon icon={Clock01Icon} className="size-3 text-emerald-500 animate-spin" />}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Technical Console Log */}
                            {(logs.length > 0 || bridging) && (
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                            <HugeiconsIcon icon={ComputerTerminalIcon} className="size-3" />
                                            Technical Log
                                        </p>
                                    </div>
                                    <div className="bg-slate-900 rounded-lg p-3 h-32 overflow-y-auto font-mono text-[10px] space-y-1 text-emerald-400/90 border border-slate-800 shadow-inner">
                                        {logs.map((log, i) => (
                                            <div key={i} className="flex gap-2">
                                                <span className="text-slate-600 shrink-0">[{i+1}]</span>
                                                <span className={cn(
                                                    log.includes("ERROR") ? "text-red-400" : 
                                                    log.includes("Sukses") ? "text-emerald-300 font-bold" : ""
                                                )}>
                                                    {log}
                                                </span>
                                            </div>
                                        ))}
                                        {bridging && (
                                            <div className="flex gap-2 animate-pulse">
                                                <span className="text-slate-600 shrink-0">...</span>
                                                <span className="text-slate-400 italic">Processing at SATUSEHAT server...</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : error ? (
                        <div className="p-3 rounded-lg border border-red-200 bg-red-50 animate-in fade-in slide-in-from-top-1 text-red-700">
                            <div className="flex items-start gap-3">
                                <HugeiconsIcon icon={AlertCircleIcon} className="size-5 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold leading-none">Verifikasi Gagal</p>
                                    <p className="text-xs">{error}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 p-3 text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded-lg">
                            <HugeiconsIcon icon={InformationCircleIcon} className="size-4 shrink-0" />
                            {nik.length === 16 ? "Klik tombol Verifikasi untuk mengecek data pasien." : "NIK wajib 16 digit sesuai identitas pasien."}
                        </div>
                    )}
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onOpenChange(false)} disabled={bridging}>Batal</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={(e) => {
                            e.preventDefault();
                            handleConfirm();
                        }} 
                        disabled={bridging || !patientInfo}
                        className={cn(
                            "gap-2",
                            patientInfo ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-slate-300 text-slate-500 cursor-not-allowed"
                        )}
                    >
                        {bridging ? "Mengirim..." : (
                            <>
                                <HugeiconsIcon icon={SentIcon} className="size-4" />
                                Konfirmasi & Bridge
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

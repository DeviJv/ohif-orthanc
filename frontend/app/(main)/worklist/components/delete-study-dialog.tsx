"use client";

import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Study } from "../types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { verifyPassword } from "@/lib/actions/user-actions";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon, AlertCircleIcon } from "@hugeicons/core-free-icons";

interface DeleteStudyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    study: Study | null;
    onConfirm: (id: string) => void;
}

export function DeleteStudyDialog({
    open,
    onOpenChange,
    study,
    onConfirm
}: DeleteStudyDialogProps) {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!study) return null;

    const patientName = study.PatientMainDicomTags?.PatientName || study.MainDicomTags.PatientName;

    const handleConfirm = async () => {
        if (!password) {
            setError("Password wajib diisi");
            return;
        }

        setIsVerifying(true);
        setError(null);
        try {
            const result = await verifyPassword(password);
            if (result.success) {
                onConfirm(study.ID);
                setPassword(""); // Reset password on success
                onOpenChange(false);
            } else {
                setError("Password salah. Silakan coba lagi.");
                toast.error("Gagal menghapus: Password salah");
            }
        } catch (err) {
            setError("Terjadi kesalahan saat memverifikasi password");
            toast.error("Terjadi kesalahan sistem");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleClose = () => {
        setPassword("");
        setError(null);
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={handleClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-rose-600 dark:text-rose-400">Hapus Study Permanen?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus permanen study untuk pasien 
                        <span className="font-bold text-foreground mx-1">{patientName}</span> 
                        dari server PACS.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="py-4 space-y-3">
                    <div className="space-y-1.5">
                        <Label htmlFor="password-verify" className="text-sm font-medium">
                            Konfirmasi Password Anda
                        </Label>
                        <div className="relative">
                            <Input
                                id="password-verify"
                                type={showPassword ? "text" : "password"}
                                placeholder="Masukkan password Anda..."
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (error) setError(null);
                                }}
                                className={error ? "border-rose-500 focus-visible:ring-rose-500" : ""}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleConfirm();
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                                <HugeiconsIcon icon={showPassword ? ViewOffSlashIcon : ViewIcon} className="size-4" />
                            </button>
                        </div>
                        {error && (
                            <p className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium">
                                <HugeiconsIcon icon={AlertCircleIcon} className="size-3" />
                                {error}
                            </p>
                        )}
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleClose}>Batal</AlertDialogCancel>
                    <Button
                        onClick={handleConfirm}
                        disabled={isVerifying || !password}
                        variant="destructive"
                        className="bg-rose-600 hover:bg-rose-700 text-white font-semibold"
                    >
                        {isVerifying ? "Memverifikasi..." : "Konfirmasi Hapus"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

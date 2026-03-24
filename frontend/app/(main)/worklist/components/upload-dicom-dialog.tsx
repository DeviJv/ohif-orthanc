"use client";

import React, { useState, useRef } from "react";
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
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload01Icon, SmartPhone01Icon, File01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

interface UploadDicomDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpload: (files: FileList, metadata: { PatientTelephoneNumbers?: string }) => Promise<void>;
    uploading: boolean;
}

export function UploadDicomDialog({
    open,
    onOpenChange,
    onUpload,
    uploading
}: UploadDicomDialogProps) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(e.target.files);
        }
    };

    const handleUpload = async () => {
        if (!selectedFiles) return;
        await onUpload(selectedFiles, { PatientTelephoneNumbers: phoneNumber });
        resetForm();
        onOpenChange(false);
    };

    const resetForm = () => {
        setPhoneNumber("");
        setSelectedFiles(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <HugeiconsIcon icon={Upload01Icon} className="size-5 text-primary" />
                        Upload DICOM Study
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Select DICOM files and optional patient metadata to upload to PACS.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                            <HugeiconsIcon icon={SmartPhone01Icon} className="size-4" />
                            Nomor Telepon Pasien (Opsional)
                        </Label>
                        <Input
                            id="phone"
                            placeholder="Contoh: 08123456789"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            disabled={uploading}
                            type="number"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                            <HugeiconsIcon icon={File01Icon} className="size-4" />
                            File DICOM (.dcm)
                        </Label>
                        <div 
                            className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".dcm,application/dicom"
                                disabled={uploading}
                            />
                            {selectedFiles ? (
                                <>
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                                        <HugeiconsIcon icon={Tick02Icon} className="size-6" />
                                    </div>
                                    <p className="text-sm font-semibold">{selectedFiles.length} file dipilih</p>
                                    <p className="text-xs text-muted-foreground underline">Klik untuk ganti file</p>
                                </>
                            ) : (
                                <>
                                    <div className="size-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-1">
                                        <HugeiconsIcon icon={Upload01Icon} className="size-6" />
                                    </div>
                                    <p className="text-sm font-medium">Klik untuk pilih file DICOM</p>
                                    <p className="text-xs text-muted-foreground">Mendukung multiple upload (.dcm)</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={resetForm} disabled={uploading}>Batal</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleUpload();
                        }}
                        disabled={!selectedFiles || uploading}
                        className="gap-2"
                    >
                        {uploading ? (
                            <HugeiconsIcon icon={Upload01Icon} className="size-4 animate-spin" />
                        ) : (
                            <HugeiconsIcon icon={Upload01Icon} className="size-4" />
                        )}
                        {uploading ? "Uploading..." : "Mulai Upload"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

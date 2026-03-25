"use client";

import React, { useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button";
import { Upload01Icon, File01Icon, Delete01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface UploadSeriesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    studyId: string;
    patientName: string;
    onUpload: (files: FileList) => Promise<void>;
    uploading?: boolean;
}

export function UploadSeriesDialog({
    open,
    onOpenChange,
    studyId,
    patientName,
    onUpload,
    uploading = false,
}: UploadSeriesDialogProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length) setSelectedFiles(Array.from(files));
    };

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (selectedFiles.length === 0) return;
        const dt = new DataTransfer();
        selectedFiles.forEach(f => dt.items.add(f));
        await onUpload(dt.files);
        setSelectedFiles([]);
        onOpenChange(false);
    };

    const handleClose = () => {
        if (!uploading) {
            setSelectedFiles([]);
            onOpenChange(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop
                    className="fixed inset-0 z-50 bg-black/50 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 duration-200"
                />
                <Dialog.Popup
                    className={cn(
                        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
                        "w-full max-w-lg bg-background rounded-2xl border shadow-2xl p-6",
                        "data-open:animate-in data-closed:animate-out",
                        "data-closed:fade-out-0 data-open:fade-in-0",
                        "data-closed:zoom-out-95 data-open:zoom-in-95",
                        "duration-200"
                    )}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <Dialog.Title className="text-base font-semibold text-slate-900">
                                Upload Series
                            </Dialog.Title>
                            <Dialog.Description className="text-sm text-muted-foreground mt-1">
                                Upload file DICOM ke study milik{" "}
                                <span className="font-semibold text-slate-700">{patientName}</span>.
                                File akan ditempatkan ke study berdasarkan StudyInstanceUID dalam file.
                            </Dialog.Description>
                        </div>
                        <Dialog.Close
                            render={
                                <Button variant="ghost" size="icon-sm" onClick={handleClose} />
                            }
                        >
                            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
                        </Dialog.Close>
                    </div>

                    {/* Drop Zone */}
                    <div
                        className={cn(
                            "border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer mb-4",
                            isDragging
                                ? "border-primary bg-primary/5"
                                : "border-slate-300 hover:border-primary/50 hover:bg-slate-50"
                        )}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                    >
                        <HugeiconsIcon icon={Upload01Icon} className="size-8 mx-auto text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-600">
                            Klik atau seret file ke sini
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Format: .dcm, .pdf, .stl (bisa multi-file)</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".dcm,.pdf,.stl,application/dicom,application/pdf"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* File List */}
                    {selectedFiles.length > 0 && (
                        <div className="space-y-1 max-h-40 overflow-y-auto mb-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                {selectedFiles.length} file dipilih
                            </p>
                            {selectedFiles.map((file, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 text-[11px] bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5"
                                >
                                    <HugeiconsIcon icon={File01Icon} className="size-3 text-primary shrink-0" />
                                    <span className="flex-1 truncate text-slate-700">{file.name}</span>
                                    <span className="text-slate-400 shrink-0">
                                        {(file.size / 1024).toFixed(0)} KB
                                    </span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleRemoveFile(i); }}
                                        className="text-slate-400 hover:text-destructive transition-colors"
                                    >
                                        <HugeiconsIcon icon={Delete01Icon} className="size-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={handleClose} disabled={uploading}>
                            Batal
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={selectedFiles.length === 0 || uploading}
                            className="gap-2"
                        >
                            <HugeiconsIcon icon={Upload01Icon} className="size-4" />
                            {uploading
                                ? "Uploading…"
                                : `Upload${selectedFiles.length > 0 ? ` (${selectedFiles.length})` : ""}`}
                        </Button>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

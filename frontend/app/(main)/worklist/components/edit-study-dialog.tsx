"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Study } from "../types";
import { format, parse, isValid } from "date-fns";
import { Calendar01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

function parseDicomDate(dicomDate: string): Date | undefined {
    if (!dicomDate || dicomDate.length !== 8) return undefined;
    const parsed = parse(dicomDate, "yyyyMMdd", new Date());
    return isValid(parsed) ? parsed : undefined;
}

function formatDicomDate(date: Date): string {
    return format(date, "yyyyMMdd");
}

interface EditStudyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    study: Study | null;
    onConfirm: (studyId: string, modifications: Record<string, string>) => Promise<void>;
}

export function EditStudyDialog({ open, onOpenChange, study, onConfirm }: EditStudyDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        PatientName: "",
        PatientID: "",
        PatientBirthDate: "",
        PatientSex: "",
        StudyDate: "",
        StudyDescription: "",
        AccessionNumber: "",
        StudyID: "",
        PatientTelephoneNumbers: "",
    });

    useEffect(() => {
        if (study && open) {
            const tags = (study.PatientMainDicomTags || study.MainDicomTags) as any;
            const mainTags = study.MainDicomTags as any;
            
            setFormData({
                PatientName: tags.PatientName || mainTags.PatientName || "",
                PatientID: tags.PatientID || mainTags.PatientID || "",
                PatientBirthDate: tags.PatientBirthDate || mainTags.PatientBirthDate || "",
                PatientSex: tags.PatientSex || mainTags.PatientSex || "",
                StudyDate: mainTags.StudyDate || "",
                StudyDescription: mainTags.StudyDescription || "",
                AccessionNumber: mainTags.AccessionNumber || "",
                StudyID: mainTags.StudyID || "",
                PatientTelephoneNumbers: tags.PatientTelephoneNumbers || mainTags.PatientTelephoneNumbers || "",
            });
        }
    }, [study, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!study) return;

        const tags = (study.PatientMainDicomTags || study.MainDicomTags) as any;
        const mainTags = study.MainDicomTags as any;
        const originalData = {
            PatientName: tags.PatientName || mainTags.PatientName || "",
            PatientID: tags.PatientID || mainTags.PatientID || "",
            PatientBirthDate: tags.PatientBirthDate || mainTags.PatientBirthDate || "",
            PatientSex: tags.PatientSex || mainTags.PatientSex || "",
            StudyDate: mainTags.StudyDate || "",
            StudyDescription: mainTags.StudyDescription || "",
            AccessionNumber: mainTags.AccessionNumber || "",
            StudyID: mainTags.StudyID || "",
            PatientTelephoneNumbers: tags.PatientTelephoneNumbers || mainTags.PatientTelephoneNumbers || "",
        };

        const modifications: Record<string, string> = {};
        let hasChanges = false;
        
        Object.entries(formData).forEach(([key, value]) => {
            const originalVal = originalData[key as keyof typeof originalData];
            if (value !== originalVal) {
                modifications[key] = value;
                hasChanges = true;
                
                // Also update RequestedProcedureID if StudyID is modified
                if (key === "StudyID") {
                    modifications["RequestedProcedureID"] = value;
                }
            }
        });

        if (!hasChanges) {
            onOpenChange(false);
            return;
        }

        setIsSubmitting(true);
        try {
            await onConfirm(study.ID, modifications);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Study Metadata</DialogTitle>
                        <DialogDescription>
                            Ubah metadata pasien dan study di bawah ini. Harap diperhatikan bahwa proses ini akan membuat salinan baru dari study dengan metadata yang diperbarui dan akan menggantikan study yang lama secara default.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="PatientName" className="text-right text-xs font-semibold uppercase text-slate-500">
                                Patient Name
                            </Label>
                            <Input
                                id="PatientName"
                                name="PatientName"
                                value={formData.PatientName}
                                onChange={handleChange}
                                className="col-span-3 h-9"
                                placeholder="Mis: JOHN^DOE"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="PatientID" className="text-right text-xs font-semibold uppercase text-slate-500">
                                Patient ID
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="PatientID"
                                    name="PatientID"
                                    value={formData.PatientID}
                                    onChange={handleChange}
                                    className="h-9"
                                    placeholder="RM / NIK Pasien"
                                    disabled
                                    title="Patient ID tidak bisa diubah karena merubah Patient ID akan merubah Study ID pada Orthanc."
                                />
                                <p className="text-[10px] text-muted-foreground mt-1">
                                    *Tidak dapat diubah. Mengubah Patient ID akan membuat link Telegram / Orthanc ID berubah.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="PatientBirthDate" className="text-right text-xs font-semibold uppercase text-slate-500">
                                Birth Date
                            </Label>
                            <div className="col-span-3">
                                <Popover>
                                    <PopoverTrigger
                                        className={cn(
                                            buttonVariants({ variant: "outline" }),
                                            "w-full justify-start text-left font-normal h-9",
                                            !formData.PatientBirthDate && "text-muted-foreground"
                                        )}
                                    >
                                        <HugeiconsIcon icon={Calendar01Icon} className="mr-2 size-4" />
                                        {formData.PatientBirthDate && parseDicomDate(formData.PatientBirthDate) ? (
                                            format(parseDicomDate(formData.PatientBirthDate)!, "PPP")
                                        ) : (
                                            <span>Pilih tanggal lahir</span>
                                        )}
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={formData.PatientBirthDate ? parseDicomDate(formData.PatientBirthDate) : undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    setFormData(prev => ({ ...prev, PatientBirthDate: formatDicomDate(date) }));
                                                }
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="PatientSex" className="text-right text-xs font-semibold uppercase text-slate-500">
                                Gender
                            </Label>
                            <Input
                                id="PatientSex"
                                name="PatientSex"
                                value={formData.PatientSex}
                                onChange={handleChange}
                                className="col-span-3 h-9"
                                placeholder="M / F / O"
                                maxLength={1}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="StudyDate" className="text-right text-xs font-semibold uppercase text-slate-500">
                                Study Date
                            </Label>
                            <div className="col-span-3">
                                <Popover>
                                    <PopoverTrigger
                                        className={cn(
                                            buttonVariants({ variant: "outline" }),
                                            "w-full justify-start text-left font-normal h-9",
                                            !formData.StudyDate && "text-muted-foreground"
                                        )}
                                    >
                                        <HugeiconsIcon icon={Calendar01Icon} className="mr-2 size-4" />
                                        {formData.StudyDate && parseDicomDate(formData.StudyDate) ? (
                                            format(parseDicomDate(formData.StudyDate)!, "PPP")
                                        ) : (
                                            <span>Pilih tanggal study</span>
                                        )}
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={formData.StudyDate ? parseDicomDate(formData.StudyDate) : undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    setFormData(prev => ({ ...prev, StudyDate: formatDicomDate(date) }));
                                                }
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="StudyDescription" className="text-right text-xs font-semibold uppercase text-slate-500">
                                Description
                            </Label>
                            <Input
                                id="StudyDescription"
                                name="StudyDescription"
                                value={formData.StudyDescription}
                                onChange={handleChange}
                                className="col-span-3 h-9"
                                placeholder="Deskripsi Study"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="AccessionNumber" className="text-right text-xs font-semibold uppercase text-slate-500">
                                Accession #
                            </Label>
                            <Input
                                id="AccessionNumber"
                                name="AccessionNumber"
                                value={formData.AccessionNumber}
                                onChange={handleChange}
                                className="col-span-3 h-9"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="StudyID" className="text-right text-xs font-semibold uppercase text-slate-500">
                                Order ID
                            </Label>
                            <Input
                                id="StudyID"
                                name="StudyID"
                                value={formData.StudyID}
                                onChange={handleChange}
                                className="col-span-3 h-9"
                                placeholder="Order ID / Study ID"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="PatientTelephoneNumbers" className="text-right text-xs font-semibold uppercase text-slate-500">
                                Patient Phone
                            </Label>
                            <Input
                                id="PatientTelephoneNumbers"
                                name="PatientTelephoneNumbers"
                                value={formData.PatientTelephoneNumbers}
                                onChange={handleChange}
                                className="col-span-3 h-9"
                                placeholder="Mis: 08123456789"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

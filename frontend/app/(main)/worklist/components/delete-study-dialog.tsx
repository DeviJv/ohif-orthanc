"use client";

import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Study } from "../types";

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
    if (!study) return null;

    const patientName = study.PatientMainDicomTags?.PatientName || study.MainDicomTags.PatientName;

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus permanen study untuk pasien 
                        <span className="font-bold text-foreground mx-1">{patientName}</span> 
                        dari server PACS.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => onConfirm(study.ID)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Hapus Permanen
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

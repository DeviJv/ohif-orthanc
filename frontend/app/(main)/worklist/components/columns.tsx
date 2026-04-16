"use client";

import React from "react";
import { 
    ArrowDown01Icon, 
    ViewIcon, 
    Download01Icon, 
    Delete01Icon, 
    PencilEdit01Icon, 
    SentIcon,
    LayersLogoIcon,
    FileExportIcon,
    AiCloud01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Study } from "../types";
import { formatDicomDate } from "../utils/format";
import { Checkbox } from "@/components/ui/checkbox";

import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export interface WorklistTableMeta {
    expandedStudies: Record<string, boolean>;
    aiResults?: Record<string, any>;
    ssIntegrationStatus?: Record<string, any>;
}

interface GetColumnsProps {
    toggleStudyExpansion: (id: string) => void;
    handleOpenViewer: (uid: string, mode?: string) => void;
    handleDownload: (id: string, name: string) => void;
    setStudyToDelete: (study: Study) => void;
    setIsDeleteDialogOpen: (open: boolean) => void;
    openEditDialog: (study: Study) => void;
    openSendTelegramDialog: (study: Study) => void;
    openExportPdfDialog: (study: Study) => void;
    aiMode?: string;
    handleRunAi?: (studyId: string) => void;
    openAiResultDialog?: (result: any, patientName: string) => void;
    handleBridgeSatuSehat?: (studyId: string, manualNik?: string) => void;
    openBridgeDialog?: (study: Study) => void;
    ssIntegrationStatus?: Record<string, any>;
}

export const getColumns = ({
    toggleStudyExpansion,
    handleOpenViewer,
    handleDownload,
    setStudyToDelete,
    setIsDeleteDialogOpen,
    openEditDialog,
    openSendTelegramDialog,
    openExportPdfDialog,
    aiMode,
    handleRunAi,
    openAiResultDialog,
    handleBridgeSatuSehat,
    openBridgeDialog,
    ssIntegrationStatus,
}: GetColumnsProps): ColumnDef<Study>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center px-2 relative z-30 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate") as any}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center px-2 relative z-30 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "expander",
        header: () => null,
        cell: ({ row, table }) => {
            const meta = table.options.meta as WorklistTableMeta;
            return (
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => toggleStudyExpansion(row.original.ID)}
                >
                    <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        className={`size-4 transition-transform duration-200 ${meta.expandedStudies[row.original.ID] ? "rotate-180" : ""}`}
                    />
                </Button>
            );
        },
    },
    {
        accessorFn: (row) => row.PatientMainDicomTags?.PatientName || row.MainDicomTags.PatientName,
        id: "patientName",
        header: "Patient Name",
        cell: ({ getValue }) => <span className="font-semibold">{getValue() as string}</span>,
        enableGlobalFilter: true,
    },
    {
        accessorFn: (row) => row.PatientMainDicomTags?.PatientID || row.MainDicomTags.PatientID,
        id: "patientID",
        header: "Patient ID",
        enableGlobalFilter: true,
    },
    {
        accessorFn: (row) => (row.PatientMainDicomTags as any)?.PatientBirthDate || (row.MainDicomTags as any)?.PatientBirthDate,
        id: "birthDate",
        header: "Birth Date",
        cell: ({ getValue }) => {
            const val = getValue() as string;
            return val ? formatDicomDate(val) : "-";
        },
    },
    {
        accessorFn: (row) => (row.PatientMainDicomTags as any)?.PatientSex || (row.MainDicomTags as any)?.PatientSex,
        id: "gender",
        header: "Gender",
        cell: ({ getValue }) => {
            const val = (getValue() as string)?.toUpperCase();
            if (!val) return "-";
            const labels: Record<string, string> = { M: "Male", F: "Female" };
            return labels[val] ?? val;
        },
    },
    {
        accessorFn: (row) => row.PatientMainDicomTags?.PatientTelephoneNumbers || row.MainDicomTags.PatientTelephoneNumbers,
        id: "phone",
        header: "Phone",
        cell: ({ getValue }) => getValue() || "-",
    },
    {
        accessorKey: "MainDicomTags.StudyDate",
        id: "studyDate",
        header: "Study Date",
        cell: ({ getValue }) => formatDicomDate(getValue() as string),
        filterFn: (row, columnId, value) => {
            const dateStr = row.getValue(columnId) as string;
            const range = value as DateRange | undefined;
            if (!range || (!range.from && !range.to)) return true;
            if (!dateStr) return false;
            
            // DICOM Date is YYYYMMDD
            const year = parseInt(dateStr.slice(0, 4), 10);
            const month = parseInt(dateStr.slice(4, 6), 10) - 1;
            const day = parseInt(dateStr.slice(6, 8), 10);
            
            // Create date at 00:00:00 local time
            const studyDate = new Date(year, month, day);

            // Normalize range dates to 00:00:00 local time for fair comparison
            if (range.from) {
                const fromDate = new Date(range.from.getFullYear(), range.from.getMonth(), range.from.getDate());
                if (studyDate < fromDate) return false;
            }
            
            if (range.to) {
                const toDate = new Date(range.to.getFullYear(), range.to.getMonth(), range.to.getDate());
                if (studyDate > toDate) return false;
            }
            
            return true;
        },
    },
    {
        accessorKey: "MainDicomTags.StudyDescription",
        id: "description",
        header: "Description",
        cell: ({ getValue }) => (
            <div className="max-w-[200px] truncate" title={getValue() as string}>
                {getValue() as string || "-"}
            </div>
        ),
    },
    {
        id: "aiResult",
        header: "AI Summary",
        cell: ({ row, table }) => {
            const meta = table.options.meta as WorklistTableMeta;
            const studyUidRaw = (row.original.MainDicomTags.StudyInstanceUID || "").trim();
            const studyUid = studyUidRaw.toUpperCase();
            const patientName = row.original.PatientMainDicomTags?.PatientName || row.original.MainDicomTags.PatientName;
            const result = meta.aiResults?.[studyUid] || meta.aiResults?.[studyUidRaw];
            
            // Console log to debug matching process
            if (meta.aiResults && Object.keys(meta.aiResults).length > 0) {
                console.log(`[DEBUG TABLE] Checking AI for Patient: ${patientName}, UID: "${studyUidRaw}" - Found: ${!!result}`);
            }

            if (!result) return <span className="text-slate-400 text-xs italic">-</span>;

            return (
                <div className="flex items-center gap-2">
                    {result.isUrgent && (
                        <div className="size-2 rounded-full bg-rose-500 animate-pulse shrink-0" title="Urgent Finding" />
                    )}
                    <Button
                        size="sm"
                        variant="ghost"
                        className={`h-8 px-3 text-[11px] font-bold uppercase transition-all rounded-lg ${
                            result.isUrgent 
                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200' 
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border border-emerald-200'
                        }`}
                        onClick={() => openAiResultDialog?.(result, patientName)}
                    >
                        View Results
                    </Button>
                </div>
            );
        }
    },
    {
        id: "actions",
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => {
            const study = row.original;
            const patientName = study.PatientMainDicomTags?.PatientName || study.MainDicomTags.PatientName;
            return (
                <div className="flex justify-end gap-1.5">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-primary hover:text-primary hover:bg-primary/5"
                        onClick={() => handleOpenViewer(study.MainDicomTags.StudyInstanceUID)}
                        title="View Study"
                    >
                        <HugeiconsIcon icon={ViewIcon} className="size-4" />
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        onClick={() => handleOpenViewer(study.MainDicomTags.StudyInstanceUID, "segmented")}
                        title="Open MPR Segmented Viewer"
                    >
                        <HugeiconsIcon icon={LayersLogoIcon} className="size-4" />
                    </Button>

                    {handleRunAi && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="size-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 disabled:opacity-30"
                            onClick={() => handleRunAi?.(study.ID)}
                            title="Run AI Analysis Manually"
                            disabled={aiMode === "OFF"}
                        >
                            <HugeiconsIcon icon={AiCloud01Icon} className="size-4" />
                        </Button>
                    )}

                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-slate-600 hover:text-slate-700 hover:bg-slate-100"
                        onClick={() => handleDownload(study.ID, patientName)}
                        title="Download ZIP"
                    >
                        <HugeiconsIcon icon={Download01Icon} className="size-4" />
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => openSendTelegramDialog(study)}
                        title="Send to Telegram Doctor"
                    >
                        <HugeiconsIcon icon={SentIcon} className="size-4" />
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        onClick={() => openExportPdfDialog(study)}
                        title="Export Laporan PDF"
                    >
                        <HugeiconsIcon icon={FileExportIcon} className="size-4" />
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        className={cn(
                            "size-8 p-0 transition-all",
                            ssIntegrationStatus?.[study.MainDicomTags.StudyInstanceUID]?.status === "SUCCESS"
                                ? "text-emerald-500 bg-emerald-50/50"
                                : "text-slate-400 hover:text-primary hover:bg-primary/5"
                        )}
                        onClick={() => openBridgeDialog?.(study)}
                        title={
                            ssIntegrationStatus?.[study.MainDicomTags.StudyInstanceUID]?.status === "SUCCESS"
                                ? "Sudah Terkirim ke Satu Sehat"
                                : "Kirim ke Satu Sehat"
                        }
                    >
                        <HugeiconsIcon 
                            icon={SentIcon} 
                            className={cn(
                                "size-4", 
                                ssIntegrationStatus?.[study.MainDicomTags.StudyInstanceUID]?.status === "PROCESSING" && "animate-spin"
                            )} 
                        />
                    </Button>

                    <div className="h-4 w-px bg-slate-200 self-center mx-0.5" />

                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        onClick={() => openEditDialog(study)}
                        title="Edit Study Metadata"
                    >
                        <HugeiconsIcon icon={PencilEdit01Icon} className="size-4" />
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                        onClick={() => {
                            setStudyToDelete(study);
                            setIsDeleteDialogOpen(true);
                        }}
                        title="Delete Study"
                    >
                        <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                    </Button>
                </div>
            );
        },
    },
];

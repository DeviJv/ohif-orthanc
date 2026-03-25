"use client";

import React from "react";
import { 
    ArrowDown01Icon, 
    ViewIcon, 
    Download01Icon, 
    Delete01Icon, 
    PencilEdit01Icon, 
    SentIcon,
    LayersLogoIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Study } from "../types";
import { formatDicomDate } from "../utils/format";
import { Checkbox } from "@/components/ui/checkbox";

import { DateRange } from "react-day-picker";

interface GetColumnsProps {
    expandedStudies: Record<string, boolean>;
    toggleStudyExpansion: (id: string) => void;
    handleOpenViewer: (uid: string, mode?: string) => void;
    handleDownload: (id: string, name: string) => void;
    setStudyToDelete: (study: Study) => void;
    setIsDeleteDialogOpen: (open: boolean) => void;
    handleEditPatient: (id: string, name: string) => void;
    openSendTelegramDialog: (study: Study) => void;
}

export const getColumns = ({
    expandedStudies,
    toggleStudyExpansion,
    handleOpenViewer,
    handleDownload,
    setStudyToDelete,
    setIsDeleteDialogOpen,
    handleEditPatient,
    openSendTelegramDialog
}: GetColumnsProps): ColumnDef<Study>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center pr-2">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate") as any}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center pr-2">
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
        cell: ({ row }) => (
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => toggleStudyExpansion(row.original.ID)}
            >
                <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className={`size-4 transition-transform duration-200 ${expandedStudies[row.original.ID] ? "rotate-180" : ""}`}
                />
            </Button>
        ),
    },
    {
        accessorFn: (row) => row.PatientMainDicomTags?.PatientName || row.MainDicomTags.PatientName,
        id: "patientName",
        header: "Patient Name",
        cell: ({ getValue }) => <span className="font-semibold">{getValue() as string}</span>,
    },
    {
        accessorFn: (row) => row.PatientMainDicomTags?.PatientID || row.MainDicomTags.PatientID,
        id: "patientID",
        header: "Patient ID",
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
            
            const studyDate = new Date(
                parseInt(dateStr.slice(0, 4)),
                parseInt(dateStr.slice(4, 6)) - 1,
                parseInt(dateStr.slice(6, 8))
            );

            if (range.from && studyDate < range.from) return false;
            if (range.to && studyDate > range.to) return false;
            
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
        id: "actions",
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => {
            const study = row.original;
            const patientName = study.PatientMainDicomTags?.PatientName || study.MainDicomTags.PatientName;
            return (
                <div className="flex justify-end gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        className="gap-2"
                        onClick={() => handleOpenViewer(study.MainDicomTags.StudyInstanceUID)}
                    >
                        <HugeiconsIcon icon={ViewIcon} className="size-4" />
                        View
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                        onClick={() => handleOpenViewer(study.MainDicomTags.StudyInstanceUID, "segmented")}
                        title="Open Segmented Viewer"
                    >
                        <HugeiconsIcon icon={LayersLogoIcon} className="size-4" />
                        Segmented
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        className="gap-2"
                        onClick={() => handleDownload(study.ID, patientName)}
                    >
                        <HugeiconsIcon icon={Download01Icon} className="size-4" />
                        ZIP
                    </Button>

                    <Button
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                        onClick={() => {
                            setStudyToDelete(study);
                            setIsDeleteDialogOpen(true);
                        }}
                    >
                        <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                        Delete
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0"
                        onClick={() => handleEditPatient(study.ID, patientName)}
                        title="Edit Patient Name"
                    >
                        <HugeiconsIcon icon={PencilEdit01Icon} className="size-4" />
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
                </div>
            );
        },
    },
];

"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { formatDicomDate } from "../../worklist/utils/format";
import { MergedStudy } from "../hooks/use-satusehat-worklist";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { SentIcon, Alert01Icon, InformationCircleIcon } from "@hugeicons/core-free-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface GetColumnsProps {
    openBridgeDialog: (study: MergedStudy) => void;
    openErrorDialog: (study: MergedStudy) => void;
}

export const getColumns = ({
    openBridgeDialog,
    openErrorDialog
}: GetColumnsProps): ColumnDef<MergedStudy>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center px-2" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate") as any}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center px-2" onClick={(e) => e.stopPropagation()}>
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
        accessorKey: "MainDicomTags.StudyDate",
        id: "studyDate",
        header: "Study Date",
        cell: ({ getValue }) => formatDicomDate(getValue() as string),
        filterFn: (row, columnId, filterValue: { from?: Date, to?: Date }) => {
            if (!filterValue || (!filterValue.from && !filterValue.to)) return true;
            
            const rawDateStr = row.getValue(columnId) as string;
            if (!rawDateStr) return false;
            
            // Format YYYYMMDD
            const year = parseInt(rawDateStr.substring(0, 4));
            const month = parseInt(rawDateStr.substring(4, 6)) - 1;
            const day = parseInt(rawDateStr.substring(6, 8));
            const rowDate = new Date(year, month, day);
            
            // Normalize times to midnight for comparison
            rowDate.setHours(0,0,0,0);
            
            if (filterValue.from && filterValue.to) {
                const fromDate = new Date(filterValue.from);
                fromDate.setHours(0,0,0,0);
                const toDate = new Date(filterValue.to);
                toDate.setHours(0,0,0,0);
                return rowDate >= fromDate && rowDate <= toDate;
            } else if (filterValue.from) {
                const fromDate = new Date(filterValue.from);
                fromDate.setHours(0,0,0,0);
                return rowDate >= fromDate;
            }
            return true;
        }
    },
    {
        accessorKey: "MainDicomTags.AccessionNumber",
        id: "accessionNumber",
        header: "Accession",
        cell: ({ getValue }) => {
           const acc = getValue() as string;
           return (
               <span className="font-mono text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-semibold border border-slate-200">
                   {acc || "N/A"}
               </span>
           );
        }
    },
    {
        accessorFn: (row) => row.satuSehat.status,
        id: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue() as string;
            let bgColor = "bg-slate-100";
            let textColor = "text-slate-600";
            let label = "Pending";

            if (status === "SUCCESS") {
                bgColor = "bg-slate-900";
                textColor = "text-white ring-1 ring-slate-800 shadow-sm";
                label = "Terkirim";
            } else if (status === "FAILED") {

                bgColor = "bg-rose-100";
                textColor = "text-rose-700";
                label = "Gagal";
            } else if (status === "PROCESSING") {
                bgColor = "bg-amber-100";
                textColor = "text-amber-700";
                label = "Memproses...";
            }

            return (
                <div className={cn("px-2.5 py-1 text-xs font-semibold rounded-full inline-flex items-center", bgColor, textColor)}>
                    {label}
                </div>
            );
        },
        filterFn: (row, columnId, filterValue: string) => {
            if (!filterValue || filterValue === "ALL") return true;
            if (filterValue === "PENDING") {
               return ["PENDING", "PROCESSING"].includes(row.getValue(columnId) as string);
            }
            return row.getValue(columnId) === filterValue;
        }
    },
    {
        accessorFn: (row) => row.satuSehat.syncedAt,
        id: "syncedAt",
        header: "Selesai Pada",
        cell: ({ getValue }) => {
            const dateStr = getValue() as string;
            if (!dateStr) return <span className="text-xs text-slate-400 italic">-</span>;
            
            const date = new Date(dateStr).toLocaleDateString("id-ID", {
                day: "2-digit", month: "short", year: "numeric", hour: '2-digit', minute:'2-digit'
            });
            return <span className="text-xs text-slate-600 font-medium">{date}</span>;
        },
        sortingFn: "datetime"
    },
    {
        id: "errorDetail",
        header: "Error Details",
        cell: ({ row }) => {
            const ss = row.original.satuSehat;
            if (ss.status === "FAILED") {
                return (
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-8 gap-1.5"
                        onClick={() => openErrorDialog(row.original)}
                    >
                        <HugeiconsIcon icon={Alert01Icon} className="size-4" />
                        View Error
                    </Button>
                )
            }
            return <span className="text-xs text-slate-400 italic">No errors</span>;
        }
    },
    {
        id: "actions",
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => {
            const study = row.original;
            const isSuccess = study.satuSehat.status === "SUCCESS";
            const isLoading = study.satuSehat.status === "PROCESSING";
            
            return (
                <div className="flex justify-end gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className={cn(
                            "gap-2 h-8",
                            isSuccess 
                                ? "border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700" 
                                : "border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
                        )}
                        onClick={() => openBridgeDialog(study)}
                        disabled={isLoading}
                    >
                        <HugeiconsIcon icon={SentIcon} className={cn("size-4", isLoading && "animate-spin")} />
                        {isSuccess ? "Resync" : "Sync Now"}
                    </Button>
                </div>
            );
        },
    },
];

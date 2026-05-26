"use client";

import React from "react";
import { 
    Delete01Icon, 
    FileExportIcon,
    ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Report } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { normalizePatientName } from "../../worklist/utils/format";

interface GetColumnsProps {
    onEdit: (report: Report) => void;
    onDelete: (report: Report) => void;
}

export const getColumns = ({
    onEdit,
    onDelete,
}: GetColumnsProps): ColumnDef<Report>[] => [
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
        accessorKey: "patientName",
        header: "Patient Name",
        cell: ({ getValue }) => <span className="font-semibold">{normalizePatientName(getValue() as string) || "-"}</span>,
    },
    {
        accessorKey: "patientId",
        header: "Patient ID",
    },
    {
        accessorKey: "orderId",
        header: "Order ID",
        cell: ({ getValue }) => getValue() || "-",
    },
    {
        accessorKey: "accessionNumber",
        header: "Accession Number",
        cell: ({ getValue }) => getValue() || "-",
    },
    {
        accessorKey: "studyDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="group -ml-4 h-8 data-[state=open]:bg-accent font-bold"
                >
                    Study Date
                    <HugeiconsIcon 
                        icon={ArrowDown01Icon} 
                        className={cn(
                            "ml-2 size-4 transition-transform", 
                            column.getIsSorted() === "desc" ? "" : column.getIsSorted() === "asc" ? "rotate-180" : "opacity-0 group-hover:opacity-100"
                        )} 
                    />
                </Button>
            );
        },
        cell: ({ getValue }) => {
            const val = getValue() as string;
            if (!val || val.length !== 8) return val || "-";
            const year = parseInt(val.slice(0, 4));
            const month = parseInt(val.slice(4, 6)) - 1;
            const day = parseInt(val.slice(6, 8));
            return format(new Date(year, month, day), "d MMM yyyy", { locale: idLocale });
        },
    },
    {
        accessorKey: "examType",
        header: "Exam Type",
        cell: ({ getValue }) => getValue() || "-",
    },
    {
        accessorKey: "findings",
        header: "Exercise",
        cell: ({ getValue }) => {
            const val = getValue() as string;
            if (!val) return <span className="text-slate-400 italic">-</span>;
            
            const isLong = val.length > 40;
            const displayVal = isLong ? `${val.substring(0, 40)}...` : val;
            
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <span className="cursor-help hover:text-primary transition-colors">
                                {displayVal}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-sm p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl rounded-xl">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="size-1.5 rounded-full bg-primary" />
                                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Detail Exercise</p>
                                </div>
                                <p className="text-xs leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-300 font-medium">{val}</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        accessorKey: "doctorName",
        header: "Doctor",
        cell: ({ getValue }) => getValue() || "-",
    },
    {
        accessorKey: "reportDate",
        id: "reportDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="group -ml-4 h-8 data-[state=open]:bg-accent font-bold"
                >
                    Report Date
                    <HugeiconsIcon 
                        icon={ArrowDown01Icon} 
                        className={cn(
                            "ml-2 size-4 transition-transform", 
                            column.getIsSorted() === "desc" ? "" : column.getIsSorted() === "asc" ? "rotate-180" : "opacity-0 group-hover:opacity-100"
                        )} 
                    />
                </Button>
            );
        },
        cell: ({ getValue }) => getValue() || "-",
    },
    {
        accessorKey: "createdAt",
        id: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="group -ml-4 h-8 data-[state=open]:bg-accent font-bold"
                >
                    Created At
                    <HugeiconsIcon 
                        icon={ArrowDown01Icon} 
                        className={cn(
                            "ml-2 size-4 transition-transform", 
                            column.getIsSorted() === "desc" ? "" : column.getIsSorted() === "asc" ? "rotate-180" : "opacity-0 group-hover:opacity-100"
                        )} 
                    />
                </Button>
            );
        },
        cell: ({ getValue }) => format(new Date(getValue() as string), "d MMM yyyy HH:mm", { locale: idLocale }),
    },
    {
        id: "actions",
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => {
            const report = row.original;
            return (
                <div className="flex justify-end gap-1.5">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                        onClick={() => onEdit(report)}
                        title="Edit & Export Report"
                    >
                        <HugeiconsIcon icon={FileExportIcon} className="size-4" />
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                        onClick={() => onDelete(report)}
                        title="Delete Report"
                    >
                        <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                    </Button>
                </div>
            );
        },
    },
];

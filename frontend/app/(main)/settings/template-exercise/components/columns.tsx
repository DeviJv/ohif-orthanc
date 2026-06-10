"use client";

import React from "react";
import { Delete01Icon, Edit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { TemplateExercise } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface GetColumnsProps {
    onEdit: (item: TemplateExercise) => void;
    onDelete: (item: TemplateExercise) => void;
}

export const getColumns = ({
    onEdit,
    onDelete,
}: GetColumnsProps): ColumnDef<TemplateExercise>[] => [
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
        accessorKey: "user.name",
        id: "doctor",
        header: "Doctor",
        cell: ({ row }) => <span className="font-semibold">{row.original.user?.name || "-"}</span>,
    },
    {
        accessorKey: "nama",
        header: "Template Name",
    },
    {
        accessorKey: "template",
        header: "Template Exercise",
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
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ getValue }) => format(new Date(getValue() as string), "d MMM yyyy HH:mm", { locale: idLocale }),
    },
    {
        id: "actions",
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => {
            const item = row.original;
            return (
                <div className="flex justify-end gap-1.5">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                        onClick={() => onEdit(item)}
                        title="Edit Template"
                    >
                        <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                        onClick={() => onDelete(item)}
                        title="Delete Template"
                    >
                        <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                    </Button>
                </div>
            );
        },
    },
];

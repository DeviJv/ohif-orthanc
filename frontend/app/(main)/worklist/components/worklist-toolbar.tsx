"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
    Search01Icon, 
    RefreshIcon, 
    Upload01Icon, 
    Calendar01Icon, 
    LayoutTableIcon,
    Delete01Icon,
    Download01Icon,
    MoreVerticalIcon,
    FilterIcon,
    UserIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Study } from "../types";
import { UploadDicomDialog } from "./upload-dicom-dialog";

interface WorklistToolbarProps {
    table: Table<Study>;
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    dateRange: DateRange | undefined;
    setDateRange: (range: DateRange | undefined) => void;
    uploading: boolean;
    handleFileUpload: (files: FileList, metadata?: { PatientTelephoneNumbers?: string }) => Promise<void>;
    fetchStudies: () => void;
    handleBulkDelete: () => void;
    handleBulkDownload: () => void;
    doctors: any[];
}

const COMMON_MODALITIES = [
    "CT", "MR", "CR", "DX", "US", "SR", "MG", "XA", "NM", "OT"
];

export function WorklistToolbar({
    table,
    globalFilter,
    setGlobalFilter,
    dateRange,
    setDateRange,
    uploading,
    handleFileUpload,
    fetchStudies,
    handleBulkDelete,
    handleBulkDownload,
    doctors
}: WorklistToolbarProps) {
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

    return (
        <Card className="mb-6 shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="flex flex-1 flex-wrap items-center gap-2 md:gap-4">
                        {/* ... existing bulk actions dropdown ... */}
                        {table.getFilteredSelectedRowModel().rows.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "size-8 p-0 shrink-0 select-none items-center justify-center")}>
                                    <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-48">
                                    <DropdownMenuLabel>Bulk Actions ({table.getFilteredSelectedRowModel().rows.length})</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleBulkDownload} className="gap-2 cursor-pointer">
                                        <HugeiconsIcon icon={Download01Icon} className="size-4" />
                                        Download Studies
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleBulkDelete} className="gap-2 text-destructive focus:text-destructive cursor-pointer" variant="destructive">
                                        <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                                        Delete Studies
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                        <div className="relative w-full md:w-auto md:flex-1 md:max-w-sm">
                            <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search Patient Name or ID..."
                                className="pl-9 w-full"
                                value={globalFilter ?? ""}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                            />
                        </div>

                        <Popover>
                            <PopoverTrigger 
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "sm" }),
                                    "gap-2 border-slate-200 dark:border-slate-800 shrink-0",
                                    (table.getColumn("modalities")?.getFilterValue() as string[] || []).length > 0 && "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"
                                )}
                            >
                                <HugeiconsIcon icon={FilterIcon} className="size-4" />
                                <span>Modality</span>
                                {(table.getColumn("modalities")?.getFilterValue() as string[] || []).length > 0 && (
                                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                                        {(table.getColumn("modalities")?.getFilterValue() as string[] || []).length}
                                    </span>
                                )}
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-3" align="start">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-sm">Modality Filter</h4>
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            className="h-auto p-0 text-xs text-blue-600 hover:bg-transparent"
                                            onClick={() => table.getColumn("modalities")?.setFilterValue([])}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-2.5">
                                        {COMMON_MODALITIES.map((modality) => {
                                            const selected = (table.getColumn("modalities")?.getFilterValue() as string[] || []).includes(modality);
                                            return (
                                                <div key={modality} className="flex items-center gap-2">
                                                    <Checkbox 
                                                        id={`modality-${modality}`}
                                                        checked={selected}
                                                        onCheckedChange={(checked) => {
                                                            const current = (table.getColumn("modalities")?.getFilterValue() as string[] || []);
                                                            const next = checked 
                                                                ? [...current, modality]
                                                                : current.filter(m => m !== modality);
                                                            table.getColumn("modalities")?.setFilterValue(next.length ? next : undefined);
                                                        }}
                                                    />
                                                    <label 
                                                        htmlFor={`modality-${modality}`}
                                                        className="text-xs font-medium cursor-pointer select-none leading-none"
                                                    >
                                                        {modality}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        
                        <Popover>
                            <PopoverTrigger 
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "sm" }),
                                    "gap-2 border-slate-200 dark:border-slate-800 shrink-0",
                                    (table.getColumn("doctor")?.getFilterValue() as string[] || []).length > 0 && "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
                                )}
                            >
                                <HugeiconsIcon icon={UserIcon} className="size-4" />
                                <span>Doctor</span>
                                {(table.getColumn("doctor")?.getFilterValue() as string[] || []).length > 0 && (
                                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                                        {(table.getColumn("doctor")?.getFilterValue() as string[] || []).length}
                                    </span>
                                )}
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-3" align="start">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-sm">Doctor Filter</h4>
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            className="h-auto p-0 text-xs text-emerald-600 hover:bg-transparent"
                                            onClick={() => table.getColumn("doctor")?.setFilterValue([])}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                                        <div className="flex items-center gap-2">
                                            <Checkbox 
                                                id="doc-all"
                                                checked={!(table.getColumn("doctor")?.getFilterValue() as string[] || []).length}
                                                onCheckedChange={() => table.getColumn("doctor")?.setFilterValue([])}
                                            />
                                            <label htmlFor="doc-all" className="text-xs font-medium cursor-pointer select-none">All Doctors</label>
                                        </div>
                                        {doctors?.map((doc) => {
                                            const current = (table.getColumn("doctor")?.getFilterValue() as string[] || []);
                                            const selected = current.includes(doc.name);
                                            return (
                                                <div key={doc.id} className="flex items-center gap-2">
                                                    <Checkbox 
                                                        id={`doc-${doc.id}`}
                                                        checked={selected}
                                                        onCheckedChange={(checked) => {
                                                            const next = checked 
                                                                ? [...current, doc.name]
                                                                : current.filter(m => m !== doc.name);
                                                            table.getColumn("doctor")?.setFilterValue(next.length ? next : undefined);
                                                        }}
                                                    />
                                                    <label 
                                                        htmlFor={`doc-${doc.id}`}
                                                        className="text-xs font-medium cursor-pointer select-none leading-none"
                                                    >
                                                        {doc.name}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-md px-2 py-1 bg-slate-50 dark:bg-slate-950">
                                <Popover>
                                    <PopoverTrigger className="inline-flex items-center gap-2 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors px-1 rounded-sm">
                                        <HugeiconsIcon icon={Calendar01Icon} className="size-4 text-muted-foreground dark:text-slate-500" />
                                        {dateRange?.from ? (
                                            dateRange.to ? (
                                                <>
                                                    {format(dateRange.from, "LLL dd, y")} -{" "}
                                                    {format(dateRange.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(dateRange.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a study date range</span>
                                        )}
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="range"
                                            defaultMonth={dateRange?.from}
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                                
                                {dateRange && (
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="size-5 hover:text-destructive ml-1"
                                        onClick={() => setDateRange(undefined)}
                                    >
                                        <HugeiconsIcon icon={RefreshIcon} className="size-3" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button 
                            variant="default" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => setIsUploadDialogOpen(true)}
                            disabled={uploading}
                        >
                            {uploading ? (
                                <HugeiconsIcon icon={RefreshIcon} className="size-4 animate-spin" />
                            ) : (
                                <HugeiconsIcon icon={Upload01Icon} className="size-4" />
                            )}
                            Upload DICOM
                        </Button>

                        <UploadDicomDialog 
                            open={isUploadDialogOpen}
                            onOpenChange={setIsUploadDialogOpen}
                            onUpload={handleFileUpload}
                            uploading={uploading}
                        />

                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2"
                            onClick={fetchStudies}
                        >
                            <HugeiconsIcon icon={RefreshIcon} className="size-4" />
                            Refresh
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}>
                                <HugeiconsIcon icon={LayoutTableIcon} className="size-4" />
                                Columns
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    {table.getAllColumns()
                                        .filter((column) => column.getCanHide())
                                        .map((column) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.getIsVisible()}
                                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                                >
                                                    {column.id === "patientName" ? "Patient Name" : 
                                                     column.id === "patientID" ? "Patient ID" :
                                                     column.id === "phone" ? "Phone Number" :
                                                     column.id === "studyDate" ? "Study Date" :
                                                     column.id === "modalities" ? "Modality" :
                                                     column.id === "description" ? "Description" : 
                                                     column.id}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        })}
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );}

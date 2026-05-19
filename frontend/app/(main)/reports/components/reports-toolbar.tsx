"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
    Search01Icon, 
    RefreshIcon, 
    Calendar01Icon, 
    FileExportIcon,
    Download01Icon,
    Delete01Icon,
    MoreVerticalIcon,
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
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Report } from "../types";

interface ReportsToolbarProps {
    table: Table<Report>;
    patientName: string;
    setPatientName: (value: string) => void;
    accessionNumber: string;
    setAccessionNumber: (value: string) => void;
    dateRange: DateRange | undefined;
    setDateRange: (range: DateRange | undefined) => void;
    handleBulkDelete: () => void;
    handleBulkDownload: () => void;
    handleExportCSV: (ids?: string[]) => void;
    refresh: () => void;
    doctorNames: string[];
    setDoctorNames: (val: string[]) => void;
    doctors: any[];
}

export function ReportsToolbar({
    table,
    patientName,
    setPatientName,
    accessionNumber,
    setAccessionNumber,
    dateRange,
    setDateRange,
    handleBulkDelete,
    handleBulkDownload,
    handleExportCSV,
    refresh,
    doctorNames,
    setDoctorNames,
    doctors
}: ReportsToolbarProps) {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const hasSelection = selectedRows.length > 0;

    return (
        <Card className="mb-6 shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-1 flex-wrap items-center gap-4">
                        {/* LEFT SIDE: Bulk Actions Dropdown (3 dots) - Exactly like Worklist */}
                        {hasSelection && (
                            <DropdownMenu>
                                <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "size-8 p-0 shrink-0 select-none flex items-center justify-center")}>
                                    <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-48">
                                    <DropdownMenuLabel>Bulk Actions ({selectedRows.length})</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleBulkDownload} className="gap-2 cursor-pointer">
                                        <HugeiconsIcon icon={Download01Icon} className="size-4 text-blue-500" />
                                        Download ZIP
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleBulkDelete} className="gap-2 text-destructive focus:text-destructive cursor-pointer">
                                        <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                                        Delete Reports
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                        <div className="relative w-full md:w-auto md:flex-1 md:max-w-[240px]">
                            <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search patient name, ID..."
                                className="pl-9 h-9 w-full"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                            />
                        </div>

                        <div className="relative w-full md:w-auto md:flex-1 md:max-w-[200px]">
                            <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Accession No..."
                                className="pl-9 h-9 w-full"
                                value={accessionNumber}
                                onChange={(e) => setAccessionNumber(e.target.value)}
                            />
                        </div>

                        <Popover>
                            <PopoverTrigger 
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "sm" }),
                                    "gap-2 border-slate-200 dark:border-slate-800 shrink-0 h-9",
                                    doctorNames.length > 0 && "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
                                )}
                            >
                                <HugeiconsIcon icon={UserIcon} className="size-4" />
                                <span>Doctor</span>
                                {doctorNames.length > 0 && (
                                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                                        {doctorNames.length}
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
                                            onClick={() => setDoctorNames([])}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                                        <div className="flex items-center gap-2">
                                            <Checkbox 
                                                id="doc-all"
                                                checked={!doctorNames.length}
                                                onCheckedChange={() => setDoctorNames([])}
                                            />
                                            <label htmlFor="doc-all" className="text-xs font-medium cursor-pointer select-none">All Doctors</label>
                                        </div>
                                        {doctors?.map((doc) => {
                                            const selected = doctorNames.includes(doc.name);
                                            return (
                                                <div key={doc.id} className="flex items-center gap-2">
                                                    <Checkbox 
                                                        id={`doc-${doc.id}`}
                                                        checked={selected}
                                                        onCheckedChange={(checked) => {
                                                            const next = checked 
                                                                ? [...doctorNames, doc.name]
                                                                : doctorNames.filter(m => m !== doc.name);
                                                            setDoctorNames(next);
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
                            <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-md px-2 py-1 bg-slate-50 dark:bg-slate-950 h-9">
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
                                            <span>Study date range</span>
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

                    {/* RIGHT SIDE: Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Status label for selection */}
                        {hasSelection && (
                            <div className="hidden lg:flex items-center px-3 py-1 bg-primary/5 border border-primary/20 rounded-full">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                                    {selectedRows.length} Selected
                                </span>
                            </div>
                        )}

                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-9 gap-2 px-3 font-bold bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 transition-all shadow-sm"
                            onClick={() => handleExportCSV(hasSelection ? selectedRows.map(r => r.original.id) : undefined)}
                        >
                            <HugeiconsIcon icon={FileExportIcon} className="size-4" />
                            <span>Export CSV</span>
                        </Button>

                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-9 gap-2 px-3 font-bold"
                            onClick={refresh}
                        >
                            <HugeiconsIcon icon={RefreshIcon} className="size-4" />
                            <span>Refresh</span>
                        </Button>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}

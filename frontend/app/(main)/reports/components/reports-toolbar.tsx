"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
    Search01Icon, 
    RefreshIcon, 
    Calendar01Icon, 
    Delete01Icon,
    Download01Icon,
    MoreVerticalIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
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
    refresh: () => void;
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
    refresh
}: ReportsToolbarProps) {
    return (
        <Card className="mb-6 shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-3">
                        <div className="relative flex-1 max-w-[240px]">
                            <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Patient Name..."
                                className="pl-9 h-9"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                            />
                        </div>

                        <div className="relative flex-1 max-w-[200px]">
                            <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Accession No..."
                                className="pl-9 h-9"
                                value={accessionNumber}
                                onChange={(e) => setAccessionNumber(e.target.value)}
                            />
                        </div>
                        
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

                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="size-9 p-0 shrink-0"
                            onClick={refresh}
                        >
                            <HugeiconsIcon icon={RefreshIcon} className="size-4" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        {table.getFilteredSelectedRowModel().rows.length > 0 && (
                            <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-md px-2 py-1">
                                <span className="text-xs font-bold text-primary mr-2">
                                    {table.getFilteredSelectedRowModel().rows.length} selected
                                </span>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-7 gap-2 bg-background"
                                    onClick={handleBulkDownload}
                                >
                                    <HugeiconsIcon icon={Download01Icon} className="size-3.5" />
                                    Download ZIP
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    size="sm" 
                                    className="h-7 gap-2"
                                    onClick={handleBulkDelete}
                                >
                                    <HugeiconsIcon icon={Delete01Icon} className="size-3.5" />
                                    Delete
                                </Button>
                            </div>
                        )}

                        <DropdownMenu>
                            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "size-9 p-0")}>
                                <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={refresh} className="gap-2 cursor-pointer">
                                    <HugeiconsIcon icon={RefreshIcon} className="size-4" />
                                    Refresh Data
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}

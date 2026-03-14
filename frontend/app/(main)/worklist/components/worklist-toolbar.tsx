"use client";

import React, { useState, useRef } from "react";
import { 
    Search01Icon, 
    RefreshIcon, 
    Upload01Icon, 
    Calendar01Icon, 
    LayoutTableIcon 
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Study } from "../types";

interface WorklistToolbarProps {
    table: Table<Study>;
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    dateRange: DateRange | undefined;
    setDateRange: (range: DateRange | undefined) => void;
    uploading: boolean;
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fetchStudies: () => void;
}

export function WorklistToolbar({
    table,
    globalFilter,
    setGlobalFilter,
    dateRange,
    setDateRange,
    uploading,
    handleFileUpload,
    fetchStudies
}: WorklistToolbarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <Card className="mb-6 shadow-sm border-slate-200">
            <CardHeader className="pb-3 border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search Patient Name or ID..."
                                className="pl-9"
                                value={globalFilter ?? ""}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 border rounded-md px-2 py-1 bg-muted/20">
                                <Popover>
                                    <PopoverTrigger className="inline-flex items-center gap-2 text-xs font-medium hover:bg-muted/30 transition-colors px-1 rounded-sm">
                                        <HugeiconsIcon icon={Calendar01Icon} className="size-4 text-muted-foreground" />
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

                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".dcm,application/dicom"
                        />
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                        >
                            {uploading ? (
                                <HugeiconsIcon icon={RefreshIcon} className="size-4 animate-spin" />
                            ) : (
                                <HugeiconsIcon icon={Upload01Icon} className="size-4" />
                            )}
                            Upload DICOM
                        </Button>

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
                            <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2">
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
                                                     column.id === "studyDate" ? "Study Date" :
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
    );
}

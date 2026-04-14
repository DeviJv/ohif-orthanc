"use client";

import React, { useCallback, useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    Search01Icon, 
    Download01Icon, 
    Calendar03Icon,
    SentIcon,
    RefreshIcon,
    Cancel01Icon
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface SatuSehatToolbarProps<TData> {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    dateRange: DateRange | undefined;
    setDateRange: (range: DateRange | undefined) => void;
    fetchStudies: () => void;
    handleBulkDownload: () => void;
    handleBulkSync: (selectedIds: string[]) => void;
}

export function SatuSehatToolbar<TData>({
    table,
    globalFilter,
    setGlobalFilter,
    dateRange,
    setDateRange,
    fetchStudies,
    handleBulkDownload,
    handleBulkSync
}: SatuSehatToolbarProps<TData>) {
    
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const hasSelection = selectedRows.length > 0;

    const onBulkSyncClick = useCallback(() => {
        // extract IDs from selected rows
        const ids = selectedRows.map((row: any) => row.original.ID as string);
        handleBulkSync(ids);
        table.toggleAllRowsSelected(false);
    }, [selectedRows, handleBulkSync, table]);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                <div className="relative group w-full sm:w-72 shrink-0">
                    <HugeiconsIcon
                        icon={Search01Icon}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-primary transition-colors"
                    />
                    <Input
                        placeholder="Search patient name, ID..."
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="pl-9 bg-white border-slate-200 focus-visible:ring-primary/20 shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-2 shrink-0 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                    <Popover>
                        <PopoverTrigger 
                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 px-3 gap-2 font-medium ${
                                dateRange?.from || dateRange?.to
                                    ? "bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 bg-transparent"
                            }`}
                        >
                            <HugeiconsIcon icon={Calendar03Icon} className="size-4" />
                            {dateRange?.from ? (
                                dateRange.to ? (
                                    <>
                                        {format(dateRange.from, "LLL dd")} -{" "}
                                        {format(dateRange.to, "LLL dd")}
                                    </>
                                ) : (
                                    format(dateRange.from, "LLL dd")
                                )
                            ) : (
                                <span>Date Filter</span>
                            )}
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>

                    {(dateRange?.from || dateRange?.to) && (
                        <div className="flex items-center pr-1 border-l border-slate-200">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                onClick={() => setDateRange(undefined)}
                            >
                                <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
                            </Button>
                        </div>
                    )}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0 bg-white shadow-sm border-slate-200 text-slate-600 hover:text-primary hover:bg-primary/5 hover:border-primary/20"
                    onClick={fetchStudies}
                    title="Refresh Data"
                >
                    <HugeiconsIcon icon={RefreshIcon} className="size-4" />
                </Button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                <div className="flex items-center gap-2">
                    {hasSelection && (
                        <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 border-dashed animate-in fade-in slide-in-from-right-2">
                            {selectedRows.length} terpilih
                        </span>
                    )}
                    
                    <Button 
                        variant="default" 
                        className="gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/10 h-9"
                        onClick={onBulkSyncClick}
                    >
                        <HugeiconsIcon icon={SentIcon} className="size-4" />
                        {hasSelection ? "Sync Terpilih" : "Bulk Sync (Semua)"}
                    </Button>
                    
                    {hasSelection && (
                        <Button 
                            variant="secondary" 
                            className="gap-2 shadow-sm h-9 animate-in fade-in slide-in-from-right-2"
                            onClick={handleBulkDownload}
                        >
                            <HugeiconsIcon icon={Download01Icon} className="size-4" />
                            Bulk Download
                        </Button>
                    )}
                </div>
            </div>

        </div>
    );
}

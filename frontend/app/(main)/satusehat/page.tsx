"use client";

import React, { useState, useMemo } from "react";
import { 
    useReactTable, 
    getCoreRowModel, 
    getPaginationRowModel, 
    getSortedRowModel, 
    getFilteredRowModel, 
    ColumnFiltersState, 
    SortingState, 
    VisibilityState,
    PaginationState,
    flexRender
} from "@tanstack/react-table";
import { DateRange } from "react-day-picker";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { SentIcon } from "@hugeicons/core-free-icons";

// Hooks and Components
import { useSatuSehatWorklist } from "./hooks/use-satusehat-worklist";
import { getColumns } from "./components/columns";
import { SatuSehatToolbar } from "./components/satusehat-toolbar";
import { SatuSehatStats } from "./components/satusehat-stats";
import { WebhookMonitor } from "./components/webhook-monitor";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

import { handleBulkDownloadStudy } from "../worklist/utils/actions";
import { useTaskActions } from "@/context/task-context";
import { BridgeSatuSehatDialog } from "../worklist/components/bridge-satusehat-dialog";

export default function SatuSehatIntegrationPage() {
    return (
        <Suspense fallback={<div className="p-8"><Skeleton className="w-full h-[600px] rounded-2xl" /></div>}>
            <SatuSehatContent />
        </Suspense>
    );
}

function SatuSehatContent() {
    const { addTask, updateTask } = useTaskActions();
    const {
        studies,
        loading,
        fetchStudies,
        handleBridgeSatuSehat,
        handleBulkSync,
        isBridgeDialogOpen, setIsBridgeDialogOpen,
        selectedStudyForBridge, openBridgeDialog,
        isErrorDialogOpen, setIsErrorDialogOpen,
        selectedStudyError, openErrorDialog
    } = useSatuSehatWorklist();

    // Table State
    const [sorting, setSorting] = useState<SortingState>([{ id: "syncedAt", desc: true }]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [statusFilter, setStatusFilter] = useState("ALL");

    // Columns
    const columns = useMemo(() => getColumns({
        openErrorDialog
    }), [openErrorDialog]);

    // Table Instance
    const tableOptions = useMemo(() => ({
        data: studies,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
            rowSelection,
            pagination,
        },
    }), [studies, columns, sorting, columnFilters, globalFilter, columnVisibility, rowSelection, pagination]);

    const table = useReactTable(tableOptions);

    const handleSetDateRange = (range: DateRange | undefined) => {
        setDateRange(range);
        setColumnFilters(prev => {
            const others = prev.filter(f => f.id !== "studyDate");
            if (!range) return others;
            return [...others, { id: "studyDate", value: range }];
        });
    };

    const handleSetStatusFilter = (val: string) => {
        setStatusFilter(val);
        setColumnFilters(prev => {
            const others = prev.filter(f => f.id !== "status");
            if (val === "ALL") return others;
            return [...others, { id: "status", value: val }];
        });
    };

    const handleBulkDownload = () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        if (selectedRows.length === 0) return;
        const ids = selectedRows.map(row => row.original.ID);
        handleBulkDownloadStudy(ids, { addTask, updateTask });
    };

    return (
        <div className="p-6 w-full space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">SatuSehat Sync</h1>
                <p className="text-muted-foreground">Monitoring dan sinkronisasi manual data DICOM ke platform SatuSehat Kemenkes.</p>
            </div>

            <SatuSehatStats studies={studies} />


            <div className="mt-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm rounded-xl overflow-hidden flex flex-col backdrop-blur-sm">
                <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-transparent">
                    <SatuSehatToolbar 
                        table={table}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        dateRange={dateRange}
                        setDateRange={handleSetDateRange}
                        statusFilter={statusFilter}
                        setStatusFilter={handleSetStatusFilter}
                        fetchStudies={fetchStudies}
                        handleBulkSync={handleBulkSync}
                        handleBulkDownload={handleBulkDownload}
                    />
                </div>

                <div className="w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="border-slate-100 dark:border-slate-800">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="font-bold text-slate-700 dark:text-slate-300">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell colSpan={columns.length} className="py-4">
                                            <Skeleton className="h-8 w-full" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors border-slate-100 dark:border-slate-800"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="py-4 text-slate-900 dark:text-slate-100">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-40 text-center text-slate-400 dark:text-slate-600 italic">
                                        No studies found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-transparent">
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground font-medium">
                            Showing {table.getFilteredRowModel().rows.length} studies
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground whitespace-nowrap px-2 border-l border-slate-100 dark:border-slate-800">Show per page</span>
                            <Select
                                value={table.getState().pagination.pageSize.toString()}
                                onValueChange={(value) => table.setPageSize(Number(value))}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 30, 50, 100].map((pageSize) => (
                                        <SelectItem key={pageSize} value={pageSize.toString()}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            Previous
                        </Button>
                        <div className="flex items-center gap-1 text-sm font-medium px-2">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bridge Dialog */}
            <BridgeSatuSehatDialog
                open={isBridgeDialogOpen}
                onOpenChange={setIsBridgeDialogOpen}
                study={selectedStudyForBridge as any}
                onBridge={handleBridgeSatuSehat}
            />

            {/* Error Detail Dialog */}
            <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-rose-600 dark:text-rose-400 flex items-center gap-2">
                            <span className="p-1.5 bg-rose-100 dark:bg-rose-950/30 rounded-full inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            </span>
                            SatuSehat Integration Error
                        </DialogTitle>
                        <DialogDescription>
                            Detail kegagalan sinkronisasi dari endpoint Kemenkes SatuSehat.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="mt-4 space-y-4">
                        <div>
                            <h4 className="text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Error Message:</h4>
                            <div className="p-3 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 text-sm rounded-md border border-rose-100 dark:border-rose-900/50">
                                {selectedStudyError?.error || "Unknown Error"}
                            </div>
                        </div>

                        {selectedStudyError?.bundleResponse && (
                            <div>
                                <h4 className="text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Raw Response (JSON):</h4>
                                <div className="bg-slate-900 border border-slate-800 rounded-md p-4 overflow-x-auto max-h-[300px]">
                                    <pre className="text-xs text-emerald-400 font-mono">
                                        {/* Try to format if valid JSON string, otherwise raw */}
                                        {(() => {
                                            try {
                                                const parsed = typeof selectedStudyError.bundleResponse === 'string' 
                                                    ? JSON.parse(selectedStudyError.bundleResponse) 
                                                    : selectedStudyError.bundleResponse;
                                                return JSON.stringify(parsed, null, 2);
                                            } catch(e) {
                                                return String(selectedStudyError.bundleResponse);
                                            }
                                        })()}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="mt-6">
                        <Button variant="outline" onClick={() => setIsErrorDialogOpen(false)}>Close</Button>
                        <Button 
                            className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                            onClick={() => {
                                setIsErrorDialogOpen(false);
                                if (selectedStudyError && selectedStudyForBridge) {
                                    // Normally we should track the ID being viewed, but fallback to dialog
                                }
                            }}
                        >
                           Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <WebhookMonitor />

        </div>
    );
}

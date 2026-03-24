"use client";

import React, { useState } from "react";
import { 
    RefreshIcon, 
    ArrowLeft01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

import { useWorklist } from "./hooks/use-worklist";
import { useStudyNotifier } from "./hooks/use-study-notifier";
import { useTasks } from "@/context/task-context";
import { getColumns } from "./components/columns";
import { WorklistToolbar } from "./components/worklist-toolbar";
import { StudyDetailRow } from "./components/study-detail-row";
import { DeleteStudyDialog } from "./components/delete-study-dialog";
import { BulkDeleteStudyDialog } from "./components/bulk-delete-dialog";
import { SendTelegramDialog } from "./components/send-telegram-dialog";
import { handleDownloadStudy, handleOpenOrthancViewer, handleDownloadSeries, handleDownloadInstance, handleBulkDownloadStudy } from "./utils/actions";
import { Study } from "./types";
import { Skeleton } from "@/components/ui/skeleton";
import OhifViewer from "../../../components/ohif-viewer";
import BasicViewer from "../../../components/basic-viewer";

export default function WorklistPage() {
    const {
        studies, loading, uploading,
        expandedStudies, expandedSeries, expandedInstances,
        seriesData, instancesData, tagsData,
        toggleStudyExpansion, toggleSeriesExpansion, toggleInstanceExpansion,
        handleDeleteStudy, handleDeleteSeries, handleDeleteInstance,
        handleEditPatient, handleAnonymize,
        handleAddLabel, handleRemoveLabel,
        handleFileUpload, fetchStudies, handleSendToTelegram,
        isSendTelegramDialogOpen, setIsSendTelegramDialogOpen,
        selectedStudyForTelegram, openSendTelegramDialog
    } = useWorklist();

    // Setup Study Notifier (Sound & Toast on new studies)
    useStudyNotifier(studies, fetchStudies);

    // UI States
    const [showViewer, setShowViewer] = useState(false);
    const [selectedStudyUID, setSelectedStudyUID] = useState<string | null>(null);
    const [viewerMode, setViewerMode] = useState("viewer");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
    const [studyToDelete, setStudyToDelete] = useState<Study | null>(null);

    // Table State
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const { addTask, updateTask } = useTasks();

    const handleOpenViewer = (uid: string, mode: string = "viewer") => {
        setSelectedStudyUID(uid);
        setViewerMode(mode);
        setShowViewer(true);
    };

    const handleDownloadStudyWithTasks = (id: string, name: string) => {
        handleDownloadStudy(id, name, { addTask, updateTask });
    };

    const handleDeleteStudyLocal = async (id: string) => {
        try {
            await handleDeleteStudy(id);
            setIsDeleteDialogOpen(false);
            setStudyToDelete(null);
        } catch (error) {
            console.error("Failed to delete study:", error);
        }
    };

    const handleBulkDelete = () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        if (selectedRows.length === 0) return;
        setIsBulkDeleteDialogOpen(true);
    };

    const handleConfirmBulkDelete = async () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        if (selectedRows.length === 0) return;

        // Delete all selected studies in parallel
        const deletePromises = selectedRows.map(row => handleDeleteStudy(row.original.ID));
        
        try {
            await Promise.all(deletePromises);
            setRowSelection({}); // Clear selection after delete
            setIsBulkDeleteDialogOpen(false);
            fetchStudies();
        } catch (error) {
            console.error("Bulk delete failed:", error);
        }
    };

    const handleBulkDownload = () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        if (selectedRows.length === 0) return;
        
        const ids = selectedRows.map(row => row.original.ID);
        handleBulkDownloadStudy(ids, { addTask, updateTask });
    };

    const columns = getColumns({
        expandedStudies,
        toggleStudyExpansion,
        handleOpenViewer,
        handleDownload: handleDownloadStudyWithTasks,
        setStudyToDelete,
        setIsDeleteDialogOpen,
        handleEditPatient,
        openSendTelegramDialog
    });

    const table = useReactTable({
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
    });

    // Effect for date range filter
    React.useEffect(() => {
        table.getColumn("studyDate")?.setFilterValue(dateRange);
    }, [dateRange, table]);

    if (showViewer && selectedStudyUID) {
        return (
            <div className="flex flex-col h-screen w-full bg-[#020417] overflow-hidden">
                {/* Viewer Container with Table-like Margins */}
                <div className="flex-1 w-full max-w-[1600px] mx-auto p-6 md:p-8 overflow-hidden flex flex-col">
                    <div className="flex-1 rounded-2xl border-2 border-slate-800/60 overflow-hidden bg-black shadow-2xl relative">
                        {/* The Iframe */}
                        <div className="absolute inset-0">
                            {viewerMode === "viewer" ? (
                                <OhifViewer studyInstanceUIDs={selectedStudyUID} />
                            ) : (
                                <BasicViewer studyInstanceUID={selectedStudyUID} />
                            )}
                        </div>
                        
                        {/* Integrated Header Overlay - Covers the OHIF Logo but keeps the toolbar visible */}
                        <div className="absolute top-0 left-0 p-0 z-20 pointer-events-none">
                            <div className="flex items-center gap-2 bg-[#090c29] border-r border-b border-slate-700/50 rounded-br-xl p-1.5 pr-5 shadow-2xl pointer-events-auto">
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-9 gap-2 text-slate-200 hover:text-white hover:bg-slate-800/50 px-3 rounded-lg"
                                    onClick={() => setShowViewer(false)}
                                >
                                    <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
                                    <span className="font-semibold text-sm">Back to Worklist</span>
                                </Button>
                                
                                <div className="w-px h-5 bg-slate-700 mx-1" />
                                
                                <div className="flex flex-col justify-center">
                                    <span className="text-[11px] font-black text-primary uppercase tracking-tighter leading-tight">Quantum PACS</span>
                                    <span className="text-[10px] text-slate-400 font-medium leading-tight">
                                        Viewer v1.0
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Study Worklist</h1>
                <p className="text-muted-foreground">Manage and view medical imaging studies from Orthanc PACS.</p>
            </div>

            <WorklistToolbar 
                table={table}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                dateRange={dateRange}
                setDateRange={setDateRange}
                uploading={uploading}
                handleFileUpload={handleFileUpload}
                fetchStudies={fetchStudies}
                handleBulkDelete={handleBulkDelete}
                handleBulkDownload={handleBulkDownload}
            />

            <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="font-bold text-slate-700">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 10 }).map((_, i) => (
                                <TableRow key={i} className="hover:bg-transparent border-b">
                                    <TableCell className="py-4">
                                        <div className="flex items-center justify-center pr-2">
                                            <Skeleton className="size-4 rounded" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Skeleton className="size-8 rounded-md" />
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Skeleton className="h-4 w-32" />
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Skeleton className="h-4 w-24" />
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Skeleton className="h-4 w-28" />
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Skeleton className="h-4 w-48" />
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex justify-end gap-2">
                                            <Skeleton className="h-8 w-16 rounded-md" />
                                            <Skeleton className="h-8 w-16 rounded-md" />
                                            <Skeleton className="h-8 w-16 rounded-md" />
                                            <Skeleton className="size-8 rounded-md" />
                                            <Skeleton className="size-8 rounded-md" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <TableRow
                                        data-state={row.getIsSelected() && "selected"}
                                        className={`group hover:bg-slate-50/80 transition-colors ${expandedStudies[row.original.ID] ? "bg-slate-50 shadow-inner" : ""}`}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="py-4">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    {expandedStudies[row.original.ID] && (
                                        <StudyDetailRow
                                        study={row.original}
                                        studies={studies}
                                        seriesData={seriesData}
                                        instancesData={instancesData}
                                        tagsData={tagsData}
                                        expandedSeries={expandedSeries}
                                        expandedInstances={expandedInstances}
                                        toggleSeriesExpansion={toggleSeriesExpansion}
                                        toggleInstanceExpansion={toggleInstanceExpansion}
                                        handleAnonymize={handleAnonymize}
                                        handleOpenOrthancViewer={handleOpenOrthancViewer}
                                        handleDownloadSeries={(id, desc) => handleDownloadSeries(id, desc, { addTask, updateTask })}
                                        handleDeleteSeries={handleDeleteSeries}
                                        handleDownloadInstance={(id, num) => handleDownloadInstance(id, num, { addTask, updateTask })}
                                        handleDeleteInstance={handleDeleteInstance}
                                        handleAddLabel={handleAddLabel}
                                        handleRemoveLabel={handleRemoveLabel}
                                        columnsCount={columns.length}
                                    />
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-40 text-center text-slate-400">
                                    No studies found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground font-medium">
                        Showing {table.getFilteredRowModel().rows.length} studies
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground whitespace-nowrap px-2 border-l">Show per page</span>
                        <Select
                            value={table.getState().pagination.pageSize.toString()}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 30, 50, 100, 200].map((pageSize) => (
                                    <SelectItem key={pageSize} value={pageSize.toString()}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="shadow-sm"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-1 text-sm font-medium px-2">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="shadow-sm"
                    >
                        Next
                    </Button>
                </div>
            </div>

            <DeleteStudyDialog 
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                study={studyToDelete}
                onConfirm={handleDeleteStudyLocal}
            />

            <BulkDeleteStudyDialog
                open={isBulkDeleteDialogOpen}
                onOpenChange={setIsBulkDeleteDialogOpen}
                count={table.getFilteredSelectedRowModel().rows.length}
                onConfirm={handleConfirmBulkDelete}
            />

            <SendTelegramDialog
                open={isSendTelegramDialogOpen}
                onOpenChange={setIsSendTelegramDialogOpen}
                study={selectedStudyForTelegram}
                onSendToDoctor={handleSendToTelegram}
            />
        </div>
    );
}

"use client";

import React, { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
    RefreshIcon, 
    ArrowLeft01Icon,
    InformationCircleIcon,
    FloppyDiskIcon,
    CpuIcon,
    AiCloud01Icon,
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
import { useTaskActions } from "@/context/task-context";
import { getColumns, WorklistTableMeta } from "./components/columns";
import { WorklistToolbar } from "./components/worklist-toolbar";
import { StudyDetailRow } from "./components/study-detail-row";
import { DeleteStudyDialog } from "./components/delete-study-dialog";
import { BulkDeleteStudyDialog } from "./components/bulk-delete-dialog";
import { SendTelegramDialog } from "./components/send-telegram-dialog";
import { EditStudyDialog } from "./components/edit-study-dialog";
import { ExportPdfDialog } from "./components/export-pdf-dialog";
import { AiResultDialog } from "./components/ai-result-dialog";
import { BridgeSatuSehatDialog } from "./components/bridge-satusehat-dialog";
import { FloatingAiProgress } from "./components/floating-ai-progress";
import { handleDownloadStudy, handleOpenOrthancViewer, handleDownloadSeries, handleDownloadInstance, handleBulkDownloadStudy } from "./utils/actions";
import { Study } from "./types";
import { Skeleton } from "@/components/ui/skeleton";
import OhifViewer from "../../../components/ohif-viewer";
import BasicViewer from "../../../components/basic-viewer";
import SegmentedViewer from "../../../components/segmented-viewer";

type ViewerMode = "viewer" | "segmented" | "basic";

function normalizeViewerMode(mode: string | null): ViewerMode {
    if (mode === "segmented" || mode === "basic") {
        return mode;
    }

    return "viewer";
}

export default function WorklistPage() {
    return (
        <Suspense fallback={<div className="p-8"><Skeleton className="w-full h-[600px] rounded-2xl" /></div>}>
            <WorklistContent />
        </Suspense>
    );
}

function WorklistContent() {
    const {
        studies, loading, uploading,
        expandedStudies, expandedSeries, expandedInstances,
        seriesData, instancesData, tagsData,
        toggleStudyExpansion, toggleSeriesExpansion, toggleInstanceExpansion,
        handleDeleteStudy, handleDeleteSeries, handleDeleteInstance,
        handleEditStudy, openEditDialog, isEditDialogOpen, setIsEditDialogOpen, studyToEdit, setStudyToEdit, handleAnonymize,
        handleAddLabel, handleRemoveLabel, handleUploadSeries,
        handleFileUpload, fetchStudies, handleSendToTelegram,
        isSendTelegramDialogOpen, setIsSendTelegramDialogOpen,
        selectedStudyForTelegram, openSendTelegramDialog,
        isBridgeDialogOpen, setIsBridgeDialogOpen,
        selectedStudyForBridge, openBridgeDialog,
        aiMode, handleRunAi, aiResults,
        handleBridgeSatuSehat, ssIntegrationStatus
    } = useWorklist();

    const [isExportPdfDialogOpen, setIsExportPdfDialogOpen] = useState<boolean>(false);
    const [studyForPdf, setStudyForPdf] = useState<Study | null>(null);
    const openExportPdfDialog = useCallback((study: Study) => {
        setStudyForPdf(study);
        setIsExportPdfDialogOpen(true);
    }, []);

    // Setup Study Notifier (Sound & Toast on new studies)
    useStudyNotifier(studies, fetchStudies);

    // UI States
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
    const [studyToDelete, setStudyToDelete] = useState<Study | null>(null);

    const [isAiResultDialogOpen, setIsAiResultDialogOpen] = useState(false);
    const [selectedAiResult, setSelectedAiResult] = useState<any>(null);
    const [selectedPatientName, setSelectedPatientName] = useState("");

    const openAiResultDialog = useCallback((result: any, patientName: string) => {
        setSelectedAiResult(result);
        setSelectedPatientName(patientName);
        setIsAiResultDialogOpen(true);
    }, []);

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

    const { addTask, updateTask } = useTaskActions();
    const searchParams = useSearchParams();
    const exportUID = searchParams.get("export");
    const [selectedStudyUID, setSelectedStudyUID] = useState<string | null>(() => searchParams.get("viewer"));
    const [viewerMode, setViewerMode] = useState<ViewerMode>(() => normalizeViewerMode(searchParams.get("mode")));
    const viewerStudyUID = selectedStudyUID;
    const showViewer = Boolean(viewerStudyUID);

    const buildWorklistUrl = useCallback((params: URLSearchParams) => {
        const query = params.toString();
        return query ? `/worklist?${query}` : "/worklist";
    }, []);

    const replaceWorklistUrl = useCallback((mutate: (params: URLSearchParams) => void) => {
        const params = new URLSearchParams(window.location.search);
        mutate(params);
        window.history.replaceState(window.history.state, "", buildWorklistUrl(params));
    }, [buildWorklistUrl]);

    // Unified Filter Handlers handled directly in state setters or table options
    const handleSetDateRange = useCallback((range: DateRange | undefined) => {
        setDateRange(range);
        setColumnFilters(prev => {
            const others = prev.filter(f => f.id !== "studyDate");
            if (!range) return others;
            return [...others, { id: "studyDate", value: range }];
        });
    }, []);

    const selectedStudy = useMemo(() => {
        if (!viewerStudyUID) return null;
        return studies.find(s => s.MainDicomTags?.StudyInstanceUID === viewerStudyUID) ?? null;
    }, [studies, viewerStudyUID]);

    const handleOpenViewer = useCallback((uid: string, mode: string = "viewer") => {
        const nextMode = normalizeViewerMode(mode);
        setSelectedStudyUID(uid);
        setViewerMode(nextMode);
        replaceWorklistUrl((params) => {
            params.set("viewer", uid);
            if (nextMode === "viewer") {
                params.delete("mode");
            } else {
                params.set("mode", nextMode);
            }
        });
    }, [replaceWorklistUrl]);

    const handleCloseViewer = useCallback(() => {
        setSelectedStudyUID(null);
        setViewerMode("viewer");
        replaceWorklistUrl((params) => {
            params.delete("viewer");
            params.delete("mode");
        });
    }, [replaceWorklistUrl]);

    const handleDownloadStudyWithTasks = useCallback((id: string, name: string) => {
        handleDownloadStudy(id, name, { addTask, updateTask });
    }, [addTask, updateTask]);

    const handleDeleteStudyLocal = useCallback(async (id: string) => {
        try {
            await handleDeleteStudy(id);
            setIsDeleteDialogOpen(false);
            setStudyToDelete(null);
        } catch (error) {
            console.error("Failed to delete study:", error);
        }
    }, [handleDeleteStudy]);


    const columns = useMemo(() => getColumns({
        toggleStudyExpansion,
        handleOpenViewer,
        handleDownload: handleDownloadStudyWithTasks,
        setStudyToDelete,
        setIsDeleteDialogOpen,
        openEditDialog,
        openSendTelegramDialog,
        openExportPdfDialog,
        aiMode,
        handleRunAi,
        openAiResultDialog,
        handleBridgeSatuSehat,
        openBridgeDialog,
        ssIntegrationStatus,
    }), [
        toggleStudyExpansion,
        handleOpenViewer,
        handleDownloadStudyWithTasks,
        setStudyToDelete,
        setIsDeleteDialogOpen,
        openEditDialog,
        openSendTelegramDialog,
        openExportPdfDialog,
        aiMode,
        handleRunAi,
        openAiResultDialog,
        handleBridgeSatuSehat,
        openBridgeDialog,
        ssIntegrationStatus
    ]);

    const tableMeta = useMemo<WorklistTableMeta>(() => ({
        expandedStudies,
        aiResults,
        ssIntegrationStatus,
    }), [
        expandedStudies, 
        aiResults,
        ssIntegrationStatus
    ]);

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
        autoResetPageIndex: true,
        meta: tableMeta,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
            rowSelection,
            pagination,
        },
    }), [
        studies, 
        columns, 
        sorting, 
        columnFilters, 
        globalFilter, 
        columnVisibility, 
        rowSelection, 
        pagination,
        tableMeta
    ]);

    const table = useReactTable(tableOptions);

    const handleBulkDelete = useCallback(() => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        if (selectedRows.length === 0) return;
        setIsBulkDeleteDialogOpen(true);
    }, [table]);

    const handleConfirmBulkDelete = useCallback(async () => {
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
    }, [table, handleDeleteStudy, fetchStudies]);

    const handleBulkDownload = useCallback(() => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        if (selectedRows.length === 0) return;
        
        const ids = selectedRows.map(row => row.original.ID);
        handleBulkDownloadStudy(ids, { addTask, updateTask });
    }, [table, addTask, updateTask]);

    // Effect for handling initial filters or deep links can go here if needed.

    useEffect(() => {
        if (exportUID && !loading && studies.length > 0) {
            const studyToExport = studies.find(s => 
                s.MainDicomTags?.StudyInstanceUID === exportUID || s.ID === exportUID
            );
            
            if (studyToExport) {
                // Open the dialog
                openExportPdfDialog(studyToExport);
                
                // Optional: Clear the param from URL without refreshing to prevent re-opening
                replaceWorklistUrl((params) => {
                    params.delete("export");
                });
            }
        }
    }, [exportUID, loading, studies, openExportPdfDialog, replaceWorklistUrl]);

    if (showViewer && viewerStudyUID) {
        return (
            <div className="flex flex-col h-screen w-full bg-[#020417] overflow-hidden">
                {/* Viewer Container with Table-like Margins */}
                <div className="flex-1 w-full max-w-[1600px] mx-auto p-6 md:p-8 overflow-hidden flex flex-col">
                    <div className="flex-1 rounded-2xl border-2 border-slate-800/60 overflow-hidden bg-black shadow-2xl relative">
                        {/* The Iframe */}
                        <div className="absolute inset-0">
                            {viewerMode === "viewer" ? (
                                <OhifViewer studyInstanceUIDs={viewerStudyUID} />
                            ) : viewerMode === "segmented" ? (
                                <SegmentedViewer studyInstanceUIDs={viewerStudyUID} />
                            ) : (
                                <BasicViewer studyInstanceUID={viewerStudyUID} />
                            )}
                        </div>
                        
                        {/* Integrated Header Overlay - Covers the OHIF Logo but keeps the toolbar visible */}
                        <div className="absolute top-0 left-0 p-0 z-20 pointer-events-none">
                            <div className="flex items-center gap-2 bg-[#090c29] border-r border-b border-slate-700/50 rounded-br-xl p-1.5 pr-5 shadow-2xl pointer-events-auto">
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-9 gap-2 text-slate-200 hover:text-white hover:bg-slate-800/50 px-3 rounded-lg"
                                    onClick={handleCloseViewer}
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

                                {aiMode === "MANUAL" && selectedStudy?.ID && (
                                    <>
                                        <div className="w-px h-5 bg-slate-700 mx-1" />
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            className="h-9 gap-2 text-primary hover:text-primary hover:bg-primary/10 px-3 rounded-lg animate-pulse"
                                            onClick={() => handleRunAi(selectedStudy.ID)}
                                        >
                                            <HugeiconsIcon icon={AiCloud01Icon} className="size-4" strokeWidth={2.5} />
                                            <span className="font-bold text-sm tracking-tight">Run AI Analysis</span>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 w-full space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Study Worklist</h1>
                <p className="text-muted-foreground">Manage and view medical imaging studies from Orthanc PACS.</p>
            </div>

            <WorklistToolbar 
                table={table}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                dateRange={dateRange}
                setDateRange={handleSetDateRange}
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
                                            <TableCell key={cell.id} className="py-4 relative z-10">
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
                                            handleUploadSeries={handleUploadSeries}
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

            <EditStudyDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                study={studyToEdit}
                onConfirm={handleEditStudy}
            />

            <AiResultDialog
                open={isAiResultDialogOpen}
                onOpenChange={setIsAiResultDialogOpen}
                result={selectedAiResult}
                patientName={selectedPatientName}
            />

            <ExportPdfDialog
                open={isExportPdfDialogOpen}
                onOpenChange={setIsExportPdfDialogOpen}
                study={studyForPdf}
            />

            <BridgeSatuSehatDialog
                open={isBridgeDialogOpen}
                onOpenChange={setIsBridgeDialogOpen}
                study={selectedStudyForBridge}
                onBridge={handleBridgeSatuSehat}
            />

            <FloatingAiProgress />
        </div>
    );
}


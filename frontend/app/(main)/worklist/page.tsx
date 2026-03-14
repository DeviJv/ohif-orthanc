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
    useReactTable, 
    getCoreRowModel, 
    getPaginationRowModel, 
    getSortedRowModel, 
    getFilteredRowModel, 
    ColumnFiltersState, 
    SortingState, 
    VisibilityState,
    flexRender
} from "@tanstack/react-table";
import { DateRange } from "react-day-picker";

import { useWorklist } from "./hooks/use-worklist";
import { getColumns } from "./components/columns";
import { WorklistToolbar } from "./components/worklist-toolbar";
import { StudyDetailRow } from "./components/study-detail-row";
import { DeleteStudyDialog } from "./components/delete-study-dialog";
import { handleDownloadStudy, handleOpenOrthancViewer, handleDownloadSeries, handleDownloadInstance } from "./utils/actions";
import { Study } from "./types";
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
        handleFileUpload, fetchStudies
    } = useWorklist();

    // UI States
    const [showViewer, setShowViewer] = useState(false);
    const [selectedStudyUID, setSelectedStudyUID] = useState<string | null>(null);
    const [viewerMode, setViewerMode] = useState("viewer");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [studyToDelete, setStudyToDelete] = useState<Study | null>(null);

    // Table State
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const handleOpenViewer = (uid: string, mode: string = "viewer") => {
        setSelectedStudyUID(uid);
        setViewerMode(mode);
        setShowViewer(true);
    };

    const columns = getColumns({
        expandedStudies,
        toggleStudyExpansion,
        handleOpenViewer,
        handleDownload: handleDownloadStudy,
        setStudyToDelete,
        setIsDeleteDialogOpen,
        handleEditPatient
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
        state: {
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
            rowSelection,
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
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center py-20">
                                    <div className="flex flex-col items-center gap-3">
                                        <HugeiconsIcon icon={RefreshIcon} className="size-10 animate-spin text-primary" />
                                        <span className="text-lg font-medium text-slate-500">Fetching from PACS Server...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
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
                                            handleDownloadSeries={handleDownloadSeries}
                                            handleDeleteSeries={handleDeleteSeries}
                                            handleDownloadInstance={handleDownloadInstance}
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

            <div className="flex items-center justify-between py-4">
                <div className="text-sm text-muted-foreground font-medium">
                    Showing {table.getFilteredRowModel().rows.length} studies
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
                onConfirm={handleDeleteStudy}
            />
        </div>
    );
}

"use client";
import { toast } from "sonner";

import React, { useState, useMemo, useCallback } from "react";
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
    flexRender,
    SortingState,
} from "@tanstack/react-table";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import { useReports } from "../hooks/use-reports";
import { getColumns } from "./columns";
import { ReportsToolbar } from "./reports-toolbar";
import { Report } from "../types";
import { normalizePatientName } from "../../worklist/utils/format";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { handleBulkDownloadZip } from "../utils/actions";
import { ExportPdfDialog } from "../../worklist/components/export-pdf-dialog";
import { FloatingExportProgress } from "./floating-export-progress";
import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ReportsContent() {
    const {
        reports,
        total,
        page,
        totalPages,
        loading,
        filters,
        setFilters,
        handleDelete,
        handleBulkDelete,
        refresh,
        doctors,
    } = useReports();

    // UI States
    const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
    const [selectedReportForExport, setSelectedReportForExport] = useState<Report | null>(null);

    // Table State
    const [sorting, setSorting] = useState<SortingState>([{ id: "studyDate", desc: true }]);
    const [rowSelection, setRowSelection] = useState({});

    const handleEdit = useCallback((report: Report) => {
        setSelectedReportForExport(report);
        setIsExportDialogOpen(true);
    }, []);

    const onDeleteClick = useCallback((report: Report) => {
        setReportToDelete(report);
        setIsDeleteDialogOpen(true);
    }, []);

    const columns = useMemo(() => getColumns({
        onEdit: handleEdit,
        onDelete: onDeleteClick,
    }), [handleEdit, onDeleteClick]);

    const table = useReactTable({
        data: reports,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
    });

    const handleSetDateRange = (range: DateRange | undefined) => {
        setFilters(prev => ({
            ...prev,
            startDate: range?.from ? format(range.from, "yyyyMMdd") : '',
            endDate: range?.to ? format(range.to, "yyyyMMdd") : '',
            page: 1,
        }));
    };

    const handleBulkDeleteClick = () => {
        setIsBulkDeleteDialogOpen(true);
    };

    const confirmBulkDelete = async () => {
        const selectedIds = table.getFilteredSelectedRowModel().rows.map(row => row.original.id);
        await handleBulkDelete(selectedIds);
        setRowSelection({});
        setIsBulkDeleteDialogOpen(false);
    };

    const confirmDelete = async () => {
        if (reportToDelete) {
            await handleDelete(reportToDelete.id);
            setReportToDelete(null);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleBulkDownload = () => {
        const selectedIds = table.getFilteredSelectedRowModel().rows.map(row => row.original.id);
        handleBulkDownloadZip(selectedIds);
    };

    const handleExportCSV = async (ids?: string[]) => {
        try {
            const res = await fetch("/api/reports/export", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ids: ids || [],
                    filters: !ids ? filters : {}
                }),
            });
            if (res.ok) {
                toast.success("Proses export dimulai", {
                    description: "Data sedang disiapkan di latar belakang."
                });
            } else {
                toast.error("Gagal memulai export");
            }
        } catch (error) {
            console.error("Failed to start CSV export:", error);
        }
    };

    // Convert Report back to Study-like structure for ExportPdfDialog
    const mockStudyFromReport = useMemo(() => {
        if (!selectedReportForExport) return null;
        return {
            ID: selectedReportForExport.studyInstanceUid,
            MainDicomTags: {
                StudyInstanceUID: selectedReportForExport.studyInstanceUid,
                PatientName: normalizePatientName(selectedReportForExport.patientName || ""),
                PatientID: selectedReportForExport.patientId,
                AccessionNumber: selectedReportForExport.accessionNumber,
                StudyDate: selectedReportForExport.studyDate,
                PatientSex: selectedReportForExport.patientSex,
                StudyDescription: selectedReportForExport.examType,
            },
            PatientMainDicomTags: {
                PatientName: normalizePatientName(selectedReportForExport.patientName || ""),
                PatientID: selectedReportForExport.patientId,
                PatientSex: selectedReportForExport.patientSex,
            }
        } as any;
    }, [selectedReportForExport]);

    return (
        <div className="p-6 w-full space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Measurement Reports</h1>
                <p className="text-muted-foreground">View and manage uploaded measurement reports and findings.</p>
            </div>

            <ReportsToolbar 
                table={table}
                patientName={filters.patientName}
                setPatientName={(val) => setFilters(prev => ({ ...prev, patientName: val, page: 1 }))}
                accessionNumber={filters.accessionNumber}
                setAccessionNumber={(val) => setFilters(prev => ({ ...prev, accessionNumber: val, page: 1 }))}
                dateRange={filters.startDate ? { from: new Date(parseInt(filters.startDate.slice(0, 4)), parseInt(filters.startDate.slice(4, 6)) - 1, parseInt(filters.startDate.slice(6, 8))), to: filters.endDate ? new Date(parseInt(filters.endDate.slice(0, 4)), parseInt(filters.endDate.slice(4, 6)) - 1, parseInt(filters.endDate.slice(6, 8))) : undefined } : undefined}
                setDateRange={handleSetDateRange}
                doctorNames={filters.doctorNames}
                setDoctorNames={(val) => setFilters(prev => ({ ...prev, doctorNames: val, page: 1 }))}
                doctors={doctors}
                handleBulkDelete={handleBulkDeleteClick}
                handleBulkDownload={handleBulkDownload}
                handleExportCSV={handleExportCSV}
                refresh={refresh}
            />

            <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm overflow-hidden backdrop-blur-sm">
                <Table>
                    <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-slate-200 dark:border-slate-800">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="font-bold text-slate-700 dark:text-slate-300">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: filters.limit }).map((_, i) => (
                                <TableRow key={i} className="hover:bg-transparent border-b">
                                    <TableCell colSpan={columns.length} className="py-4">
                                        <Skeleton className="h-12 w-full" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : reports.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors border-slate-100 dark:border-slate-800"
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
                                <TableCell colSpan={columns.length} className="h-40 text-center text-slate-400 dark:text-slate-500 italic">
                                    No reports found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground font-medium">
                        Total {total} reports
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground whitespace-nowrap px-2 border-l border-slate-200 dark:border-slate-800">Show per page</span>
                        <Select value={filters.limit.toString()} onValueChange={(value) => setFilters(prev => ({ ...prev, limit: Number(value), page: 1 }))}>
                            <SelectTrigger className="h-8 w-[70px]"><SelectValue placeholder={filters.limit} /></SelectTrigger>
                            <SelectContent side="top">
                                {[10, 30, 50, 100].map((limit) => (
                                    <SelectItem key={limit} value={limit.toString()}>{limit}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))} disabled={page <= 1} className="shadow-sm">Previous</Button>
                    <div className="flex items-center gap-1 text-sm font-medium px-2">Page {page} of {totalPages}</div>
                    <Button variant="outline" size="sm" onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))} disabled={page >= totalPages} className="shadow-sm">Next</Button>
                </div>
            </div>

            {/* Floating Progress */}
            <FloatingExportProgress />

            {/* Dialogs */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the report for patient <strong>{normalizePatientName(reportToDelete?.patientName || "")}</strong>. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bulk Delete Confirmation</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete <strong>{table.getFilteredSelectedRowModel().rows.length}</strong> selected reports? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete All
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {isExportDialogOpen && mockStudyFromReport && (
                <ExportPdfDialog 
                    open={isExportDialogOpen}
                    onOpenChange={setIsExportDialogOpen}
                    study={mockStudyFromReport}
                />
            )}
        </div>
    );
}

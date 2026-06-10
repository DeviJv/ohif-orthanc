"use client";
import { toast } from "sonner";
import React, { useState, useMemo, useCallback } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, SortingState } from "@tanstack/react-table";
import { useTemplateExercise } from "../hooks/use-template-exercise";
import { getColumns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { TemplateExercise } from "../types";
import { TemplateDialog } from "./TemplateDialog";

export default function TemplateExerciseContent() {
    const {
        items,
        total,
        page,
        totalPages,
        loading,
        filters,
        setFilters,
        doctors,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleBulkDelete,
    } = useTemplateExercise();

    const [itemToDelete, setItemToDelete] = useState<TemplateExercise | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TemplateExercise | null>(null);

    const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);
    const [rowSelection, setRowSelection] = useState({});

    const handleEdit = useCallback((item: TemplateExercise) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    }, []);

    const onDeleteClick = useCallback((item: TemplateExercise) => {
        setItemToDelete(item);
        setIsDeleteDialogOpen(true);
    }, []);

    const columns = useMemo(() => getColumns({
        onEdit: handleEdit,
        onDelete: onDeleteClick,
    }), [handleEdit, onDeleteClick]);

    const table = useReactTable({
        data: items,
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

    const confirmDelete = async () => {
        if (itemToDelete) {
            await handleDelete(itemToDelete.id);
            setItemToDelete(null);
            setIsDeleteDialogOpen(false);
        }
    };

    const confirmBulkDelete = async () => {
        const selectedIds = table.getFilteredSelectedRowModel().rows.map(row => row.original.id);
        await handleBulkDelete(selectedIds);
        setRowSelection({});
        setIsBulkDeleteDialogOpen(false);
    };

    const onSave = async (data: any) => {
        if (selectedItem) {
            await handleUpdate(selectedItem.id, data);
        } else {
            await handleCreate(data);
        }
        setIsDialogOpen(false);
    };

    return (
        <div className="p-6 w-full space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Template Exercise</h1>
                <p className="text-muted-foreground">Manage exercise templates for doctors.</p>
            </div>

            <div className="flex items-center justify-between">
                <Button onClick={() => { setSelectedItem(null); setIsDialogOpen(true); }}>
                    Add New Template
                </Button>
                {Object.keys(rowSelection).length > 0 && (
                    <Button variant="destructive" onClick={() => setIsBulkDeleteDialogOpen(true)}>
                        Delete Selected
                    </Button>
                )}
            </div>

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
                        ) : items.length ? (
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
                                    No templates found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground font-medium">
                        Total {total} templates
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

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this template. This action cannot be undone.
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
                            Are you sure you want to delete <strong>{table.getFilteredSelectedRowModel().rows.length}</strong> selected templates? This action cannot be undone.
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

            {isDialogOpen && (
                <TemplateDialog 
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    doctors={doctors}
                    initialData={selectedItem}
                    onSave={onSave}
                />
            )}
        </div>
    );
}

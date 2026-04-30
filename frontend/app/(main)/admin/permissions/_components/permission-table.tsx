"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { 
    Search01Icon,
    ArrowLeft01Icon,
    ArrowRight01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface PermissionTableProps {
  permissions: any[];
}

export function PermissionTable({ permissions }: PermissionTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredPermissions = useMemo(() => {
    return permissions.filter(p => 
      p.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [permissions, search]);

  const totalPages = Math.ceil(filteredPermissions.length / pageSize) || 1;
  const paginatedPermissions = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredPermissions.slice(start, start + pageSize);
  }, [filteredPermissions, page, pageSize]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm group">
           <HugeiconsIcon icon={Search01Icon} size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
           <Input 
             placeholder="Search permissions..." 
             value={search}
             onChange={(e) => { setSearch(e.target.value); setPage(1); }}
             className="pl-10 h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl shadow-sm focus-visible:ring-primary/20 transition-all"
           />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm overflow-hidden backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
            <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
              <TableHead className="w-[300px] font-bold text-slate-700 dark:text-slate-300">Permission Name / Slug</TableHead>
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">Description & Usage</TableHead>
              <TableHead className="text-right font-bold text-slate-700 dark:text-slate-300">Scope</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPermissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-40 text-center text-slate-400 dark:text-slate-500 italic">
                  No permissions found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedPermissions.map((p: any) => (
                <TableRow key={p.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors border-slate-100 dark:border-slate-800">
                  <TableCell className="py-4 font-mono text-sm">
                    <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 px-2">
                      {p.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-sm text-slate-600 dark:text-slate-400">
                    Grants access to {p.name.replace(/-/g, ' ')} functionality across the system.
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-900 font-medium px-3">
                      System
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground font-medium">
            Showing {filteredPermissions.length} permissions
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap px-2 border-l border-slate-200 dark:border-slate-800">Show per page</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-[70px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top" className="rounded-xl border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
                {[10, 20, 50, 100].map((size) => (
                  <SelectItem key={size} value={`${size}`} className="rounded-lg cursor-pointer">
                    {size}
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
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="h-9 px-4 rounded-lg border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Previous
          </Button>
          <div className="flex items-center gap-1 text-sm font-semibold px-4">
            Page {page} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="h-9 px-4 rounded-lg border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

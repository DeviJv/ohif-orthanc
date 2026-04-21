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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
           <HugeiconsIcon icon={Search01Icon} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
           <Input 
             placeholder="Search permissions..." 
             value={search}
             onChange={(e) => { setSearch(e.target.value); setPage(1); }}
             className="pl-9 h-9"
           />
        </div>
      </div>
      <div className="border rounded-md bg-white dark:bg-slate-950 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900">
            <TableRow>
              <TableHead className="w-[300px]">Permission Name / Slug</TableHead>
              <TableHead>Description & Usage</TableHead>
              <TableHead className="text-right">Scope</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No permissions found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedPermissions.map((p: any) => (
                <TableRow key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <TableCell className="font-mono text-sm">
                    <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">
                      {p.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    Grants access to {p.name.replace(/-/g, ' ')} functionality across the system.
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-900 font-normal">
                      System
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing <strong>{((page - 1) * pageSize) + Math.min(1, paginatedPermissions.length)}</strong> to <strong>{Math.min(page * pageSize, filteredPermissions.length)}</strong> of <strong>{filteredPermissions.length}</strong> permission(s).
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {page} of {totalPages}
          </div>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <span className="sr-only">Go to previous page</span>
                  <HugeiconsIcon icon={ArrowLeft01Icon} className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <span className="sr-only">Go to next page</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { 
    MoreHorizontalIcon, 
    Delete02Icon,
    Shield01Icon,
    LockIcon,
    Search01Icon,
    ArrowLeft01Icon,
    ArrowRight01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { deleteRole } from "@/lib/actions/role-actions";
import { toast } from "sonner";
import { RoleFormDialog } from "@/app/(main)/admin/roles/_components/role-form-dialog";

interface RoleTableProps {
  roles: any[];
  permissions: any[];
}

export function RoleTable({ roles, permissions }: RoleTableProps) {
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete role "${name}"?`)) {
      const result = await deleteRole(id);
      if (result.success) {
        toast.success("Role deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete role");
      }
    }
  };

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredRoles = useMemo(() => {
    return roles.filter(role => 
      role.name?.toLowerCase().includes(search.toLowerCase()) || 
      role.permissions?.some((p: any) => p.name?.toLowerCase().includes(search.toLowerCase()))
    );
  }, [roles, search]);

  const totalPages = Math.ceil(filteredRoles.length / pageSize) || 1;
  const paginatedRoles = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRoles.slice(start, start + pageSize);
  }, [filteredRoles, page, pageSize]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm group">
           <HugeiconsIcon icon={Search01Icon} size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
           <Input 
             placeholder="Search roles or permissions..." 
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
              <TableHead className="w-[200px] font-bold text-slate-700 dark:text-slate-300">Role Name</TableHead>
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">Permissions</TableHead>
              <TableHead className="text-center w-[100px] font-bold text-slate-700 dark:text-slate-300">Users</TableHead>
              <TableHead className="text-right w-[100px] font-bold text-slate-700 dark:text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-40 text-center text-slate-400 dark:text-slate-500 italic">
                  No roles found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedRoles.map((role) => (
                <TableRow key={role.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors border-slate-100 dark:border-slate-800">
                  <TableCell className="py-4 font-semibold text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-2">
                      {role.name === 'ROOT' ? <HugeiconsIcon icon={LockIcon} size={16} className="text-purple-500" /> : <HugeiconsIcon icon={Shield01Icon} size={16} className="text-primary" />}
                      {role.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((p: any) => (
                        <Badge key={p.id} variant="secondary" className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none">
                          {p.name}
                        </Badge>
                      ))}
                      {role.permissions.length === 0 && <span className="text-slate-400 text-xs italic">No permissions</span>}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <Badge variant="outline" className="font-bold bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      {role._count.users}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <RoleFormDialog role={role} permissions={permissions} isEdit />
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors disabled:opacity-30"
                        disabled={role.name === 'ROOT' || role._count.users > 0}
                        onClick={() => handleDelete(role.id, role.name)}
                        title="Delete Role"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={16} />
                      </Button>
                    </div>
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
            Showing {filteredRoles.length} roles
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

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
  const [pageSize, setPageSize] = useState(5);

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
           <HugeiconsIcon icon={Search01Icon} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
           <Input 
             placeholder="Search roles or permissions..." 
             value={search}
             onChange={(e) => { setSearch(e.target.value); setPage(1); }}
             className="pl-9 h-9"
           />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Role Name</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead className="text-center w-[100px]">Users</TableHead>
          <TableHead className="text-right w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              No roles found.
            </TableCell>
          </TableRow>
        ) : (
          paginatedRoles.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="font-semibold flex items-center gap-2">
                {role.name === 'ROOT' ? <HugeiconsIcon icon={LockIcon} size={16} className="text-purple-500" /> : <HugeiconsIcon icon={Shield01Icon} size={16} className="text-indigo-500" />}
                {role.name}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((p: any) => (
                    <Badge key={p.id} variant="secondary" className="text-[10px] font-normal px-1.5 py-0">
                      {p.name}
                    </Badge>
                  ))}
                  {role.permissions.length === 0 && <span className="text-muted-foreground text-xs italic">No permissions</span>}
                </div>
              </TableCell>
              <TableCell className="text-center text-sm font-medium">
                {role._count.users}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                    <HugeiconsIcon icon={MoreHorizontalIcon} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <RoleFormDialog role={role} permissions={permissions} isEdit />
                    <DropdownMenuItem 
                      className="text-red-600 focus:text-red-600"
                      disabled={role.name === 'ROOT' || role._count.users > 0}
                      onClick={() => handleDelete(role.id, role.name)}
                    >
                      <HugeiconsIcon icon={Delete02Icon} size={16} className="mr-2" />
                      Delete Role
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
    </div>
    
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing <strong>{((page - 1) * pageSize) + Math.min(1, paginatedRoles.length)}</strong> to <strong>{Math.min(page * pageSize, filteredRoles.length)}</strong> of <strong>{filteredRoles.length}</strong> role(s).
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

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
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
    MoreHorizontalIcon, 
    Delete02Icon,
    Shield01Icon,
    UserIcon,
    Search01Icon,
    ArrowLeft01Icon,
    ArrowRight01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { deleteUser } from "@/lib/actions/user-actions";
import { toast } from "sonner";
import { UserFormDialog } from "@/app/(main)/admin/users/_components/user-form-dialog";
import { format } from "date-fns";

interface UserTableProps {
  users: any[];
  roles: any[];
}

export function UserTable({ users, roles }: UserTableProps) {
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete user "${name}"?`)) {
      const result = await deleteUser(id);
      if (result.success) {
        toast.success("User deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete user");
      }
    }
  };

  const getRoleBadge = (roleName: string) => {
    switch (roleName) {
      case "ROOT":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100"><HugeiconsIcon icon={Shield01Icon} size={12} className="mr-1" /> Root</Badge>;
      case "SUPER-ADMIN":
        return <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100"><HugeiconsIcon icon={Shield01Icon} size={12} className="mr-1" /> Admin</Badge>;
      case "DOCTOR":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100"><HugeiconsIcon icon={UserIcon} size={12} className="mr-1" /> Doctor</Badge>;
      case "RADIOGRAPHER":
        return <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green- green-100 hover:bg-green-100"><HugeiconsIcon icon={UserIcon} size={12} className="mr-1" /> Radiographer</Badge>;
      default:
        return <Badge variant="outline">{roleName || "No Role"}</Badge>;
    }
  };

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name?.toLowerCase().includes(search.toLowerCase()) || 
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm group">
           <HugeiconsIcon icon={Search01Icon} size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
           <Input 
             placeholder="Search users..." 
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
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">Name</TableHead>
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">Email</TableHead>
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">Role</TableHead>
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">Joined</TableHead>
              <TableHead className="text-right font-bold text-slate-700 dark:text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center text-slate-400 dark:text-slate-500 italic">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors border-slate-100 dark:border-slate-800">
                  <TableCell className="py-4 font-medium text-slate-900 dark:text-slate-100">{user.name}</TableCell>
                  <TableCell className="py-4 text-slate-600 dark:text-slate-400">{user.email}</TableCell>
                  <TableCell className="py-4">{getRoleBadge(user.role?.name)}</TableCell>
                  <TableCell className="py-4 text-slate-500 dark:text-slate-500 text-xs font-medium">
                    {user.createdAt ? format(new Date(user.createdAt), "dd MMM yyyy") : "-"}
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <UserFormDialog user={user} roles={roles} isEdit />
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors disabled:opacity-30"
                        onClick={() => handleDelete(user.id, user.name)}
                        disabled={user.email === "admin@pacs"}
                        title={user.email === "admin@pacs" ? "Protected system administrator" : "Delete User"}
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
            Showing {filteredUsers.length} users
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

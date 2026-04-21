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
  const [pageSize, setPageSize] = useState(5);

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
           <HugeiconsIcon icon={Search01Icon} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
           <Input 
             placeholder="Search users..." 
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
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              No users found.
            </TableCell>
          </TableRow>
        ) : (
          paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{getRoleBadge(user.role?.name)}</TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {user.createdAt ? format(new Date(user.createdAt), "dd MMM yyyy") : "-"}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                     <HugeiconsIcon icon={MoreHorizontalIcon} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <UserFormDialog user={user} roles={roles} isEdit />
                    <DropdownMenuItem 
                      className="text-red-600 focus:text-red-600"
                      onClick={() => handleDelete(user.id, user.name)}
                    >
                      <HugeiconsIcon icon={Delete02Icon} size={16} className="mr-2" />
                      Delete User
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
        Showing <strong>{((page - 1) * pageSize) + Math.min(1, paginatedUsers.length)}</strong> to <strong>{Math.min(page * pageSize, filteredUsers.length)}</strong> of <strong>{filteredUsers.length}</strong> user(s).
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

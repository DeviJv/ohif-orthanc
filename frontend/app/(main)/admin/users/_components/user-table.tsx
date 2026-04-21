"use client";

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
import { 
    MoreHorizontalIcon, 
    Delete02Icon,
    Shield01Icon,
    UserIcon
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

  return (
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
          users.map((user) => (
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
  );
}

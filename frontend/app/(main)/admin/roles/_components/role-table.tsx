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
    LockIcon
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

  return (
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
          roles.map((role) => (
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
  );
}

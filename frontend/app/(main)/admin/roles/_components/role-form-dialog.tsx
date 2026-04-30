"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
    Add01Icon, 
    PencilEdit01Icon,
    Shield01Icon,
    CheckmarkCircle01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { upsertRole } from "@/lib/actions/role-actions";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface RoleFormDialogProps {
  role?: any;
  permissions: any[];
  isEdit?: boolean;
}

export function RoleFormDialog({ role, permissions, isEdit = false }: RoleFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(role?.name || "");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    role?.permissions?.map((p: any) => p.id) || []
  );

  const togglePermission = (id: string) => {
    setSelectedPermissions(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await upsertRole({
        id: role?.id,
        name,
        permissionIds: selectedPermissions
      });

      if (result.success) {
        toast.success(`Role ${isEdit ? 'updated' : 'created'} successfully`);
        setOpen(false);
      } else {
        toast.error(result.error || "Failed to save role");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          isEdit ? (
            <Button
              size="sm"
              variant="ghost"
              className="size-8 p-0 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg"
              title="Edit Role"
            >
              <HugeiconsIcon icon={PencilEdit01Icon} className="size-4" />
            </Button>
          ) : (
            <Button size="sm" className="gap-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all">
              <HugeiconsIcon icon={Add01Icon} size={18} />
              Add New Role
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Role" : "Create New Role"}</DialogTitle>
            <DialogDescription>
              Assign specific capabilities to this role.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Senior Radiologist"
                required
                disabled={role?.name === 'ROOT'}
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto border rounded-md p-3">
                {permissions.map((p) => (
                  <div key={p.id} className="flex items-center space-x-2">
                    <Checkbox 
                        id={p.id} 
                        checked={selectedPermissions.includes(p.id)}
                        onCheckedChange={() => togglePermission(p.id)}
                    />
                    <label 
                        htmlFor={p.id} 
                        className="text-xs font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {p.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Role" : "Create Role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
    Add01Icon, 
    PencilEdit01Icon,
    UserIcon,
    Mail01Icon,
    Key01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createUser, updateUser } from "@/lib/actions/user-actions";
import { toast } from "sonner";

interface UserFormDialogProps {
  user?: any;
  roles: any[];
  isEdit?: boolean;
}

export function UserFormDialog({ user, roles, isEdit = false }: UserFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    roleId: user?.roleId || "",
    signature: user?.signature || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        const result = await updateUser(user.id, formData);
        if (result.success) {
          toast.success("User updated successfully");
          setOpen(false);
        } else {
          toast.error(result.error || "Failed to update user");
        }
      } else {
        if (!formData.password) {
          toast.error("Password is required for new users");
          setLoading(false);
          return;
        }
        const result = await createUser(formData);
        if (result.success) {
          toast.success("User created successfully");
          setOpen(false);
          setFormData({ name: "", email: "", password: "", roleId: "", signature: "" });
        } else {
          toast.error(result.error || "Failed to create user");
        }
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
            <div className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm">
              <HugeiconsIcon icon={PencilEdit01Icon} size={16} className="mr-2" />
              Edit User
            </div>
          ) : (
            <Button size="sm" className="gap-2">
              <HugeiconsIcon icon={Add01Icon} size={18} />
              Add New User
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit User" : "Create New User"}</DialogTitle>
            <DialogDescription>
              {isEdit 
                ? "Update user information and system role." 
                : "Add a new staff member with a dynamic role."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <HugeiconsIcon icon={UserIcon} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <HugeiconsIcon icon={Mail01Icon} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@hospital.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">
                {isEdit ? "New Password (Optional)" : "Password"}
              </Label>
              <div className="relative">
                <HugeiconsIcon icon={Key01Icon} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={isEdit ? "Leave blank to keep current" : "••••••••"}
                  className="pl-10"
                  required={!isEdit}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Assign Role</Label>
              <Select 
                value={formData.roleId} 
                onValueChange={(value) => setFormData({ ...formData, roleId: value })}
              >
                <SelectTrigger className="w-full text-left font-normal flex flex-1 items-center">
                  {formData.roleId ? (
                    <span className="flex-1">{roles.find((r) => r.id === formData.roleId)?.name}</span>
                  ) : (
                    <SelectValue placeholder="Select a dynamic role" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="signature">Doctor Signature (Optional)</Label>
              <div className="space-y-2">
                <Input
                  id="signature"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, signature: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="cursor-pointer h-9 text-xs"
                />
                {formData.signature && (
                  <div className="relative w-full h-20 border rounded-md bg-muted/50 flex items-center justify-center overflow-hidden">
                    <img src={formData.signature} alt="Signature Preview" className="max-h-full object-contain" />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-1 right-1 size-6 p-0"
                      onClick={() => setFormData({ ...formData, signature: "" })}
                    >
                      ✕
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground italic">
                Upload a transparent PNG signature for best results in PDF reports.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update User" : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

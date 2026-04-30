import { getRolesWithPermissions, getPermissions } from "@/lib/actions/role-actions";
import { RoleTable } from "@/app/(main)/admin/roles/_components/role-table";
import { RoleFormDialog } from "@/app/(main)/admin/roles/_components/role-form-dialog";
import { 
  Shield01Icon 
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default async function RolesPage() {
  const [rolesResult, permissionsResult] = await Promise.all([
    getRolesWithPermissions(),
    getPermissions()
  ]);

  const roles = rolesResult?.success && rolesResult?.data ? rolesResult.data : [];
  const permissions = permissionsResult?.success && permissionsResult?.data ? permissionsResult.data : [];

  return (
    <div className="p-6 w-full space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <HugeiconsIcon icon={Shield01Icon} strokeWidth={2.5} className="size-8 text-primary" />
            Roles Management
          </h1>
          <p className="text-muted-foreground">
            Define system roles and assign granular permissions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RoleFormDialog permissions={permissions} />
        </div>
      </div>
      
      <RoleTable roles={roles || []} permissions={permissions} />
    </div>
  );
}

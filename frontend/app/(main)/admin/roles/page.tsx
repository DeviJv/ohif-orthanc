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
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <HugeiconsIcon icon={Shield01Icon} strokeWidth={2} />
            Roles Management
          </h2>
          <p className="text-muted-foreground">
            Define system roles and assign granular permissions.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <RoleFormDialog permissions={permissions} />
        </div>
      </div>
      <div className="border rounded-md bg-white dark:bg-slate-950">
        <RoleTable roles={roles || []} permissions={permissions} />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

import { getUsers, getRoles } from "@/lib/actions/user-actions";
import { UserTable } from "./_components/user-table";
import { UserFormDialog } from "./_components/user-form-dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  UserGroupIcon 
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default async function UsersPage() {
  const [usersResult, rolesResult] = await Promise.all([
    getUsers(),
    getRoles()
  ]);

  const users = usersResult?.success && usersResult?.data ? usersResult.data : [];
  const roles = rolesResult?.success && rolesResult?.data ? rolesResult.data : [];

  return (
    <div className="p-6 w-full space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2.5} className="size-8 text-primary" />
            User Management
          </h1>
          <p className="text-muted-foreground">
            Manage your hospital staff access and roles.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <UserFormDialog roles={roles} />
        </div>
      </div>
      
      <UserTable users={users || []} roles={roles} />
    </div>
  );
}

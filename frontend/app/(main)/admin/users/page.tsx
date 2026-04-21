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
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />
            User Management
          </h2>
          <p className="text-muted-foreground">
            Manage your hospital staff access and roles.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserFormDialog roles={roles} />
        </div>
      </div>
      <div className="border rounded-md bg-white dark:bg-slate-950">
        <UserTable users={users || []} roles={roles} />
      </div>
    </div>
  );
}

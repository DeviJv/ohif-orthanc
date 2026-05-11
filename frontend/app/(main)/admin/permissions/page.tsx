export const dynamic = "force-dynamic";

import { getPermissions } from "@/lib/actions/role-actions";
import { 
  Key01Icon,
  InformationCircleIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";

import { PermissionTable } from "./_components/permission-table";

export default async function PermissionsPage() {
  const result = await getPermissions();
  const permissions = result?.success && result?.data ? result.data : [];

  return (
    <div className="p-6 w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <HugeiconsIcon icon={Key01Icon} strokeWidth={2.5} className="size-8 text-primary" />
          System Permissions
        </h1>
        <p className="text-muted-foreground">
          List of unique capabilities available for role assignment.
        </p>
      </div>

      <Alert variant="info" className="bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 rounded-xl overflow-hidden backdrop-blur-sm">
        <HugeiconsIcon icon={InformationCircleIcon} size={20} className="text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-300 font-bold">Read-Only Access</AlertTitle>
        <AlertDescription className="text-blue-700/80 dark:text-blue-400/80">
          Permissions are defined in the system core. You can assign them to roles in the <span className="font-semibold text-blue-900 dark:text-blue-200">Roles Management</span> tab, but new permissions can only be added by system administrators via code updates.
        </AlertDescription>
      </Alert>

      <PermissionTable permissions={permissions} />
    </div>
  );
}

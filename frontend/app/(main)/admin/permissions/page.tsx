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

export default async function PermissionsPage() {
  const result = await getPermissions();
  const permissions = result?.success && result?.data ? result.data : [];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <HugeiconsIcon icon={Key01Icon} strokeWidth={2} />
            System Permissions
          </h2>
          <p className="text-muted-foreground">
            List of unique capabilities available for role assignment.
          </p>
        </div>
      </div>

      <Alert variant="info" className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
        <HugeiconsIcon icon={InformationCircleIcon} size={18} className="text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-300">Read-Only Access</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          Permissions are defined in the system core. You can assign them to roles in the Roles Management tab, but new permissions can only be added by system administrators via code updates.
        </AlertDescription>
      </Alert>

      <div className="border rounded-md bg-white dark:bg-slate-950 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900">
            <TableRow>
              <TableHead className="w-[300px]">Permission Name / Slug</TableHead>
              <TableHead>Description & Usage</TableHead>
              <TableHead className="text-right">Scope</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No permissions found.
                </TableCell>
              </TableRow>
            ) : (
              permissions.map((p: any) => (
                <TableRow key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <TableCell className="font-mono text-sm">
                    <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 font-mono">
                      {p.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    Grants access to {p.name.replace('-', ' ')} functionality across the system.
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-900">
                      System
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

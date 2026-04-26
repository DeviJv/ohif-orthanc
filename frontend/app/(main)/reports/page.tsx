import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ReportsWrapper from "./components/ReportsWrapper";

export default async function ReportsPage() {
    const session = await auth();
    
    if (!session) {
        redirect("/login");
    }

    const permissions = session.user?.role?.permissions?.map((p: any) => p.name) || [];
    const hasAccess = permissions.includes('view-reports') || permissions.includes('manage-all');

    if (!hasAccess) {
        redirect("/?error=unauthorized");
    }

    return <ReportsWrapper />;
}

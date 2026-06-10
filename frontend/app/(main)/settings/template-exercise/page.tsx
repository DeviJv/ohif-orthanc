import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import TemplateExerciseContent from "./components/TemplateExerciseContent";

export default async function TemplateExercisePage() {
    const session = await auth();
    
    if (!session) {
        redirect("/login");
    }

    const permissions = session.user?.role?.permissions?.map((p: any) => p.name) || [];
    const roleName = session.user?.role?.name || "";
    const hasAccess = permissions.includes('view-template') || permissions.includes('manage-all') || roleName === 'ROOT' || roleName === 'SUPER-ADMIN';

    if (!hasAccess) {
        redirect("/?error=unauthorized");
    }

    return <TemplateExerciseContent />;
}

"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, InformationCircleIcon, ViewIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

function ViewerContent() {
    const searchParams = useSearchParams();
    const studyId = searchParams.get("id");

    if (!studyId) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4 text-center">
                <HugeiconsIcon icon={InformationCircleIcon} className="size-12 text-muted-foreground" />
                <div className="space-y-1">
                    <p className="font-medium text-lg">No Study Selected</p>
                    <p className="text-muted-foreground text-sm">Please go back to the worklist and select a patient study.</p>
                </div>
                <Link
                    href="/"
                    className={cn(buttonVariants({ variant: "outline" }))}
                >
                    Back to Worklist
                </Link>
            </div>
        );
    }

    // We assume viewer is hosted on port 3000 as configured in docker-compose
    const ohifUrl = `http://localhost:3000/viewer/${studyId}`;

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justify-between px-6 pt-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/worklist"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2")}
                    >
                        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
                        Back
                    </Link>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-2">
                        <HugeiconsIcon icon={ViewIcon} className="size-5 text-primary" />
                        <h1 className="font-bold text-lg tracking-tight">Diagnostic Viewer</h1>
                    </div>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">
                        Orthanc Node
                    </span>
                </div>
            </div>

            <div className="flex-1 bg-black mx-6 mb-6 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative">
                <iframe
                    src={ohifUrl}
                    className="w-full h-full border-0 absolute inset-0"
                    title="OHIF Medical Viewer"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

export default function ViewerPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-muted-foreground">Preparing imaging data...</div>}>
            <ViewerContent />
        </Suspense>
    );
}

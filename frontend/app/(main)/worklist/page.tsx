"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Load the main content dynamically without SSR to prevent all hydration issues (#418, #310)
const WorklistContent = dynamic(
    () => import("./components/WorklistContent"),
    { 
        ssr: false,
        loading: () => <div className="p-8"><Skeleton className="w-full h-[600px] rounded-2xl" /></div>
    }
);

export default function WorklistPage() {
    return (
        <Suspense fallback={<div className="p-8"><Skeleton className="w-full h-[600px] rounded-2xl" /></div>}>
            <WorklistContent />
        </Suspense>
    );
}

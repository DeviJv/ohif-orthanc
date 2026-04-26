"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ReportsContent = dynamic(
    () => import("./ReportsContent"),
    { 
        ssr: false,
        loading: () => <div className="p-8"><Skeleton className="w-full h-[600px] rounded-2xl" /></div>
    }
);

export default function ReportsWrapper() {
    return <ReportsContent />;
}

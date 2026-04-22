"use client";

import React, { useState } from "react";
import { 
    DashboardCircleIcon, 
    ActivityIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PacsDashboard } from "./_components/PacsDashboard";
import { SatuSehatDashboard } from "./_components/SatuSehatDashboard";
import { id } from "date-fns/locale";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("pacs");

    return (
        <div className="flex flex-col gap-8 p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                        Dashboard <span className="text-primary text-xl ml-2 font-bold bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">Quantum PACS</span>
                    </h1>
                    <p className="text-muted-foreground font-medium">Monitoring performa sistem dan volume data radiologi secara real-time.</p>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/40 dark:border-slate-800 w-fit max-w-full overflow-x-auto no-scrollbar">
                    <button 
                        onClick={() => setActiveTab("pacs")}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap",
                            activeTab === "pacs" 
                                ? "bg-white dark:bg-slate-900 text-primary shadow-xl shadow-primary/10" 
                                : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                        )}
                    >
                        <HugeiconsIcon icon={DashboardCircleIcon} className="size-3.5" />
                        PACS DASHBOARD
                    </button>
                    <button 
                        onClick={() => setActiveTab("satusehat")}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap",
                            activeTab === "satusehat" 
                                ? "bg-white dark:bg-slate-900 text-primary shadow-xl shadow-primary/10" 
                                : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                        )}
                    >
                        <HugeiconsIcon icon={ActivityIcon} className="size-3.5" />
                        SATUSEHAT DASHBOARD
                    </button>
                </div>

                <div className={cn(activeTab === "pacs" ? "block" : "hidden", "animate-in fade-in slide-in-from-bottom-2 duration-500")}>
                    <PacsDashboard />
                </div>

                <div className={cn(activeTab === "satusehat" ? "block" : "hidden", "animate-in fade-in slide-in-from-bottom-2 duration-500")}>
                    <SatuSehatDashboard />
                </div>
            </div>
        </div>
    );
}

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

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("pacs");

    return (
        <div className="flex flex-col gap-8 p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">
                        Dashboard <span className="text-primary text-xl ml-2 font-bold bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">Quantum PACS</span>
                    </h1>
                    <p className="text-muted-foreground font-medium">Monitoring performa sistem dan volume data radiologi secara real-time.</p>
                </div>
            </div>

            <Tabs defaultValue="pacs" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center md:justify-start">
                    <TabsList className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/40 mb-4 h-11">
                        <TabsTrigger 
                            value="pacs" 
                            className="rounded-lg px-8 py-2 text-xs font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all h-full"
                        >
                            <HugeiconsIcon icon={DashboardCircleIcon} className="size-3.5 mr-2" />
                            PACS Dashboard
                        </TabsTrigger>
                        <TabsTrigger 
                            value="satusehat" 
                            className="rounded-lg px-8 py-2 text-xs font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all h-full"
                        >
                            <HugeiconsIcon icon={ActivityIcon} className="size-3.5 mr-2" />
                            SatuSehat Dashboard
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="pacs" className="mt-6 border-none p-0 outline-none">
                    <PacsDashboard />
                </TabsContent>

                <TabsContent value="satusehat" className="mt-6 border-none p-0 outline-none">
                    <SatuSehatDashboard />
                </TabsContent>
            </Tabs>
        </div>
    );
}

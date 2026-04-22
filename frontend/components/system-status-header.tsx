"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    Tick01Icon, 
    AlertCircleIcon, 
    Calendar01Icon,
    Database02Icon,
    RefreshIcon,
    Menu01Icon,
    Activity01Icon
} from "@hugeicons/core-free-icons";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Container {
    ID: string;
    Names: string;
    State: string;
    Status: string;
    Image: string;
}

export function SystemStatusHeader() {
    const [containers, setContainers] = useState<Container[]>([]);
    const [env, setEnv] = useState<string>("unknown");
    const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(false);
    const [autoSyncTime, setAutoSyncTime] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [lastSync, setLastSync] = useState<Date>(new Date());

    const fetchData = useCallback(async () => {
        try {
            // Fetch Docker status
            const dockerRes = await fetch("/api/system/docker");
            if (dockerRes.ok) {
                const dockerData = await dockerRes.json();
                if (dockerData.containers) {
                    setContainers(dockerData.containers);
                }
            }

            // Fetch Environment
            const configRes = await fetch("/api/config/satusehat");
            if (configRes.ok) {
                const configData = await configRes.json();
                setEnv(configData.env || "unknown");
                setAutoSyncEnabled(!!configData.autoSyncEnabled);
                setAutoSyncTime(configData.autoSyncTime || "");
            }
            
            setLastSync(new Date());
        } catch (error) {
            console.error("Failed to fetch system status", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // Poll every 30s for header summary
        return () => clearInterval(interval);
    }, [fetchData]);

    const runningContainers = containers.filter(c => c.State === "running");
    const totalContainers = containers.length;
    const allRunning = totalContainers > 0 && runningContainers.length === totalContainers;
    const downCount = totalContainers - runningContainers.length;

    const StatusContent = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={cn(
            "flex items-center",
            isMobile ? "flex-col items-stretch gap-4 min-w-[240px]" : "gap-4"
        )}>
            {/* Environment Indicator */}
            <div className={cn(
                "flex items-center gap-2",
                isMobile ? "justify-between pb-2 border-b border-slate-100 dark:border-slate-800" : "border-r border-slate-200 dark:border-slate-800 pr-4"
            )}>
                {isMobile && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Environment</span>}
                <Badge 
                    variant={env === 'production' ? 'default' : 'secondary'}
                    className={`${
                        env === 'production' 
                            ? "bg-orange-600 hover:bg-orange-600 shadow-sm shadow-orange-200" 
                            : "bg-blue-600 hover:bg-blue-600 shadow-sm shadow-blue-200 text-white"
                    } text-[9px] font-semibold tracking-tighter h-4 px-1.5 rounded-md uppercase`}
                >
                    {env}
                </Badge>
            </div>

            {/* Auto Sync Status */}
            <div className={cn(
                "flex items-center gap-2.5",
                isMobile ? "justify-between pb-2 border-b border-slate-100 dark:border-slate-800" : "border-r border-slate-200 dark:border-slate-800 pr-4"
            )}>
                {!isMobile && (
                    <div className="relative flex items-center justify-center">
                        <div className={`size-2 rounded-full ${autoSyncEnabled ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'} ${autoSyncEnabled ? 'animate-pulse' : ''}`} />
                        {autoSyncEnabled && (
                            <div className="absolute size-2 rounded-full bg-indigo-400 animate-ping opacity-75" />
                        )}
                    </div>
                )}
                
                <div className="flex flex-col -space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <HugeiconsIcon icon={RefreshIcon} className="size-2.5" />
                        Auto Sync
                    </span>
                    <span className={`text-xs font-semibold tracking-tight ${autoSyncEnabled ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                        {isLoading ? "..." : (
                            autoSyncEnabled 
                                ? `ON @ ${autoSyncTime}` 
                                : "OFF"
                        )}
                    </span>
                </div>

                {isMobile && (
                    <div className="relative flex items-center justify-center">
                        <div className={`size-2 rounded-full ${autoSyncEnabled ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'} ${autoSyncEnabled ? 'animate-pulse' : ''}`} />
                    </div>
                )}
            </div>

            {/* Docker Status */}
            <div className={cn(
                "flex items-center gap-2.5",
                isMobile ? "justify-between pb-2 border-b border-slate-100 dark:border-slate-800" : "border-r border-slate-200 dark:border-slate-800 pr-4"
            )}>
                {!isMobile && (
                    <div className="relative flex items-center justify-center">
                        <div className={`size-2 rounded-full ${allRunning ? 'bg-emerald-500' : 'bg-rose-500'} ${allRunning ? 'animate-pulse' : ''}`} />
                        {allRunning && (
                            <div className="absolute size-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
                        )}
                    </div>
                )}
                
                <div className="flex flex-col -space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <HugeiconsIcon icon={Database02Icon} className="size-2.5" />
                        System Services
                    </span>
                    <span className={`text-xs font-semibold tracking-tight ${allRunning ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isLoading ? "Checking..." : (
                            allRunning ? "All running" : `${downCount} down`
                        )}
                    </span>
                </div>

                {isMobile && (
                    <div className={`size-2 rounded-full ${allRunning ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                )}
            </div>

            {/* System Online */}
            <div className={cn(
                "flex items-center gap-2.5",
                isMobile ? "justify-between" : ""
            )}>
                {!isMobile && (
                    <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                        <HugeiconsIcon icon={Calendar01Icon} className="size-3.5" />
                    </div>
                )}
                
                {isMobile ? (
                    <>
                        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">System Online</span>
                        <div className="flex flex-col items-end -space-y-1">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-tight">
                                {format(new Date(), "dd MMM yyyy", { locale: id })}
                            </span>
                            <span className="text-[9px] font-bold text-primary dark:text-primary tracking-widest">
                                {format(new Date(), "HH:mm")} WIB
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col -space-y-1 lg:text-left">
                        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">System Online</span>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-tight">
                            {format(new Date(), "dd MMM yyyy", { locale: id })}
                        </span>
                        <span className="text-[9px] font-bold text-primary dark:text-primary tracking-widest">
                            {format(new Date(), "HH:mm")} WIB
                        </span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop View */}
            <div className="hidden xl:flex items-center gap-4 px-4 py-1.5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:bg-white dark:hover:bg-slate-800 group">
                <StatusContent />
            </div>

            {/* Tablet/Mobile View */}
            <div className="xl:hidden">
                <Popover>
                    <PopoverTrigger 
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "h-9 px-2 gap-2 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800"
                        )}
                    >
                        <div className="relative flex items-center justify-center">
                            <div className={`size-2 rounded-full ${allRunning ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
                            <div className={`absolute size-2 rounded-full ${allRunning ? 'bg-emerald-400' : 'bg-rose-400'} animate-ping opacity-75`} />
                        </div>
                        <Badge 
                            variant={env === 'production' ? 'default' : 'secondary'}
                            className={`${
                                env === 'production' 
                                    ? "bg-orange-600 hover:bg-orange-600 shadow-sm shadow-orange-200" 
                                    : "bg-blue-600 hover:bg-blue-600 shadow-sm shadow-blue-200 text-white"
                            } text-[9px] font-bold tracking-tighter h-4 px-1.5 rounded-md uppercase`}
                        >
                            {env}
                        </Badge>
                        <HugeiconsIcon icon={Menu01Icon} className="size-4 text-slate-400" />
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-[280px] p-4 rounded-2xl shadow-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 backdrop-blur-xl">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-900">
                                <div className="flex items-center gap-2">
                                    <HugeiconsIcon icon={Activity01Icon} className="size-4 text-primary" />
                                    <span className="text-xs font-bold uppercase tracking-wider">System Overview</span>
                                </div>
                                <span className="text-[9px] text-slate-400 font-medium">Auto-refresh active</span>
                            </div>
                            <StatusContent isMobile={true} />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    );
}

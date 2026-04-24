"use client";

import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { HugeiconsIcon } from "@hugeicons/react";
import { SentIcon, Time01Icon, Tick01Icon, Alert01Icon, CloudServerIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface SyncTask {
    id: string;
    type: string;
    status: string;
    totalItems: number;
    successCount: number;
    failCount: number;
    currentStudyId: string | null;
    createdAt: string;
    completedAt: string | null;
}

interface FloatingSyncProgressProps {
    onComplete?: () => void;
}

export function FloatingSyncProgress({ onComplete }: FloatingSyncProgressProps) {
    const [tasks, setTasks] = useState<SyncTask[]>([]);
    // Track previous statuses to detect completion edge
    const [prevTaskStatuses, setPrevTaskStatuses] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch("/api/satusehat/bulk-sync");
                if (res.ok) {
                    const data = await res.json();
                    
                    // Detect completions
                    let hasCompletion = false;
                    const newStatuses: Record<string, string> = {};
                    
                    data.forEach((task: SyncTask) => {
                        newStatuses[task.id] = task.status;
                        const prevStatus = prevTaskStatuses[task.id];
                        
                        if (
                            prevStatus && 
                            (prevStatus === "PENDING" || prevStatus === "PROCESSING") &&
                            (task.status === "COMPLETED" || task.status === "FAILED")
                        ) {
                            hasCompletion = true;
                        }
                    });

                    if (hasCompletion && onComplete) {
                        onComplete();
                    }

                    setPrevTaskStatuses(newStatuses);
                    setTasks(data);
                }
            } catch (err) {
                console.error("Failed to fetch active sync tasks:", err);
            }
        };

        fetchTasks();
        const interval = setInterval(fetchTasks, 3000);
        return () => clearInterval(interval);
    }, [onComplete, prevTaskStatuses]);

    // Filter for active tasks or very recently completed (last 10 seconds)
    const activeTasks = tasks.filter(t => {
        if (t.status === "PENDING" || t.status === "PROCESSING") return true;
        if (t.completedAt) {
            const completedTime = new Date(t.completedAt).getTime();
            const now = new Date().getTime();
            return (now - completedTime) < 10000; // Show for 10 seconds after completion
        }
        return false;
    });

    if (activeTasks.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
            {activeTasks.map((task) => (
                <SyncTaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}

function SyncTaskCard({ task }: { task: SyncTask }) {
    const processedItems = task.successCount + task.failCount;
    const progress = task.totalItems > 0 ? (processedItems / task.totalItems) * 100 : 0;
    
    const isManual = task.type === "MANUAL";
    const isCompleted = task.status === "COMPLETED";
    const isFailed = task.status === "FAILED";
    const isActive = task.status === "PROCESSING" || task.status === "PENDING";

    return (
        <div
            className={cn(
                "w-[350px] pointer-events-auto overflow-hidden",
                "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl",
                "animate-in fade-in slide-in-from-right-5 duration-300",
                "flex flex-col relative"
            )}
        >
            {/* Header */}
            <div className="bg-slate-50/50 dark:bg-slate-800/20 px-4 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <div className={cn(
                        "size-1.5 rounded-full",
                        isActive ? "bg-blue-500 animate-pulse" : isCompleted ? "bg-emerald-500" : "bg-rose-500"
                    )} />
                    <span className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 tracking-widest leading-none">
                        {isManual ? "MANUAL SYNC" : "CRON SYNC"}
                    </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                    {task.id.slice(-8)}
                </span>
            </div>

            {/* Content */}
            <div className="p-4 bg-white dark:bg-slate-900 flex items-center gap-3.5">
                <div className={cn(
                    "flex-shrink-0 size-9 rounded-full flex items-center justify-center border",
                    isActive ? "border-blue-500/20 bg-blue-500/5 text-blue-600" : 
                    isCompleted ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-600" : 
                    "border-rose-500/20 bg-rose-500/5 text-rose-600"
                )}>
                    {isActive ? (
                        <HugeiconsIcon icon={CloudServerIcon} className="size-5" />
                    ) : isCompleted ? (
                        <HugeiconsIcon icon={Tick01Icon} className="size-5" />
                    ) : (
                        <HugeiconsIcon icon={Alert01Icon} className="size-5" />
                    )}
                </div>

                <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                            {isActive ? "Synchronizing Data..." : isCompleted ? "Sync Finished" : "Sync Failed"}
                        </span>
                        <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    
                    <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 line-clamp-1 mb-2.5">
                        {isActive ? `Processing patient ${processedItems + 1} of ${task.totalItems}` : 
                         isCompleted ? `Successfully synced ${task.successCount} patients.` : 
                         `Failed to sync ${task.failCount} patients.`}
                    </p>

                    <Progress value={progress} className="h-1.5 bg-slate-100 dark:bg-slate-800" />
                </div>
            </div>

            {/* Status Footer */}
            <div className="px-4 pb-3 flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <div className="size-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Success: {task.successCount}</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="size-1.5 rounded-full bg-rose-500" />
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Failed: {task.failCount}</span>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className={cn(
                "h-0.5 w-full transition-all duration-700",
                isActive ? "bg-blue-500/40" : isCompleted ? "bg-emerald-500" : "bg-rose-500"
            )} />
        </div>
    );
}

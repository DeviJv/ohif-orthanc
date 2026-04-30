"use client";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { HugeiconsIcon } from "@hugeicons/react";
import { FileExportIcon, Tick01Icon, Alert01Icon, Download01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ExportTask {
    id: string;
    status: string;
    totalItems: number;
    processedCount: number;
    fileUrl: string | null;
    createdAt: string;
    completedAt: string | null;
}

export function FloatingSatuSehatExportProgress() {
    const [tasks, setTasks] = useState<ExportTask[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch("/api/stats/satusehat/export");
                if (res.ok) {
                    const data = await res.json();
                    setTasks(data);
                }
            } catch (err) {
                console.error("Failed to fetch SatuSehat export tasks:", err);
            }
        };

        fetchTasks();
        const interval = setInterval(fetchTasks, 2000);
        return () => clearInterval(interval);
    }, []);

    if (tasks.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
            {tasks.map((task) => (
                <ExportTaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}

function ExportTaskCard({ task }: { task: ExportTask }) {
    const progress = task.totalItems > 0 ? (task.processedCount / task.totalItems) * 100 : 0;
    
    const isCompleted = task.status === "COMPLETED";
    const isFailed = task.status === "FAILED";
    const isActive = task.status === "PROCESSING" || task.status === "PENDING";

    return (
        <div
            className={cn(
                "w-[350px] pointer-events-auto overflow-hidden rounded-[1.5rem]",
                "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl",
                "animate-in fade-in slide-in-from-right-5 duration-300",
                "flex flex-col relative"
            )}
        >
            {/* Header */}
            <div className="bg-slate-50/50 dark:bg-slate-800/20 px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <div className={cn(
                        "size-1.5 rounded-full",
                        isActive ? "bg-blue-500 animate-pulse" : isCompleted ? "bg-emerald-500" : "bg-rose-500"
                    )} />
                    <span className="text-[9px] uppercase font-black text-slate-500 dark:text-slate-400 tracking-widest leading-none">
                        SATUSEHAT LOG EXPORT
                    </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                    {task.id.slice(-6)}
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
                        <HugeiconsIcon icon={FileExportIcon} className="size-5" />
                    ) : isCompleted ? (
                        <HugeiconsIcon icon={Tick01Icon} className="size-5" />
                    ) : (
                        <HugeiconsIcon icon={Alert01Icon} className="size-5" />
                    )}
                </div>

                <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                            {isActive ? "Exporting Logs..." : isCompleted ? "Export Finished" : "Export Failed"}
                        </span>
                        <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                            {isActive ? `${Math.round(progress)}%` : isCompleted ? "100%" : "Error"}
                        </span>
                    </div>
                    
                    <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 line-clamp-1 mb-2.5">
                        {isActive ? `Preparing ${task.totalItems} entries...` : 
                         isCompleted ? `Log activity export is ready.` : 
                         `Something went wrong.`}
                    </p>

                    {isActive && <Progress value={progress} className="h-1.5 bg-slate-100 dark:bg-slate-800" />}
                    
                    {isCompleted && task.fileUrl && (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-1 h-8 text-[10px] font-black gap-2 rounded-xl border-slate-200 dark:border-slate-800"
                            onClick={() => window.open(task.fileUrl!, "_blank")}
                        >
                            <HugeiconsIcon icon={Download01Icon} className="size-3.5" />
                            DOWNLOAD CSV
                        </Button>
                    )}
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

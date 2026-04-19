"use client";

import React, { useEffect, useState } from "react";
import { useTasks, Task } from "@/context/task-context";
import { Progress } from "@/components/ui/progress";
import { HugeiconsIcon } from "@hugeicons/react";
import { AiCloud01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/**
 * FloatingAiProgress
 * Displays a non-dismissible, Shadcn-inspired toast notification 
 * that tracks background AI analysis progress.
 * Redesigned for White/Light theme as requested.
 */
export function FloatingAiProgress() {
    const { tasks } = useTasks();
    const activeAiTasks = Object.values(tasks).filter(t => t.type === "ai" && t.status === "loading");

    if (activeAiTasks.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
            {activeAiTasks.map((task) => (
                <AiToastCard key={task.id} task={task} />
            ))}
        </div>
    );
}

function AiToastCard({ task }: { task: Task }) {
    const { updateTask } = useTasks();
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Initializing...");
    const studyId = task.metadata?.studyId;

    useEffect(() => {
        if (!studyId) return;

        let interval: NodeJS.Timeout;
        
        const pollProgress = async () => {
            try {
                const res = await fetch(`/api/ai/progress/${studyId}`);
                if (res.ok) {
                    const data = await res.json();
                    
                    setProgress(data.progress || 0);
                    if (data.status) setStatus(data.status);

                    if (data.progress === 100) {
                        setStatus("Success! AI Analysis Complete.");
                        // Minimal delay for visual confirmation
                        setTimeout(() => {
                            updateTask(task.id, "success");
                        }, 500);
                        clearInterval(interval);
                    } else if (data.status && data.status.toLowerCase().includes("error")) {
                        updateTask(task.id, "error");
                        clearInterval(interval);
                    }
                }
            } catch (error) {
                console.error("AI Polling error:", error);
            }
        };

        pollProgress();
        interval = setInterval(pollProgress, 2000);
        return () => clearInterval(interval);
    }, [studyId, task.id, updateTask]);

    return (
        <div
            className={cn(
                "w-[350px] pointer-events-auto overflow-hidden",
                "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl",
                "animate-in fade-in slide-in-from-right-5 duration-300",
                "flex flex-col relative"
            )}
        >
            {/* Header / Meta */}
            <div className="bg-slate-50/50 dark:bg-slate-800/20 px-4 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <div className={cn("size-1.5 rounded-full animate-pulse", progress < 100 ? "bg-primary" : "bg-emerald-500")} />
                    <span className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 tracking-widest leading-none">
                        AI ENGINE
                    </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                    {task.metadata?.studyId?.slice(-12)}
                </span>
            </div>

            {/* Main Content Area */}
            <div className="p-4 bg-white dark:bg-slate-900 flex items-center gap-3.5">
                <div className={cn(
                    "flex-shrink-0 size-9 rounded-full flex items-center justify-center border",
                    progress < 100 ? "border-primary/20 bg-primary/5 text-primary" : "border-emerald-500/20 bg-emerald-500/5 text-emerald-600"
                )}>
                    {progress < 100 ? (
                        <HugeiconsIcon icon={AiCloud01Icon} className="size-5" />
                    ) : (
                        <HugeiconsIcon icon={Tick01Icon} className="size-5" />
                    )}
                </div>

                <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                            {progress < 100 ? "Analyzing Image..." : "Analysis Finished"}
                        </span>
                        <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                            {progress}%
                        </span>
                    </div>
                    
                    {/* Status Text */}
                    <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 line-clamp-1 mb-2.5">
                        {status}
                    </p>

                    {/* Progress Bar in center content */}
                    <Progress value={progress} className="h-1.5 bg-slate-100 dark:bg-slate-800" />
                </div>
            </div>

            {/* Bottom Glow / Success Accent */}
            <div className={cn(
                "h-0.5 w-full transition-all duration-700",
                progress < 100 ? "bg-primary/40" : "bg-emerald-500"
            )} />
        </div>
    );
}

"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

export type TaskStatus = "loading" | "success" | "error";

export interface Task {
    id: string;
    description: string;
    status: TaskStatus;
    type: "download" | "upload" | "delete" | "anonymize" | "modify";
    startTime: number;
    metadata?: any;
}

interface TaskContextType {
    tasks: Record<string, Task>;
    addTask: (task: Omit<Task, "status" | "startTime">) => string;
    updateTask: (id: string, status: TaskStatus) => void;
    removeTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Record<string, Task>>({});
    const [activeToasts, setActiveToasts] = useState<Record<string, string | number>>({});

    // Load tasks from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem("pacs_tasks");
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks) as Record<string, Task>;
                // Only keep tasks from the last 2 hours to avoid stale tasks
                const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
                const activeTasks: Record<string, Task> = {};
                
                Object.entries(parsedTasks).forEach(([id, task]) => {
                    if (task.startTime > twoHoursAgo && task.status === "loading") {
                        activeTasks[id] = task;
                        // Re-trigger toast for loading tasks
                        const toastId = toast(task.description, {
                            description: "Resuming process after refresh...",
                            duration: 4000,
                        });
                        setActiveToasts(prev => ({ ...prev, [id]: toastId }));
                    }
                });
                
                setTasks(activeTasks);
            } catch (e) {
                console.error("Failed to parse saved tasks", e);
            }
        }
    }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("pacs_tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = useCallback((taskData: Omit<Task, "status" | "startTime">) => {
        const id = taskData.id || Math.random().toString(36).substring(7);
        const newTask: Task = {
            ...taskData,
            id,
            status: "loading",
            startTime: Date.now(),
        };

        const toastId = toast(newTask.description);
        
        setTasks(prev => ({ ...prev, [id]: newTask }));
        setActiveToasts(prev => ({ ...prev, [id]: toastId }));
        
        return id;
    }, []);

    const updateTask = useCallback((id: string, status: TaskStatus) => {
        setTasks(prev => {
            const task = prev[id];
            if (!task) return prev;
            
            const updatedTask = { ...task, status };
            const toastId = activeToasts[id];

            if (status === "success") {
                toast.success(`${task.description} completed`, { id: toastId });
                // Remove task from list after a short delay
                setTimeout(() => removeTask(id), 5000);
            } else if (status === "error") {
                toast.error(`${task.description} failed`, { id: toastId });
                setTimeout(() => removeTask(id), 10000);
            }

            return { ...prev, [id]: updatedTask };
        });
    }, [activeToasts]);

    const removeTask = useCallback((id: string) => {
        setTasks(prev => {
            const newTasks = { ...prev };
            delete newTasks[id];
            return newTasks;
        });
        setActiveToasts(prev => {
            const newToasts = { ...prev };
            delete newToasts[id];
            return newToasts;
        });
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}

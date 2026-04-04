"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";

export type TaskStatus = "loading" | "success" | "error";

export interface Task {
    id: string;
    description: string;
    status: TaskStatus;
    type: "download" | "upload" | "delete" | "anonymize" | "modify" | "ai";
    startTime: number;
    metadata?: any;
}

interface TaskStateContextType {
    tasks: Record<string, Task>;
}

interface TaskActionsContextType {
    addTask: (task: Omit<Task, "status" | "startTime">) => string;
    updateTask: (id: string, status: TaskStatus) => void;
    removeTask: (id: string) => void;
}

const TaskStateContext = createContext<TaskStateContextType | undefined>(undefined);
const TaskActionsContext = createContext<TaskActionsContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Record<string, Task>>({});
    const [activeToasts, setActiveToasts] = useState<Record<string, string | number>>({});

    // Load tasks from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem("pacs_tasks");
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks) as Record<string, Task>;
                const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
                const activeTasks: Record<string, Task> = {};
                
                Object.entries(parsedTasks).forEach(([id, task]) => {
                    if (task.startTime > twoHoursAgo && task.status === "loading") {
                        activeTasks[id] = task;
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

    const addTask = useCallback((taskData: Omit<Task, "status" | "startTime">) => {
        const id = taskData.id || Math.random().toString(36).substring(7);
        const newTask: Task = {
            ...taskData,
            id,
            status: "loading",
            startTime: Date.now(),
        };

        let toastId: string | number | undefined;
        if (newTask.type !== "ai") {
            toastId = toast(newTask.description);
        }
        
        setTasks(prev => ({ ...prev, [id]: newTask }));
        if (toastId) {
            setActiveToasts(prev => ({ ...prev, [id]: toastId }));
        }
        
        return id;
    }, []);

    const updateTask = useCallback((id: string, status: TaskStatus) => {
        setTasks(prev => {
            const task = prev[id];
            if (!task) return prev;
            
            const updatedTask = { ...task, status };
            const toastId = activeToasts[id];

            if (status === "success") {
                if (task.type !== "ai") {
                    toast.success(`${task.description} completed`, { id: toastId });
                }
                setTimeout(() => removeTask(id), 5000);
            } else if (status === "error") {
                toast.error(`${task.description} failed`, { id: toastId });
                setTimeout(() => removeTask(id), 10000);
            }

            return { ...prev, [id]: updatedTask };
        });
    }, [activeToasts, removeTask]);

    const actions = useMemo(() => ({
        addTask,
        updateTask,
        removeTask
    }), [addTask, updateTask, removeTask]);

    const state = useMemo(() => ({
        tasks
    }), [tasks]);

    return (
        <TaskStateContext.Provider value={state}>
            <TaskActionsContext.Provider value={actions}>
                {children}
            </TaskActionsContext.Provider>
        </TaskStateContext.Provider>
    );
}

/**
 * useTaskState - Hook for components that need to WATCH task progress (e.g. Activity lists)
 */
export function useTaskState() {
    const context = useContext(TaskStateContext);
    if (context === undefined) {
        throw new Error("useTaskState must be used within a TaskProvider");
    }
    return context;
}

/**
 * useTaskActions - Hook for components that only need to TRIGGER tasks (e.g. Action buttons)
 * COMPONENTS USING THIS HOOK WILL NOT RE-RENDER WHEN TASK PROGRESS UPDATES.
 */
export function useTaskActions() {
    const context = useContext(TaskActionsContext);
    if (context === undefined) {
        throw new Error("useTaskActions must be used within a TaskProvider");
    }
    return context;
}

/**
 * useTasks - Legacy hook for compatibility, combines both but causes re-renders.
 * Should be avoided for high-performance components.
 */
export function useTasks() {
    const state = useTaskState();
    const actions = useTaskActions();
    return { ...state, ...actions };
}

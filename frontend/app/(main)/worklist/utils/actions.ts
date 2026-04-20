"use client";

import { Study } from "../types";
import { toast } from "sonner";

export interface TaskCallbacks {
    addTask: (task: { id: string; description: string; type: "download" | "upload" | "delete" | "anonymize" | "modify" }) => string;
    updateTask: (id: string, status: "loading" | "success" | "error") => void;
}

export const handleDownloadStudy = async (id: string, patientName: string, callbacks?: TaskCallbacks) => {
    const description = `Preparing download for ${patientName}...`;
    let taskId = "";
    let toastId: string | number | undefined;
    
    if (callbacks) {
        taskId = callbacks.addTask({ id: `download-study-${id}`, description, type: "download" });
    } else {
        toastId = toast(description);
    }

    try {
        const response = await fetch(`/api/orthanc/studies/${id}/archive`);
        if (!response.ok) throw new Error("Failed to download study");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${patientName.replace(/[^a-z0-9]/gi, "_")}_${id.slice(0, 8)}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        if (callbacks) {
            callbacks.updateTask(taskId, "success");
            // Auto dismiss toast after success
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
        } else {
            toast.success(`Study for ${patientName} downloaded successfully`, { id: toastId });
        }
    } catch (error) {
        console.error("Download error:", error);
        if (callbacks) {
            callbacks.updateTask(taskId, "error");
        } else {
            toast.error(`Failed to download study for ${patientName}`, { id: toastId });
        }
        throw error;
    }
};

export const handleDownloadSeries = async (id: string, description: string, callbacks?: TaskCallbacks) => {
    const taskDesc = `Preparing download for series ${description || id.slice(0, 8)}...`;
    let taskId = "";
    let toastId: string | number | undefined;

    if (callbacks) {
        taskId = callbacks.addTask({ id: `download-series-${id}`, description: taskDesc, type: "download" });
    } else {
        toastId = toast(taskDesc);
    }

    try {
        const response = await fetch(`/api/orthanc/series/${id}/archive`);
        if (!response.ok) throw new Error("Failed to download series");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `series_${description.replace(/[^a-z0-9]/gi, "_") || id.slice(0, 8)}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        if (callbacks) {
            callbacks.updateTask(taskId, "success");
            // Auto dismiss toast after success
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
        } else {
            toast.success(`Series downloaded successfully`, { id: toastId });
        }
    } catch (error) {
        console.error("Download series error:", error);
        if (callbacks) {
            callbacks.updateTask(taskId, "error");
        } else {
            toast.error(`Failed to download series`, { id: toastId });
        }
        throw error;
    }
};

export const handleDownloadInstance = async (id: string, instanceNumber: string, callbacks?: TaskCallbacks) => {
    const taskDesc = `Preparing download for instance ${instanceNumber}...`;
    let taskId = "";
    let toastId: string | number | undefined;

    if (callbacks) {
        taskId = callbacks.addTask({ id: `download-instance-${id}`, description: taskDesc, type: "download" });
    } else {
        toastId = toast(taskDesc);
    }

    try {
        const response = await fetch(`/api/orthanc/instances/${id}/file`);
        if (!response.ok) throw new Error("Failed to download instance");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `instance_${instanceNumber}.dcm`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        if (callbacks) {
            callbacks.updateTask(taskId, "success");
            // Auto dismiss toast after success
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
        } else {
            toast.success(`Instance ${instanceNumber} downloaded`, { id: toastId });
        }
    } catch (error) {
        console.error("Download instance error:", error);
        if (callbacks) {
            callbacks.updateTask(taskId, "error");
        } else {
            toast.error(`Failed to download instance ${instanceNumber}`, { id: toastId });
        }
        throw error;
    }
};

export const handleOpenOrthancViewer = (id: string, type: "study" | "series" | "instance") => {
    const baseUrl = `${window.location.origin}/orthanc`;
    
    if (type === "series") {
        const volviewUrl = `${baseUrl}/volview/index.html?names=[archive.zip]&urls=[../series/${id}/archive]`;
        window.open(volviewUrl, "_blank");
    } else {
        const explorerUrl = `${baseUrl}/app/explorer.html#${type}?uuid=${id}`;
        window.open(explorerUrl, "_blank");
    }
};

export const getOhifUrl = (uid: string, mode: string) => {
    const viewerHost = window.location.hostname;
    // Uses nginx proxy - no port needed
    return `http://${viewerHost}/worklist?viewer=${uid}`;
};

export const handleBulkDownloadStudy = async (ids: string[], callbacks?: TaskCallbacks) => {
    const description = `Preparing bulk download for ${ids.length} studies...`;
    let taskId = "";
    let toastId: string | number | undefined;
    
    if (callbacks) {
        taskId = callbacks.addTask({ id: `bulk-download-${Date.now()}`, description, type: "download" });
    } else {
        toastId = toast(description);
    }

    try {
        const response = await fetch(`/api/orthanc/tools/create-archive`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Resources: ids,
                Synchronous: true
            }),
        });

        if (!response.ok) throw new Error("Failed to create bulk archive");
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `bulk_export_${new Date().toISOString().split('T')[0]}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        if (callbacks) {
            callbacks.updateTask(taskId, "success");
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
        } else {
            toast.success(`${ids.length} studies downloaded successfully`, { id: toastId });
        }
    } catch (error) {
        console.error("Bulk download error:", error);
        if (callbacks) {
            callbacks.updateTask(taskId, "error");
        } else {
            toast.error(`Failed to download studies`, { id: toastId });
        }
        throw error;
    }
};

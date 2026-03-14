"use client";

import { Study } from "../types";

export const handleDownloadStudy = async (id: string, patientName: string) => {
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
    } catch (error) {
        console.error("Download error:", error);
        throw error;
    }
};

export const handleDownloadSeries = async (id: string, description: string) => {
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
    } catch (error) {
        console.error("Download series error:", error);
        throw error;
    }
};

export const handleDownloadInstance = async (id: string, instanceNumber: string) => {
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
    } catch (error) {
        console.error("Download instance error:", error);
        throw error;
    }
};

export const handleOpenOrthancViewer = (id: string, type: "study" | "series" | "instance") => {
    const orthancHost = `${window.location.hostname}:8042`;
    const protocol = window.location.protocol;
    
    if (type === "series") {
        const volviewUrl = `${protocol}//${orthancHost}/volview/index.html?names=[archive.zip]&urls=[../series/${id}/archive]`;
        window.open(volviewUrl, "_blank");
    } else {
        const explorerUrl = `${protocol}//${orthancHost}/app/explorer.html#${type}?uuid=${id}`;
        window.open(explorerUrl, "_blank");
    }
};

export const getOhifUrl = (uid: string, mode: string) => {
    return `/ohif/${mode}?StudyInstanceUIDs=${uid}`;
};

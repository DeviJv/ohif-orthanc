import { toast } from "sonner";
import { Study, Series, Instance } from "../types";

export const orthancApi = {
    // Studies
    fetchStudies: async (): Promise<Study[]> => {
        const response = await fetch("/api/orthanc/studies");
        if (!response.ok) throw new Error("Failed to fetch study list");
        const ids: string[] = await response.json();

        const details = await Promise.all(
            ids.slice(0, 50).map(async (id) => {
                const res = await fetch(`/api/orthanc/studies/${id}`);
                return res.json();
            })
        );

        return details.sort((a, b) => {
            const dateA = a.MainDicomTags.StudyDate || "00000000";
            const dateB = b.MainDicomTags.StudyDate || "00000000";
            return dateB.localeCompare(dateA);
        });
    },

    deleteStudy: async (id: string) => {
        const response = await fetch(`/api/orthanc/studies/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete study");
        return response;
    },

    modifyStudy: async (studyId: string, replaceTags: Record<string, string>) => {
        const response = await fetch(`/api/orthanc/studies/${studyId}/modify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Replace: replaceTags, Force: true })
        });
        if (!response.ok) throw new Error("Failed to modify study");
        return response;
    },

    anonymize: async (id: string, type: "study" | "series") => {
        const response = await fetch(`/api/orthanc/${type}s/${id}/anonymize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Force: true })
        });
        if (!response.ok) throw new Error(`Anonymize ${type} failed`);
        return response;
    },

    // Series
    fetchSeriesDetails: async (studyId: string): Promise<Series[]> => {
        const res = await fetch(`/api/orthanc/studies/${studyId}`);
        const study: Study = await res.json();

        const details = await Promise.all(
            study.Series.map(async (id) => {
                const seriesRes = await fetch(`/api/orthanc/series/${id}`);
                return seriesRes.json();
            })
        );

        return details.sort((a, b) => {
            const numA = parseInt(a.MainDicomTags.SeriesNumber) || 0;
            const numB = parseInt(b.MainDicomTags.SeriesNumber) || 0;
            return numA - numB;
        });
    },

    deleteSeries: async (id: string) => {
        const response = await fetch(`/api/orthanc/series/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete series");
        return response;
    },

    // Instances
    fetchInstancesDetails: async (seriesId: string): Promise<Instance[]> => {
        const res = await fetch(`/api/orthanc/series/${seriesId}`);
        const series: Series = await res.json();

        const details = await Promise.all(
            series.Instances.map(async (id) => {
                const instanceRes = await fetch(`/api/orthanc/instances/${id}`);
                return instanceRes.json();
            })
        );

        return details.sort((a, b) => {
            const numA = parseInt(a.MainDicomTags.InstanceNumber) || 0;
            const numB = parseInt(b.MainDicomTags.InstanceNumber) || 0;
            return numA - numB;
        });
    },

    fetchInstanceTags: async (instanceId: string) => {
        const res = await fetch(`/api/orthanc/instances/${instanceId}/tags`);
        if (!res.ok) throw new Error("Failed to fetch instance tags");
        return res.json();
    },

    deleteInstance: async (id: string) => {
        const response = await fetch(`/api/orthanc/instances/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete instance");
        return response;
    },

    // Labels
    addLabel: async (studyId: string, label: string) => {
        const response = await fetch(`/api/orthanc/studies/${studyId}/labels/${label}`, { method: "PUT" });
        if (!response.ok) throw new Error("Failed to add label");
        return response;
    },

    removeLabel: async (studyId: string, label: string) => {
        const response = await fetch(`/api/orthanc/studies/${studyId}/labels/${label}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to remove label");
        return response;
    },

    // Files
    uploadInstance: async (arrayBuffer: ArrayBuffer) => {
        const response = await fetch("/api/orthanc/instances", {
            method: "POST",
            headers: { "Content-Type": "application/dicom" },
            body: arrayBuffer,
        });
        return response;
    }
};

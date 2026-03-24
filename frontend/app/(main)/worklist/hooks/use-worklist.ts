"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Study, Series, Instance, DicomTags } from "../types";
import { orthancApi } from "../utils/api";
import { useTasks } from "@/context/task-context";

export function useWorklist() {
    const { addTask, updateTask } = useTasks();
    const [studies, setStudies] = useState<Study[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    
    // Expand states
    const [expandedStudies, setExpandedStudies] = useState<Record<string, boolean>>({});
    const [expandedSeries, setExpandedSeries] = useState<Record<string, boolean>>({});
    const [expandedInstances, setExpandedInstances] = useState<Record<string, boolean>>({});
    
    // Data states
    const [seriesData, setSeriesData] = useState<Record<string, Series[]>>({});
    const [instancesData, setInstancesData] = useState<Record<string, Instance[]>>({});
    const [tagsData, setTagsData] = useState<Record<string, DicomTags>>({});

    const fetchStudies = useCallback(async () => {
        setLoading(true);
        try {
            const sortedDetails = await orthancApi.fetchStudies();
            setStudies(sortedDetails);
        } catch (error) {
            console.error("Failed to fetch studies:", error);
            toast.error("Koneksi Server Gagal", {
                description: "Gagal mengambil daftar study dari PACS server."
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudies();
    }, [fetchStudies]);

    const fetchSeries = useCallback(async (studyId: string) => {
        if (seriesData[studyId]) return;
        try {
            const sortedSeries = await orthancApi.fetchSeriesDetails(studyId);
            setSeriesData(prev => ({ ...prev, [studyId]: sortedSeries }));
        } catch (error) {
            console.error("Failed to fetch series:", error);
            toast.error("Gagal mengambil data series");
        }
    }, [seriesData]);

    const fetchInstances = useCallback(async (seriesId: string) => {
        if (instancesData[seriesId]) return;
        try {
            const sortedInstances = await orthancApi.fetchInstancesDetails(seriesId);
            setInstancesData(prev => ({ ...prev, [seriesId]: sortedInstances }));
        } catch (error) {
            console.error("Failed to fetch instances:", error);
            toast.error("Gagal mengambil data instance");
        }
    }, [instancesData]);

    const fetchInstanceTags = useCallback(async (instanceId: string) => {
        if (tagsData[instanceId]) return;
        try {
            const tags = await orthancApi.fetchInstanceTags(instanceId);
            setTagsData(prev => ({ ...prev, [instanceId]: tags }));
        } catch (error) {
            console.error("Failed to fetch instance tags:", error);
            toast.error("Gagal mengambil metadata", {
                description: "Terjadi kesalahan saat mengambil tag DICOM dari server."
            });
        }
    }, [tagsData]);

    const toggleStudyExpansion = useCallback((studyId: string) => {
        setExpandedStudies(prev => {
            const newState = { ...prev, [studyId]: !prev[studyId] };
            if (newState[studyId]) fetchSeries(studyId);
            return newState;
        });
    }, [fetchSeries]);

    const toggleSeriesExpansion = useCallback((seriesId: string) => {
        setExpandedSeries(prev => {
            const newState = { ...prev, [seriesId]: !prev[seriesId] };
            if (newState[seriesId]) fetchInstances(seriesId);
            return newState;
        });
    }, [fetchInstances]);

    const toggleInstanceExpansion = useCallback((instanceId: string) => {
        setExpandedInstances(prev => {
            const newState = { ...prev, [instanceId]: !prev[instanceId] };
            if (newState[instanceId]) fetchInstanceTags(instanceId);
            return newState;
        });
    }, [fetchInstanceTags]);

    const handleDeleteStudy = useCallback(async (id: string) => {
        const taskId = addTask({ id: `delete-study-${id}`, description: "Deleting study...", type: "delete" });
        try {
            await orthancApi.deleteStudy(id);
            updateTask(taskId, "success");
            // Auto dismiss toast after success
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
            fetchStudies();
        } catch (error) {
            console.error("Failed to delete study:", error);
            updateTask(taskId, "error");
            toast.error("Gagal Menghapus Study", { description: "Terjadi kesalahan saat menghapus data di server." });
        }
    }, [fetchStudies, addTask, updateTask]);

    const handleDeleteSeries = useCallback(async (id: string, studyId: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus series ini?")) return;
        const taskId = addTask({ id: `delete-series-${id}`, description: "Deleting series...", type: "delete" });
        try {
            await orthancApi.deleteSeries(id);
            updateTask(taskId, "success");
            // Auto dismiss toast after success
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
            setSeriesData(prev => ({ ...prev, [studyId]: prev[studyId].filter(s => s.ID !== id) }));
        } catch (error) {
            console.error("Delete series error:", error);
            updateTask(taskId, "error");
            toast.error("Gagal Menghapus Series", { description: "Pastikan koneksi ke server Orthanc stabil." });
        }
    }, [addTask, updateTask]);

    const handleDeleteInstance = useCallback(async (id: string, seriesId: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus instance ini?")) return;
        const taskId = addTask({ id: `delete-instance-${id}`, description: "Deleting instance...", type: "delete" });
        try {
            await orthancApi.deleteInstance(id);
            updateTask(taskId, "success");
            // Auto dismiss toast after success
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
            setInstancesData(prev => ({ ...prev, [seriesId]: prev[seriesId].filter(i => i.ID !== id) }));
        } catch (error) {
            console.error("Delete instance error:", error);
            updateTask(taskId, "error");
            toast.error("Gagal Menghapus Instance", { description: "Gagal menghapus file instance DICOM." });
        }
    }, [addTask, updateTask]);

    const handleEditPatient = useCallback(async (studyId: string, currentName: string) => {
        const newName = prompt("Masukkan Nama Pasien Baru:", currentName);
        if (newName === null || newName === currentName) return;
        const taskId = addTask({ id: `edit-patient-${studyId}`, description: "Updating patient data...", type: "modify" });
        try {
            await orthancApi.modifyStudy(studyId, { PatientName: newName });
            updateTask(taskId, "success");
            // Auto dismiss toast after success
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
            
            fetchStudies();
        } catch (error) {
            console.error("Edit patient error:", error);
            updateTask(taskId, "error");
        }
    }, [fetchStudies, addTask, updateTask]);

    const handleAnonymize = useCallback(async (id: string, type: "study" | "series") => {
        if (!confirm(`Anonymize ${type}? This will create a new anonymized ${type}.`)) return;
        const taskId = addTask({ id: `anonymize-${type}-${id}`, description: `Anonymizing ${type}...`, type: "anonymize" });
        try {
            await orthancApi.anonymize(id, type);
            updateTask(taskId, "success");
            // Auto dismiss toast after success
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
            
            fetchStudies();
        } catch (error) {
            console.error("Anonymize error:", error);
            updateTask(taskId, "error");
        }
    }, [fetchStudies, addTask, updateTask]);

    const handleAddLabel = useCallback(async (studyId: string) => {
        const label = prompt("Enter label to add:");
        if (!label) return;
        try {
            await orthancApi.addLabel(studyId, label);
            toast.success("Label Ditambahkan", { description: `Label '${label}' berhasil disematkan pada study.` });
            fetchStudies();
        } catch (error) {
            console.error("Add label error:", error);
            toast.error("Gagal Menambah Label", { description: "Terjadi kesalahan saat memperbarui label di Orthanc." });
        }
    }, [fetchStudies]);

    const handleRemoveLabel = useCallback(async (studyId: string, label: string) => {
        try {
            await orthancApi.removeLabel(studyId, label);
            toast.success("Label Dihapus", { description: `Label '${label}' telah dihapus dari study.` });
            fetchStudies();
        } catch (error) {
            console.error("Remove label error:", error);
            toast.error("Gagal Menghapus Label", { description: "Terjadi kesalahan saat menghapus label." });
        }
    }, [fetchStudies]);

    const handleFileUpload = useCallback(async (files: FileList, metadata?: { PatientTelephoneNumbers?: string }) => {
        if (!files || files.length === 0) return;
        setUploading(true);
        const taskId = addTask({ id: "upload-dicom", description: `Uploading ${files.length} DICOM files...`, type: "upload" });
        
        try {
            const BATCH_SIZE = 5;
            let successCount = 0;
            let errorCount = 0;
            const studyIds = new Set<string>();

            for (let i = 0; i < files.length; i += BATCH_SIZE) {
                const batch = Array.from(files).slice(i, i + BATCH_SIZE);
                const batchPromises = batch.map(async (file) => {
                    try {
                        const arrayBuffer = await file.arrayBuffer();
                        const response = await orthancApi.uploadInstance(arrayBuffer);
                        if (response.ok) {
                            const data = await response.json();
                            if (data.ParentStudy) studyIds.add(data.ParentStudy);
                            return true;
                        }
                        return false;
                    } catch (e) {
                        return false;
                    }
                });

                const results = await Promise.all(batchPromises);
                results.forEach(res => {
                    if (res) successCount++;
                    else errorCount++;
                });
            }

            // Update metadata if phone number is provided
            if (metadata?.PatientTelephoneNumbers && studyIds.size > 0) {
                for (const studyId of Array.from(studyIds)) {
                    try {
                        const response = await orthancApi.modifyStudy(studyId, { 
                            PatientTelephoneNumbers: metadata.PatientTelephoneNumbers! 
                        });
                        if (response.ok) {
                            // Orthanc's /modify creates a NEW study. 
                            // We delete the original one to avoid duplication.
                            await orthancApi.deleteStudy(studyId);
                        }
                    } catch (e) {
                        console.error(`Failed to modify/delete study ${studyId}:`, e);
                    }
                }
            }

            updateTask(taskId, "success");
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
            
            fetchStudies();
        } catch (error) {
            console.error("Upload error:", error);
            updateTask(taskId, "error");
        } finally {
            setUploading(false);
        }
    }, [fetchStudies, addTask, updateTask]);

    const handleSendToTelegram = async (studyId: string) => {
        try {
            await orthancApi.sendToTelegram(studyId);
            toast.success("Gambar berhasil dikirim ke Telegram Dokter");
        } catch (error: any) {
            console.error("Failed to send to Telegram:", error);
            toast.error(error.message || "Gagal mengirim ke Telegram. Pastikan Bot Token dan Chat ID sudah benar.");
        }
    };

    return {
        studies, loading, uploading,
        expandedStudies, expandedSeries, expandedInstances,
        seriesData, instancesData, tagsData,
        toggleStudyExpansion, toggleSeriesExpansion, toggleInstanceExpansion,
        handleDeleteStudy, handleDeleteSeries, handleDeleteInstance,
        handleEditPatient, handleAnonymize,
        handleAddLabel, handleRemoveLabel,
        handleFileUpload, fetchStudies, handleSendToTelegram
    };
}

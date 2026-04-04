"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Study, Series, Instance, DicomTags } from "../types";
import { orthancApi } from "../utils/api";
import { useTaskState, useTaskActions } from "@/context/task-context";

export function useWorklist() {
    const { addTask, updateTask } = useTaskActions();
    const { tasks } = useTaskState();
    const [studies, setStudies] = useState<Study[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [aiMode, setAiMode] = useState<string>("OFF");
    
    // Expand states
    const [expandedStudies, setExpandedStudies] = useState<Record<string, boolean>>({});
    const [expandedSeries, setExpandedSeries] = useState<Record<string, boolean>>({});
    const [expandedInstances, setExpandedInstances] = useState<Record<string, boolean>>({});
    
    // Data states
    const [seriesData, setSeriesData] = useState<Record<string, Series[]>>({});
    const [instancesData, setInstancesData] = useState<Record<string, Instance[]>>({});
    const [tagsData, setTagsData] = useState<Record<string, DicomTags>>({});
    const [aiResults, setAiResults] = useState<Record<string, any>>({});

    const fetchAiResults = useCallback(async () => {
        try {
            const res = await fetch("/api/ai/results/all");
            if (res.ok) {
                const data = await res.json();
                const resultMap: Record<string, any> = {};
                data.forEach((r: any) => {
                    // Check all possible key variations defensively
                    const rawUid = r.studyInstanceUid || r.study_instance_uid || r.StudyInstanceUID || "";
                    const key = rawUid.toUpperCase();
                    if (key) resultMap[key] = r;
                });
                setAiResults(resultMap);
                return resultMap;
            }
        } catch (e) {
            console.error("Failed to fetch AI results:", e);
        }
        return {};
    }, []);

    const fetchStudies = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch studies AND AI results in parallel to avoid "hilang-muncul"
            const [sortedDetails, resultMap] = await Promise.all([
                orthancApi.fetchStudies(),
                fetchAiResults()
            ]);
            setStudies(sortedDetails);
        } catch (error) {
            console.error("Failed to fetch studies:", error);
            toast.error("Koneksi Server Gagal", {
                description: "Gagal mengambil daftar study dari PACS server."
            });
        } finally {
            setLoading(false);
        }
    }, [fetchAiResults]);

    const fetchAiConfig = useCallback(async () => {
        try {
            // Add timestamp to bust cache
            const res = await fetch(`/api/config/ai?t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                console.log("AI Config loaded:", data.mode);
                setAiMode(data.mode);
            }
        } catch (e) {
            console.error("Failed to fetch AI config:", e);
        }
    }, []);

    // Instant refresh only when a NEW AI task completes
    const prevCompletedCount = useRef(0);
    useEffect(() => {
        const completedAiTasks = Object.values(tasks).filter(
            t => t.type === "ai" && t.status === "success"
        ).length;
        
        if (completedAiTasks > prevCompletedCount.current) {
            console.log("New AI task completed, refreshing results...");
            fetchAiResults();
        }
        prevCompletedCount.current = completedAiTasks;
    }, [tasks, fetchAiResults]);

    useEffect(() => {
        fetchStudies();
        fetchAiConfig();
    }, [fetchStudies, fetchAiConfig]);

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
            // Get study UID first for DB cleanup
            const study = studies.find(s => s.ID === id);
            const studyUid = study?.MainDicomTags.StudyInstanceUID;

            await orthancApi.deleteStudy(id);
            
            // Sync delete AI Result in Postgres
            if (studyUid) {
                await fetch(`/api/ai/results/${studyUid}`, { method: "DELETE" });
            }

            updateTask(taskId, "success");
            setTimeout(() => toast.dismiss(taskId), 3000);
            fetchStudies();
        } catch (error) {
            console.error("Failed to delete study:", error);
            updateTask(taskId, "error");
            toast.error("Gagal Menghapus Study", { description: "Terjadi kesalahan saat menghapus data di server." });
        }
    }, [fetchStudies, addTask, updateTask, studies]);

    const handleDeleteSeries = useCallback(async (id: string, studyId: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus series ini?")) return;
        const taskId = addTask({ id: `delete-series-${id}`, description: "Deleting series...", type: "delete" });
        try {
            // Get study UID for AI result cleanup
            const study = studies.find(s => s.ID === studyId);
            const studyUid = study?.MainDicomTags.StudyInstanceUID;

            await orthancApi.deleteSeries(id);

            // If a series is deleted, we invalidate the AI result for that study
            if (studyUid) {
                await fetch(`/api/ai/results/${studyUid}`, { method: "DELETE" });
            }

            updateTask(taskId, "success");
            setTimeout(() => toast.dismiss(taskId), 3000);
            setSeriesData(prev => ({ ...prev, [studyId]: prev[studyId].filter(s => s.ID !== id) }));
            fetchAiResults(); // Refresh AI buttons
        } catch (error) {
            console.error("Delete series error:", error);
            updateTask(taskId, "error");
            toast.error("Gagal Menghapus Series", { description: "Pastikan koneksi ke server Orthanc stabil." });
        }
    }, [addTask, updateTask, studies, fetchAiResults]);

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

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [studyToEdit, setStudyToEdit] = useState<Study | null>(null);

    const openEditDialog = useCallback((study: Study) => {
        setStudyToEdit(study);
        setIsEditDialogOpen(true);
    }, []);

    const handleEditStudy = useCallback(async (studyId: string, modifications: Record<string, string>) => {
        const taskId = addTask({ id: `edit-study-${studyId}`, description: "Updating study data...", type: "modify" });
        try {
            await orthancApi.modifyStudy(studyId, modifications);
            updateTask(taskId, "success");
            // Auto dismiss toast after success
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
            
            fetchStudies();
            setIsEditDialogOpen(false);
            setStudyToEdit(null);
        } catch (error) {
            console.error("Edit study error:", error);
            updateTask(taskId, "error");
            toast.error("Gagal Buka File/Edit", { description: "Terjadi kesalahan saat mengupdate metadata." });
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

    const handleUploadSeries = useCallback(async (files: FileList, studyId: string) => {
        if (!files || files.length === 0) return;
        const taskId = addTask({ id: `upload-series-${studyId}`, description: `Uploading ${files.length} DICOM file(s) to study...`, type: "upload" });
        try {
            const BATCH_SIZE = 5;
            let successCount = 0;

            for (let i = 0; i < files.length; i += BATCH_SIZE) {
                const batch = Array.from(files).slice(i, i + BATCH_SIZE);
                const results = await Promise.all(
                    batch.map(async (file) => {
                        try {
                            const buf = await file.arrayBuffer();
                            const res = await orthancApi.uploadInstance(buf);
                            return res.ok;
                        } catch { return false; }
                    })
                );
                results.forEach(ok => { if (ok) successCount++; });
            }

            updateTask(taskId, "success");
            setTimeout(() => toast.dismiss(taskId), 3000);
            toast.success(`${successCount} file berhasil diupload`);
            // Refresh series for this study
            setSeriesData(prev => { const next = { ...prev }; delete next[studyId]; return next; });
            fetchSeries(studyId);
            
            // Auto-trigger AI if mode is AUTO (Now driven by Frontend for reliability)
            if (aiMode === "AUTO") {
                console.log("Frontend Trigger: Starting AI analysis for study:", studyId);
                handleRunAi(studyId);
            }
        } catch (error) {
            console.error("Upload series error:", error);
            updateTask(taskId, "error");
            toast.error("Gagal upload series");
        }
    }, [addTask, updateTask, fetchSeries]);

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
                const originalStudyId = Array.from(studyIds)[0];
                setUploading(false);
                toast.loading("Memproses Metadata...", { id: "metadata-processing" });
                const modifyRes = await orthancApi.modifyStudy(originalStudyId, {
                    PatientTelephoneNumbers: metadata.PatientTelephoneNumbers
                });
                toast.dismiss("metadata-processing");
            }

            updateTask(taskId, "success");
            setTimeout(() => {
                toast.dismiss(taskId);
            }, 3000);
            
            fetchStudies();

            // Auto-trigger AI if mode is AUTO (Now driven by Frontend for reliability)
            if (aiMode === "AUTO" && studyIds.size > 0) {
                const firstStudyId = Array.from(studyIds)[0];
                console.log("Frontend Trigger: Starting AI analysis for study:", firstStudyId);
                handleRunAi(firstStudyId);
            }
        } catch (error) {
            console.error("Upload error:", error);
            updateTask(taskId, "error");
        } finally {
            setUploading(false);
        }
    }, [fetchStudies, addTask, updateTask]);

    const [isSendTelegramDialogOpen, setIsSendTelegramDialogOpen] = useState(false);
    const [selectedStudyForTelegram, setSelectedStudyForTelegram] = useState<Study | null>(null);

    const handleSendToTelegram = useCallback(async (studyId: string) => {
        try {
            await orthancApi.sendToTelegram(studyId);
            toast.success("Gambar berhasil dikirim ke Telegram Dokter");
        } catch (error: any) {
            console.error("Failed to send to Telegram:", error);
            toast.error(error.message || "Gagal mengirim ke Telegram. Pastikan Bot Token dan Chat ID sudah benar.");
        }
    }, []);

    const handleRunAi = useCallback(async (studyId: string) => {
        const study = studies.find(s => s.ID === studyId);
        const studyUid = study?.MainDicomTags.StudyInstanceUID;
        
        const taskId = addTask({ 
            id: `ai-trigger-${studyId}`, 
            description: "AI Analysis in progress...", 
            type: "ai",
            metadata: { studyUid, studyId } 
        });
        try {
            const res = await fetch("/api/ai/trigger", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studyId })
            });

            if (res.ok) {
                // Background process started
            } else {
                const data = await res.json();
                throw new Error(data.error || "Gagal memicu AI");
            }
        } catch (error: any) {
            console.error("AI trigger error:", error);
            updateTask(taskId, "error");
            toast.error("Gagal Menjalankan AI", { description: error.message });
        }
    }, [studies, addTask, updateTask]);

    const openSendTelegramDialog = useCallback((study: Study) => {
        setSelectedStudyForTelegram(study);
        setIsSendTelegramDialogOpen(true);
    }, []);

    return {
        studies, loading, uploading,
        expandedStudies, expandedSeries, expandedInstances,
        seriesData, instancesData, tagsData,
        toggleStudyExpansion, toggleSeriesExpansion, toggleInstanceExpansion,
        handleDeleteStudy, handleDeleteSeries, handleDeleteInstance,
        handleEditStudy, openEditDialog, isEditDialogOpen, setIsEditDialogOpen, studyToEdit, setStudyToEdit, handleAnonymize,
        handleAddLabel, handleRemoveLabel, handleUploadSeries,
        handleFileUpload, fetchStudies, handleSendToTelegram,
        isSendTelegramDialogOpen, setIsSendTelegramDialogOpen,
        selectedStudyForTelegram, openSendTelegramDialog,
        aiMode, handleRunAi, aiResults
    };
}

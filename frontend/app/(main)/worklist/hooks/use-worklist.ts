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
    const [ssIntegrationStatus, setSsIntegrationStatus] = useState<Record<string, any>>({});
    const [doctorNames, setDoctorNames] = useState<Record<string, string>>({});
    const [hasReports, setHasReports] = useState<Record<string, boolean>>({});
    const [doctors, setDoctors] = useState<any[]>([]);

    // Dialog states
    const [isSendTelegramDialogOpen, setIsSendTelegramDialogOpen] = useState(false);
    const [selectedStudyForTelegram, setSelectedStudyForTelegram] = useState<Study | null>(null);

    // Satu Sehat Bridge state
    const [isBridgeDialogOpen, setIsBridgeDialogOpen] = useState(false);
    const [selectedStudyForBridge, setSelectedStudyForBridge] = useState<Study | null>(null);

    // WhatsApp state
    const [isSendWhatsappDialogOpen, setIsSendWhatsappDialogOpen] = useState(false);
    const [selectedStudyForWhatsapp, setSelectedStudyForWhatsapp] = useState<Study | null>(null);

    const fetchAiResults = useCallback(async () => {
        try {
            const res = await fetch("/api/ai/results/all");
            if (res.ok) {
                const data = await res.json();
                console.log(`[DEBUG AI] Received ${data.length} results from DB`);
                
                const resultMap: Record<string, any> = {};
                data.forEach((r: any) => {
                    const rawUid = (r.studyInstanceUid || r.study_instance_uid || r.StudyInstanceUID || "").trim();
                    if (rawUid) {
                        const upperUid = rawUid.toUpperCase();
                        resultMap[rawUid] = r;
                        resultMap[upperUid] = r;
                        console.log(`[DEBUG AI] Mapping result for UID: ${rawUid}`);
                    }
                });
                setAiResults(resultMap);
                return resultMap;
            }
        } catch (e) {
            console.error("Failed to fetch AI results:", e);
        }
        return {};
    }, []);

    const fetchSsStatus = useCallback(async (studyInstanceUids: string[]) => {
        try {
            const statusMap: Record<string, any> = {};
            await Promise.all(studyInstanceUids.map(async (uid) => {
                const res = await fetch(`/api/satusehat/bridge?studyInstanceUid=${uid}`);
                if (res.ok) {
                    const data = await res.json();
                    statusMap[uid] = data;
                }
            }));
            setSsIntegrationStatus(prev => ({ ...prev, ...statusMap }));
        } catch (e) {
            console.error("Failed to fetch SS status:", e);
        }
    }, []);

    const fetchDoctorNames = useCallback(async () => {
        try {
            const res = await fetch("/api/reports/all");
            if (res.ok) {
                const data = await res.json();
                const resultMap: Record<string, string> = {};
                const reportMap: Record<string, boolean> = {};
                data.forEach((r: any) => {
                    if (r.studyInstanceUid) {
                        const rawUid = r.studyInstanceUid.trim();
                        const upperUid = rawUid.toUpperCase();
                        
                        reportMap[rawUid] = true;
                        reportMap[upperUid] = true;

                        if (r.doctorName) {
                            resultMap[rawUid] = r.doctorName;
                            resultMap[upperUid] = r.doctorName;
                        }
                    }
                });
                setDoctorNames(resultMap);
                setHasReports(reportMap);
                return resultMap;
            }
        } catch (e) {
            console.error("Failed to fetch doctor names from reports:", e);
        }
        return {};
    }, []);

    const fetchDoctors = useCallback(async () => {
        try {
            const res = await fetch("/api/users/doctors");
            if (res.ok) {
                const data = await res.json();
                setDoctors(data);
                return data;
            }
        } catch (e) {
            console.error("Failed to fetch doctors:", e);
        }
        return [];
    }, []);

    const fetchStudies = useCallback(async () => {
        setLoading(true);
        // Clear cached series/instances data on refresh to ensure latest data is fetched
        setSeriesData({});
        setInstancesData({});
        setTagsData({});
        
        try {
            // Fetch studies AND AI results AND doctor names in parallel to avoid "hilang-muncul"
            const [sortedDetails, resultMap, docMap] = await Promise.all([
                orthancApi.fetchStudies(),
                fetchAiResults(),
                fetchDoctorNames()
            ]);
            setStudies(sortedDetails);
            
            // Fetch SS status for the studies
            const uids = sortedDetails.map(s => s.MainDicomTags.StudyInstanceUID);
            fetchSsStatus(uids);
        } catch (error) {
            console.error("Failed to fetch studies:", error);
            toast.error("Koneksi Server Gagal", {
                description: "Gagal mengambil daftar study dari PACS server."
            });
        } finally {
            setLoading(false);
        }
    }, [fetchAiResults, fetchSsStatus, fetchDoctorNames]);

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

    // Real-time Toast Notifications for AI completion
    const prevTasksRef = useRef<Record<string, any>>({});
    useEffect(() => {
        const finishedAiTasks = Object.entries(tasks).filter(([id, task]) => {
            const prev = prevTasksRef.current[id];
            return (
                task.type === "ai" && 
                (task.status === "success" || task.status === "error") && 
                (!prev || prev.status === "processing" || prev.status === "not_started")
            );
        });

        finishedAiTasks.forEach(([id, task]) => {
            const studyId = (task.metadata as any)?.studyId;
            const study = studies.find(s => s.ID === studyId);
            const patientName = study?.MainDicomTags?.PatientName || "Unknown Patient";

            if (task.status === "success") {
                toast.success("AI Analysis Completed", {
                    description: `Analisa AI untuk pasien ${patientName} telah berhasil diselesaikan 100%.`,
                    duration: 5000,
                });
                console.log("[DEBUG AI] Task SUCCESS - Triggering delayed fetch (1s)...");
                setTimeout(() => {
                    fetchAiResults(); // Force refresh buttons
                }, 1000);
            } else if (task.status === "error") {
                toast.error("AI Analysis Failed", {
                    description: `Gagal memproses analisa AI untuk pasien ${patientName}.`,
                    duration: 5000,
                });
            }
        });

        prevTasksRef.current = { ...tasks };
    }, [tasks, studies, fetchAiResults]);

    useEffect(() => {
        fetchStudies();
        fetchAiConfig();
        fetchDoctors();
    }, [fetchStudies, fetchAiConfig, fetchDoctors]);

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

    // Auto-fetch data for expanded items if data is missing (e.g. after refresh)
    useEffect(() => {
        Object.entries(expandedStudies).forEach(([studyId, isExpanded]) => {
            if (isExpanded && !seriesData[studyId]) fetchSeries(studyId);
        });
    }, [expandedStudies, seriesData, fetchSeries]);

    useEffect(() => {
        Object.entries(expandedSeries).forEach(([seriesId, isExpanded]) => {
            if (isExpanded && !instancesData[seriesId]) fetchInstances(seriesId);
        });
    }, [expandedSeries, instancesData, fetchInstances]);

    useEffect(() => {
        Object.entries(expandedInstances).forEach(([instanceId, isExpanded]) => {
            if (isExpanded && !tagsData[instanceId]) fetchInstanceTags(instanceId);
        });
    }, [expandedInstances, tagsData, fetchInstanceTags]);

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
        const taskId = addTask({ id: `edit-study-${studyId}`, description: "Mengupdate metadata...", type: "modify" });
        try {
            // modifyStudy returns instantly (async Orthanc job submitted)
            await orthancApi.modifyStudy(studyId, modifications);
            updateTask(taskId, "success");
            setTimeout(() => toast.dismiss(taskId), 3000);

            // Close dialog immediately — Orthanc processes in background
            setIsEditDialogOpen(false);
            setStudyToEdit(null);

            // Refresh worklist after a short delay to pick up the modified study
            setTimeout(() => fetchStudies(), 3000);

        } catch (error) {
            console.error("Edit study error:", error);
            updateTask(taskId, "error");
            toast.error("Gagal Edit", { description: "Terjadi kesalahan saat mengupdate metadata." });
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
            
            // Auto-triggering is now handled exclusively by Orthanc StableStudy event for consistency
            /*
            if (aiMode === "AUTO") {
                console.log("Frontend Trigger: Starting AI analysis for study:", studyId);
                handleRunAi(studyId);
            }
            */
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

            // Auto-triggering is now handled exclusively by Orthanc StableStudy event for consistency
            /*
            if (aiMode === "AUTO" && studyIds.size > 0) {
                const firstStudyId = Array.from(studyIds)[0];
                console.log("Frontend Trigger: Starting AI analysis for study:", firstStudyId);
                handleRunAi(firstStudyId);
            }
            */
        } catch (error) {
            console.error("Upload error:", error);
            updateTask(taskId, "error");
        } finally {
            setUploading(false);
        }
    }, [fetchStudies, addTask, updateTask]);

    const handleSendToTelegram = useCallback(async (studyId: string, doctorId?: string) => {
        try {
            await orthancApi.sendToTelegram(studyId, doctorId);
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

    const openBridgeDialog = useCallback((study: Study) => {
        setSelectedStudyForBridge(study);
        setIsBridgeDialogOpen(true);
    }, []);

    const openSendWhatsappDialog = useCallback((study: Study) => {
        setSelectedStudyForWhatsapp(study);
        setIsSendWhatsappDialogOpen(true);
    }, []);

    const handleSendToWhatsapp = useCallback(async (target: string, message: string, file?: string, filename?: string, variables?: string[]) => {
        try {
            const res = await fetch("/api/whatsapp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target, message, file, filename, variables })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Gagal mengirim WhatsApp");
            }

            toast.success("Laporan berhasil dikirim ke WhatsApp Pasien");
            await fetchDoctorNames();
            return true;
        } catch (error: any) {
            console.error("Failed to send to WhatsApp:", error);
            toast.error(error.message || "Gagal mengirim ke WhatsApp");
            return false;
        }
    }, [fetchDoctorNames]);

    const handleBridgeSatuSehat = useCallback(async (studyId: string, manualNik?: string) => {
        const taskId = addTask({ 
            id: `ss-bridge-${studyId}`, 
            description: "Bridging to Satu Sehat...", 
            type: "upload" 
        });

        // Temukan Study untuk mendapatkan StudyInstanceUID
        const study = studies.find(s => s.ID === studyId);
        const studyInstanceUid = study?.MainDicomTags.StudyInstanceUID || studyId;

        setSsIntegrationStatus(prev => ({ 
            ...prev, 
            [studyInstanceUid]: { ...prev[studyInstanceUid], status: "PROCESSING" } 
        }));

        try {
            const res = await fetch("/api/satusehat/bridge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    studyInstanceUid: studyId,
                    manualNik: manualNik
                }) 
            });

            if (res.ok) {
                updateTask(taskId, "success");
                toast.success("Berhasil dikirim ke Satu Sehat");
                
                // Refresh status
                const statusRes = await fetch(`/api/satusehat/bridge?studyInstanceUid=${studyInstanceUid}`);
                if (statusRes.ok) {
                    const statusData = await statusRes.json();
                    setSsIntegrationStatus(prev => ({ ...prev, [studyInstanceUid]: statusData }));
                }
            } else {
                const data = await res.json();
                throw new Error(data.error || "Gagal mengirim ke Satu Sehat");
            }
        } catch (error: any) {
            console.error("SS bridge error:", error);
            updateTask(taskId, "error");
            toast.error("Satu Sehat Gagal", { description: error.message });
            setSsIntegrationStatus(prev => ({ 
                ...prev, 
                [studyInstanceUid]: { ...prev[studyInstanceUid], status: "FAILED", error: error.message } 
            }));
        } finally {
            setTimeout(() => toast.dismiss(taskId), 3000);
        }
    }, [addTask, updateTask]);

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
        isBridgeDialogOpen, setIsBridgeDialogOpen,
        selectedStudyForBridge, openBridgeDialog,
        isSendWhatsappDialogOpen, setIsSendWhatsappDialogOpen,
        selectedStudyForWhatsapp, openSendWhatsappDialog,
        handleSendToWhatsapp,
        fetchDoctorNames,
        aiMode, handleRunAi, aiResults,
        handleBridgeSatuSehat, ssIntegrationStatus,
        doctorNames, doctors, hasReports
    };
}

"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Study } from "../../worklist/types"; 

// Using the same Study type, but the new API will return an augmented Study with 'satuSehat' tracking data
export interface MergedStudy extends Study {
    satuSehat: {
        status: string;
        error: string | null;
        syncedAt: string | null;
        satusehatId: string | null;
        bundleResponse: string | null; // json stored as string
    };
}

export function useSatuSehatWorklist() {
    const [studies, setStudies] = useState<MergedStudy[]>([]);
    const [loading, setLoading] = useState(true);

    const [isBridgeDialogOpen, setIsBridgeDialogOpen] = useState(false);
    const [selectedStudyForBridge, setSelectedStudyForBridge] = useState<MergedStudy | null>(null);

    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
    const [selectedStudyError, setSelectedStudyError] = useState<{ error: string | null; bundleResponse: string | null } | null>(null);

    const fetchStudies = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/satusehat/worklist");
            if (!res.ok) {
                throw new Error("Failed to fetch merged worklist");
            }
            const data = await res.json();
            setStudies(data);
        } catch (error) {
            console.error("Failed to fetch studies:", error);
            toast.error("Gagal Mengambil Data", {
                description: "Tidak dapat mengambil data sinkronisasi dari server."
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudies();
    }, [fetchStudies]);

    const openBridgeDialog = useCallback((study: MergedStudy) => {
        setSelectedStudyForBridge(study);
        setIsBridgeDialogOpen(true);
    }, []);

    const openErrorDialog = useCallback((study: MergedStudy) => {
        setSelectedStudyError({
            error: study.satuSehat.error,
            bundleResponse: study.satuSehat.bundleResponse
        });
        setIsErrorDialogOpen(true);
    }, []);

    const handleBridgeSatuSehat = useCallback(async (studyId: string, manualNik?: string, skipRefresh = false) => {
        const study = studies.find(s => s.ID === studyId);
        const studyInstanceUid = study?.MainDicomTags.StudyInstanceUID || studyId;

        // Optimistic UI Update
        setStudies(prev => prev.map(s => {
            if (s.ID === studyId) {
                return { ...s, satuSehat: { ...s.satuSehat, status: "PROCESSING" } };
            }
            return s;
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
                toast.success("Berhasil Memicu Sinkronisasi", {
                    description: "Data akan diperbarui setelah proses selesai."
                });
                // Wait a moment then refresh list
                if (!skipRefresh) {
                    setTimeout(fetchStudies, 2000); 
                }
            } else {
                const data = await res.json();
                throw new Error(data.error || "Gagal sinkronisasi");
            }
        } catch (error: any) {
            console.error("Sync error:", error);
            toast.error("Gagal Sinkronisasi", { description: error.message });
            if (!skipRefresh) fetchStudies(); // Reset view
        }
    }, [studies, fetchStudies]);

    const handleBulkSync = useCallback(async (studyIds: string[]) => {
        let idsToSync = studyIds;
        
        // If no IDs provided, sync all that are NOT SUCCESS
        if (studyIds.length === 0) {
            idsToSync = studies
                .filter(s => s.satuSehat.status !== "SUCCESS")
                .map(s => s.ID);
            
            if (idsToSync.length === 0) {
                toast.info("Semua data sudah terkirim (Status: Terkirim).");
                return;
            }
            toast.info(`Memulai sinkronisasi massal untuk SEMUA data yang belum terkirim (${idsToSync.length} pasien)...`);
        } else {
            toast.info(`Memulai sinkronisasi massal untuk ${idsToSync.length} pasien pilihan...`);
        }

        for (const studyId of idsToSync) {
             await handleBridgeSatuSehat(studyId, undefined, true);
        }

        // Refresh once at the end
        fetchStudies();
        
        toast.success("Sinkronisasi Massal Selesai", {
            description: `Selesai memproses ${idsToSync.length} pasien.`
        });
    }, [studies, handleBridgeSatuSehat, fetchStudies]);


    return {
        studies,
        loading,
        fetchStudies,
        handleBridgeSatuSehat,
        handleBulkSync,
        isBridgeDialogOpen, setIsBridgeDialogOpen,
        selectedStudyForBridge, openBridgeDialog,
        isErrorDialogOpen, setIsErrorDialogOpen,
        selectedStudyError, openErrorDialog
    };
}

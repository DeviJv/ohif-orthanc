"use client";

import React, { useEffect, useState, useCallback } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    Clock01Icon, 
    AlertCircleIcon, 
    CheckmarkCircle02Icon,
    RefreshIcon,
    ArrowDown01Icon,
    ArrowUp01Icon
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface WebhookLog {
    id: string;
    studyInstanceUid: string | null;
    patientName: string | null;
    status: string;
    message: string | null;
    errorDetail: any;
    createdAt: string;
}

export function WebhookMonitor() {
    const [logs, setLogs] = useState<WebhookLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchLogs = useCallback(async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch("/api/satusehat/webhook-logs");
            if (res.ok) {
                const data = await res.json();
                setLogs(data);
            }
        } catch (error) {
            console.error("Failed to fetch webhook logs:", error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchLogs();
        // Poll every 30 seconds if open
        const interval = setInterval(() => {
            if (isOpen) fetchLogs();
        }, 30000);
        return () => clearInterval(interval);
    }, [fetchLogs, isOpen]);

    return (
        <div className="w-full bg-slate-50/50 border rounded-xl overflow-hidden transition-all duration-300">
            <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 text-white rounded-lg">
                        <HugeiconsIcon icon={Clock01Icon} className="size-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Monitor Transmisi Gambar</h3>
                        <p className="text-xs text-muted-foreground">Aktifitas pengiriman DICOM ke infrastruktur Kemenkes.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn("h-8 w-8 transition-transform duration-300", isOpen ? "rotate-180" : "")}
                    >
                        <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
                    </Button>
                </div>
            </div>

            {isOpen && (
                <div className="p-4 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex justify-between items-center mb-4 border-t pt-4">
                        <div className="text-xs font-medium text-slate-500 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Live Monitoring Active
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 gap-2 text-xs"
                            onClick={(e) => {
                                e.stopPropagation();
                                fetchLogs();
                            }}
                            disabled={isRefreshing}
                        >
                            <HugeiconsIcon icon={RefreshIcon} className={cn("size-3", isRefreshing && "animate-spin")} />
                            Refresh
                        </Button>
                    </div>

                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} className="h-16 w-full rounded-lg" />
                            ))
                        ) : logs.length === 0 ? (
                            <div className="py-12 text-center text-slate-400 italic text-sm">
                                Belum ada aktivitas pengiriman gambar yang tercatat.
                            </div>
                        ) : (
                            logs.map((log) => (
                                <div 
                                    key={log.id} 
                                    className="p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                                >
                                    <div className={cn(
                                        "p-2 rounded-full shrink-0",
                                        log.status === "SUCCESS" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                    )}>
                                        <HugeiconsIcon 
                                            icon={log.status === "SUCCESS" ? CheckmarkCircle02Icon : AlertCircleIcon} 
                                            className="size-5" 
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="font-semibold text-sm text-slate-900 truncate">
                                                {log.patientName || "Pasien Tidak Diketahui"}
                                            </p>
                                            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap bg-slate-100 px-1.5 py-0.5 rounded">
                                                {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true, locale: id })}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                            {log.message || (log.status === "SUCCESS" ? "Transmisi berhasil diselesaikan." : "Gagal mengirim data DICOM.")}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2 overflow-x-auto hide-scrollbar">
                                            <code className="text-[10px] bg-slate-50 px-2 py-0.5 rounded text-slate-500 font-mono">
                                                UID: {log.studyInstanceUid?.substring(0, 15)}...
                                            </code>
                                            {log.errorDetail && (
                                                <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">
                                                    Error Ditemukan
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

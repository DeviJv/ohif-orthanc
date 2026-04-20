"use client";

import React, { useState, useEffect } from "react";
import { 
    Card, CardHeader, CardTitle, CardDescription, CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    ComputerTerminalIcon, 
    Link01Icon, 
    WifiIcon, 
    WifiOffIcon, 
    RefreshIcon,
    ActivityIcon
} from "@hugeicons/core-free-icons";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ModalityLog {
    id: string;
    aeTitle: string;
    ipAddress: string;
    event: "CONNECTED" | "DISCONNECTED";
    timestamp: string;
}

export default function DeviceConnectivityPage() {
    const [history, setHistory] = useState<ModalityLog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/modality/history");
            const data = await res.json();
            if (Array.isArray(data)) {
                setHistory(data);
            }
        } catch (error) {
            toast.error("Gagal memuat riwayat koneksi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
        // Auto refresh every 30 seconds
        const interval = setInterval(fetchHistory, 30000);
        return () => clearInterval(interval);
    }, []);

    const activeDevices = history.reduce((acc, log) => {
        if (!acc[log.aeTitle]) {
            acc[log.aeTitle] = log;
        } else {
            // Keep the latest status
            const existing = acc[log.aeTitle];
            if (new Date(log.timestamp) > new Date(existing.timestamp)) {
                acc[log.aeTitle] = log;
            }
        }
        return acc;
    }, {} as Record<string, ModalityLog>);

    const deviceList = Object.values(activeDevices);

    return (
        <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-xl">
                            <HugeiconsIcon icon={ActivityIcon} className="size-6 text-primary dark:text-primary" strokeWidth={2.5} />
                        </div>
                        Device Connectivity
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Monitoring riwayat koneksi alat radiologi (Modalities) ke PACS server.
                    </p>
                </div>
                <Button 
                    variant="outline" 
                    className="gap-2 h-10 px-4 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={fetchHistory}
                    disabled={loading}
                >
                    <HugeiconsIcon icon={RefreshIcon} className={loading ? "animate-spin" : ""} strokeWidth={2} />
                    Refresh
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 shadow-sm border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-indigo-100/20 dark:shadow-none">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            <HugeiconsIcon icon={ComputerTerminalIcon} className="size-4 text-primary" />
                            Recent Modality Status
                        </CardTitle>
                        <CardDescription>Status terakhir alat yang pernah terhubung.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} className="h-16 w-full rounded-xl" />
                            ))
                        ) : deviceList.length > 0 ? (
                            deviceList.sort((a,b) => a.aeTitle.localeCompare(b.aeTitle)).map((device) => (
                                <div key={device.aeTitle} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950/50 shadow-sm transition-all hover:border-primary/20">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${device.event === "CONNECTED" ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500"}`}>
                                            <HugeiconsIcon icon={device.event === "CONNECTED" ? WifiIcon : WifiOffIcon} className="size-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{device.aeTitle}</span>
                                            <span className="text-[10px] text-slate-400 font-mono">{device.ipAddress}</span>
                                        </div>
                                    </div>
                                    <Badge className={device.event === "CONNECTED" ? "bg-emerald-500 hover:bg-emerald-600 text-white border-none" : "bg-slate-500 text-white border-none"}>
                                        {device.event === "CONNECTED" ? "Online" : "Offline"}
                                    </Badge>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-slate-400 text-xs italic flex flex-col items-center gap-2">
                                <HugeiconsIcon icon={WifiOffIcon} className="size-8 opacity-20" />
                                Belum ada data alat terhubung.
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 shadow-sm border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            <HugeiconsIcon icon={Link01Icon} className="size-4 text-primary" />
                            Connectivity History
                        </CardTitle>
                        <CardDescription>Log aktivitas koneksi DICOM Association otomatis.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950/20">
                            <Table>
                                <TableHeader className="bg-slate-50/50 dark:bg-slate-800/80">
                                    <TableRow className="border-slate-200 dark:border-slate-800">
                                        <TableHead className="font-bold text-slate-600 dark:text-slate-400">Modality (AET)</TableHead>
                                        <TableHead className="font-bold text-slate-600 dark:text-slate-400">IP Address</TableHead>
                                        <TableHead className="font-bold text-slate-600 dark:text-slate-400">Event</TableHead>
                                        <TableHead className="font-bold text-slate-600 dark:text-slate-400">Timestamp</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        Array.from({ length: 5 }).map((_, i) => (
                                            <TableRow key={i}>
                                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                            </TableRow>
                                        ))
                                    ) : history.length > 0 ? (
                                        history.map((log) => (
                                            <TableRow key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors border-slate-100 dark:border-slate-800">
                                                <TableCell className="font-bold text-slate-900 dark:text-slate-100">{log.aeTitle}</TableCell>
                                                <TableCell className="font-mono text-[11px] text-slate-500">{log.ipAddress}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className={
                                                        log.event === "CONNECTED" 
                                                            ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400" 
                                                            : "border-rose-500/50 bg-rose-500/5 text-rose-600 dark:text-rose-400"
                                                    }>
                                                        {log.event}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-[11px] text-slate-500">
                                                    {format(new Date(log.timestamp), "d MMM yyyy, HH:mm:ss", { locale: id })}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-32 text-center text-slate-400 italic text-sm">
                                                Belum ada riwayat koneksi.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

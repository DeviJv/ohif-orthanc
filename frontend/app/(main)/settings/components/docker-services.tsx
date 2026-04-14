"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
    Card, CardHeader, CardTitle, CardDescription, CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    CpuIcon, 
    RefreshIcon, 
    PlayIcon, 
    StopIcon, 
    InformationCircleIcon,
    CheckmarkCircle02Icon,
    AlertCircleIcon,
    ViewIcon
} from "@hugeicons/core-free-icons";

import { toast } from "sonner";


interface Container {
    ID: string;
    Names: string;
    State: string;
    Status: string;
    Image: string;
    isProtected: boolean;
}

export function DockerServices() {
    const [containers, setContainers] = useState<Container[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
    const [selectedLogs, setSelectedLogs] = useState<{ name: string; content: string } | null>(null);
    const [isLogsLoading, setIsLogsLoading] = useState(false);

    const fetchContainers = useCallback(async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const res = await fetch("/api/system/docker");
            const data = await res.json();
            if (data.containers) {
                setContainers(data.containers);
            } else if (data.error) {
                toast.error(`Gagal memuat container: ${data.error}`);
            }
        } catch (error) {
            toast.error("Terjadi kesalahan sistem saat mengambil data Docker.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContainers();
        const interval = setInterval(() => fetchContainers(true), 10000); // Polling setiap 10 detik
        return () => clearInterval(interval);
    }, [fetchContainers]);

    const handleAction = async (id: string, name: string, action: "start" | "stop" | "restart") => {
        setIsActionLoading(`${id}-${action}`);
        try {
            const res = await fetch("/api/system/docker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ containerId: id, containerName: name, action }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(`Berhasil: ${name} telah di-${action}`);
                setTimeout(() => fetchContainers(true), 2000);
            } else {
                toast.error(data.error || `Gagal melakukan ${action}`);
            }
        } catch (error) {
            toast.error("Gagal menghubungi Docker API.");
        } finally {
            setIsActionLoading(null);
        }
    };

    const fetchLogs = async (id: string, name: string) => {
        setIsLogsLoading(true);
        setSelectedLogs({ name, content: "Memuat logs..." });
        try {
            const res = await fetch(`/api/system/docker?action=logs&id=${id}`);
            const data = await res.json();
            if (data.logs) {
                setSelectedLogs({ name, content: data.logs });
            } else {
                toast.error("Gagal mengambil logs");
            }
        } catch (error) {
            toast.error("Kesalahan saat mengambil logs");
        } finally {
            setIsLogsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card className="border-2 border-slate-200/60 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-900 rounded-lg text-white shadow-lg shadow-slate-900/20">
                                <HugeiconsIcon icon={CpuIcon} className="size-5" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Layanan Server (Docker)</CardTitle>
                                <CardDescription>Pantau dan kelola kontainer yang berjalan di sistem.</CardDescription>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => fetchContainers()} 
                            disabled={isLoading}
                            className="gap-2"
                        >
                            <HugeiconsIcon icon={RefreshIcon} className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/30">
                                <TableHead className="w-[200px] font-bold text-slate-500 uppercase text-[10px] tracking-widest pl-6">Layanan</TableHead>
                                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Status</TableHead>
                                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Waktu Aktif</TableHead>
                                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Image</TableHead>
                                <TableHead className="text-right font-bold text-slate-500 uppercase text-[10px] tracking-widest pr-6">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading && containers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-slate-400 italic">
                                        <div className="flex flex-col items-center gap-2">
                                            <HugeiconsIcon icon={RefreshIcon} className="size-6 animate-spin" />
                                            <span>Menghubungkan ke Docker Engine...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : containers.map((container) => (
                                <TableRow key={container.ID} className="hover:bg-slate-50/50 transition-colors">

                                    <TableCell className="font-medium pl-6">
                                        <div className="flex flex-col">
                                            <span className="text-slate-900">{container.Names}</span>
                                            <span className="text-[10px] text-slate-400 font-mono">{container.ID}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant="outline" 
                                            className={
                                                container.State === "running" 
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                                                    : "bg-rose-50 text-rose-700 border-rose-100"
                                            }
                                        >
                                            <div className="flex items-center gap-1.5 uppercase text-[10px] font-bold">
                                                <div className={`size-1.5 rounded-full ${container.State === "running" ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                                {container.State}
                                            </div>
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-600 font-mono">
                                        {container.Status}
                                    </TableCell>
                                    <TableCell className="text-[10px] text-slate-400 max-w-[150px] truncate">
                                        {container.Image}
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5"
                                                onClick={() => fetchLogs(container.ID, container.Names)}
                                                title="View Logs"
                                            >
                                                <HugeiconsIcon icon={ViewIcon} className="size-4" />
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                                onClick={() => handleAction(container.ID, container.Names, "restart")}
                                                disabled={!!isActionLoading || container.isProtected}
                                                title={container.isProtected ? "System Protected" : "Restart"}
                                            >
                                                <HugeiconsIcon 
                                                    icon={RefreshIcon} 
                                                    className={`size-4 ${isActionLoading === `${container.ID}-restart` ? 'animate-spin text-indigo-600' : ''}`} 
                                                />
                                            </Button>

                                            {container.State === "running" ? (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                                    onClick={() => handleAction(container.ID, container.Names, "stop")}
                                                    disabled={!!isActionLoading || container.isProtected}
                                                    title={container.isProtected ? "System Protected" : "Stop"}
                                                >
                                                    <HugeiconsIcon 
                                                        icon={StopIcon} 
                                                        className={`size-4 ${isActionLoading === `${container.ID}-stop` ? 'animate-pulse text-rose-600' : ''}`} 
                                                    />
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                                                    onClick={() => handleAction(container.ID, container.Names, "start")}
                                                    disabled={!!isActionLoading}
                                                    title="Start"
                                                >
                                                    <HugeiconsIcon 
                                                        icon={PlayIcon} 
                                                        className={`size-4 ${isActionLoading === `${container.ID}-start` ? 'animate-pulse text-emerald-600' : ''}`} 
                                                    />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-blue-900">
                <HugeiconsIcon icon={InformationCircleIcon} className="size-5 shrink-0 text-blue-600" />
                <div className="text-xs space-y-1">
                    <p className="font-bold">Keamanan Sistem:</p>
                    <p className="text-blue-800/80">Container utama seperti <strong>pacs-web</strong> dan <strong>pacs-gateway</strong> tidak dapat di-stop atau di-restart melalui UI untuk menjaga ketersediaan sistem.</p>
                </div>
            </div>

            {/* Log Viewer Dialog */}
            <Dialog open={!!selectedLogs} onOpenChange={(open) => !open && setSelectedLogs(null)}>
                <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col p-6 overflow-hidden">
                    <DialogHeader className="pb-4 border-b">
                        <DialogTitle className="flex items-center gap-2">
                            <HugeiconsIcon icon={InformationCircleIcon} className="size-5 text-primary" />
                            Docker Logs: {selectedLogs?.name}
                        </DialogTitle>

                        <DialogDescription>
                            Menampilkan 100 baris terakhir dari log container.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex-1 bg-slate-950 p-4 rounded-lg mt-4 font-mono text-[11px] leading-relaxed text-slate-300 overflow-auto min-h-[300px]">
                        {isLogsLoading ? (
                            <div className="flex items-center justify-center py-20 text-slate-500">
                                <HugeiconsIcon icon={RefreshIcon} className="size-6 animate-spin mr-2" />
                                Memuat logs...
                            </div>

                        ) : (
                            <pre className="whitespace-pre-wrap break-all">
                                {selectedLogs?.content || "Tidak ada log yang tersedia."}
                            </pre>
                        )}
                    </div>


                    <DialogFooter className="pt-4 border-t mt-4">
                        <Button 
                            variant="secondary" 
                            onClick={() => selectedLogs && fetchLogs(containers.find(c => c.Names === selectedLogs.name)?.ID || "", selectedLogs.name)}
                            disabled={isLogsLoading}
                            className="gap-2"
                        >
                            <HugeiconsIcon icon={RefreshIcon} className={`size-4 ${isLogsLoading ? 'animate-spin' : ''}`} />
                            Refresh Logs
                        </Button>
                        <Button onClick={() => setSelectedLogs(null)}>Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

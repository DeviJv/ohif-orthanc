"use client";

import React, { useMemo } from "react";
import { MergedStudy } from "../hooks/use-satusehat-worklist";
import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    SentIcon, 
    Alert01Icon, 
    HourglassIcon,
    DatabaseIcon
} from "@hugeicons/core-free-icons";

interface SatuSehatStatsProps {
    studies: MergedStudy[];
}

export function SatuSehatStats({ studies }: SatuSehatStatsProps) {
    const stats = useMemo(() => {
        let sent = 0;
        let pending = 0;
        let failed = 0;

        studies.forEach(study => {
            const status = study.satuSehat?.status;
            if (status === "SUCCESS") {
                sent++;
            } else if (status === "FAILED") {
                failed++;
            } else {
                pending++;
            }
        });

        return { 
            sent, 
            pending, 
            failed, 
            total: studies.length,
            sentPct: studies.length ? Math.round((sent / studies.length) * 100) : 0,
            pendingPct: studies.length ? Math.round((pending / studies.length) * 100) : 0,
            failedPct: studies.length ? Math.round((failed / studies.length) * 100) : 0,
        };
    }, [studies]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            <Card className="bg-transparent border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Data</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.total}</h3>
                        </div>
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                            <HugeiconsIcon icon={DatabaseIcon} className="size-6 text-slate-600 dark:text-slate-400" />
                        </div>
                    </div>
                    <div className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 dark:bg-slate-600 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500 dark:bg-slate-400"></span>
                        </span>
                        Sistem PACS Live
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-transparent border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Terkirim</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.sent}</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center">
                            <HugeiconsIcon icon={SentIcon} className="size-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5 mt-auto">
                        <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            <span>Persentase</span>
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">{stats.sentPct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${stats.sentPct}%` }}></div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-transparent border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Pending</p>
                            <h3 className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.pending}</h3>
                        </div>
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-full flex items-center justify-center">
                            <HugeiconsIcon icon={HourglassIcon} className="size-6 text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5 mt-auto">
                        <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            <span>Menunggu Antrean</span>
                            <span className="text-amber-700 dark:text-amber-400 font-bold">{stats.pendingPct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full transition-all duration-500" style={{ width: `${stats.pendingPct}%` }}></div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-transparent border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-rose-500 dark:text-rose-400 mb-1">Gagal</p>
                            <h3 className="text-3xl font-bold text-rose-600 dark:text-rose-400">{stats.failed}</h3>
                        </div>
                        <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-full flex items-center justify-center">
                            <HugeiconsIcon icon={Alert01Icon} className="size-6 text-rose-600 dark:text-rose-400" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5 mt-auto">
                        <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            <span>Error Transmisi</span>
                            <span className="text-rose-700 dark:text-rose-400 font-bold">{stats.failedPct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-rose-400 to-rose-600 h-full rounded-full transition-all duration-500" style={{ width: `${stats.failedPct}%` }}></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

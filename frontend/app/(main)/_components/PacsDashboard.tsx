"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    DashboardCircleIcon, 
    UserIcon, 
    Database01Icon, 
    Files01Icon, 
    Clock01Icon,
    ArrowRight01Icon,
    ActivityIcon,
    Folder01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDicomDate } from "../worklist/utils/format";

interface DashboardStats {
    summary: {
        totalStudies: number;
        totalPatients: number;
        studiesToday: number;
        diskSize: number;
    };
    modalities: Record<string, number>;
    recentActivity: Array<{
        id: string;
        patientName: string;
        studyDate: string;
        modality: string;
        lastUpdate: string;
    }>;
}

export function PacsDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const response = await fetch("/api/stats");
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 60000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <DashboardLoading />;
    }

    const modalityColors: Record<string, string> = {
        CT: "bg-blue-500",
        MR: "bg-purple-500",
        DX: "bg-green-500",
        CR: "bg-emerald-500",
        US: "bg-pink-500",
        MG: "bg-orange-500",
        XA: "bg-red-500",
        OTHER: "bg-slate-400"
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Quick Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="Total Studies" 
                    value={stats?.summary.totalStudies || 0} 
                    icon={Files01Icon} 
                    trend="+12% from last month"
                    color="text-blue-600 dark:text-blue-400"
                    bgColor="bg-blue-50 dark:bg-blue-950/30"
                />
                <StatCard 
                    title="Total Patients" 
                    value={stats?.summary.totalPatients || 0} 
                    icon={UserIcon} 
                    trend="New patients today"
                    color="text-purple-600 dark:text-purple-400"
                    bgColor="bg-purple-50 dark:bg-purple-950/30"
                />
                <StatCard 
                    title="Studies Today" 
                    value={stats?.summary.studiesToday || 0} 
                    icon={ActivityIcon} 
                    trend="Active examination"
                    color="text-green-600 dark:text-green-400"
                    bgColor="bg-green-50 dark:bg-green-950/30"
                    highlight
                />
                <StatCard 
                    title="Storage Used" 
                    value={`${stats?.summary.diskSize || 0} MB`} 
                    icon={Database01Icon} 
                    trend="Cloud Orthanc Storage"
                    color="text-slate-600 dark:text-slate-400"
                    bgColor="bg-slate-50 dark:bg-slate-900/50"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Modality Distribution */}
                <Card className="lg:col-span-4 border border-slate-200/60 dark:border-slate-800 shadow-2xl shadow-slate-200/40 dark:shadow-none rounded-[2.5rem] overflow-hidden group bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl">
                                    <HugeiconsIcon icon={DashboardCircleIcon} className="size-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-black tracking-tight dark:text-slate-100">Modality Units</CardTitle>
                                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">Distribusi volume data berdasarkan modalitas.</p>
                                </div>
                            </div>
                            <Button variant="outline" size="icon" className="size-10 rounded-xl border-slate-200 dark:border-slate-800 shadow-sm opacity-0 group-hover:opacity-100 transition-all dark:bg-slate-800 dark:hover:bg-slate-700">
                                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="flex flex-col xl:flex-row items-center justify-between gap-12">
                            <div className="relative size-64 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-[20px] border-slate-50 dark:border-slate-800/50 shadow-inner" />
                                <div className="z-10 text-center">
                                    <span className="block text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter leading-none">{stats?.summary.totalStudies}</span>
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2 block">Dicom Total</span>
                                </div>
                                <svg className="absolute inset-0 size-full -rotate-90">
                                    <circle
                                        cx="128" cy="128" r="110"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="16"
                                        strokeDasharray={`${(0.65 * 691)} 691`}
                                        className="text-primary/90 drop-shadow-md"
                                        strokeLinecap="round"
                                    />
                                    <circle
                                        cx="128" cy="128" r="110"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="16"
                                        strokeDasharray={`${(0.25 * 691)} 691`}
                                        strokeDashoffset={`${-(0.65 * 691)}`}
                                        className="text-purple-400 drop-shadow-md"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            <div className="flex-1 w-full space-y-5">
                                {Object.entries(stats?.modalities || {}).map(([name, count]) => (
                                    <div key={name} className="flex flex-col gap-2 group/item">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`size-2.5 rounded-full ${modalityColors[name] || modalityColors.OTHER} shadow-lg`} />
                                                <span className="text-xs font-black text-slate-700 dark:text-slate-300 tracking-wider uppercase">{name}</span>
                                            </div>
                                            <span className="text-sm font-black text-slate-900 dark:text-slate-100">{count} <span className="text-[11px] text-slate-400 font-bold ml-1">Studies</span></span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${modalityColors[name] || modalityColors.OTHER} transition-all duration-1000 ease-out shadow-sm`} 
                                                style={{ width: `${(count / (stats?.summary.totalStudies || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {Object.keys(stats?.modalities || {}).length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-6 text-slate-300 dark:text-slate-700">
                                        <HugeiconsIcon icon={Files01Icon} className="size-12 mb-2" />
                                        <p className="text-xs font-bold italic uppercase tracking-widest">No modalities found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="lg:col-span-3 border border-slate-200/60 dark:border-slate-800 shadow-2xl shadow-slate-200/40 dark:shadow-none rounded-[2.5rem] overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-8">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-blue-500/10 rounded-xl">
                                <HugeiconsIcon icon={Clock01Icon} className="size-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black tracking-tight dark:text-slate-100">Recent Activity</CardTitle>
                                <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">Studi terbaru yang diterima sistem.</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-50 dark:divide-slate-800">
                            {stats?.recentActivity.map((activity) => (
                                <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group">
                                    <div className="flex items-center gap-5">
                                        <div className="size-12 rounded-[1.25rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                                            <HugeiconsIcon icon={Folder01Icon} className="size-5 text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{activity.patientName}</span>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline" className="text-[10px] font-black h-4 px-1.5 rounded uppercase border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500">
                                                    {activity.modality}
                                                </Badge>
                                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-tighter">
                                                    {formatDicomDate(activity.studyDate)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href={`/worklist`}>
                                        <Button variant="outline" size="icon" className="size-9 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white hover:border-primary border-slate-200 dark:border-slate-700 shadow-sm dark:bg-slate-800">
                                            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                            {stats?.recentActivity.length === 0 && (
                                <div className="p-16 text-center flex flex-col items-center gap-4">
                                    <HugeiconsIcon icon={Files01Icon} className="size-16 text-slate-100 dark:text-slate-800" />
                                    <p className="text-xs font-black uppercase text-slate-400 dark:text-slate-600 tracking-widest">No Recent Studies</p>
                                </div>
                            )}
                        </div>
                        {stats?.recentActivity.length ? (
                            <div className="p-6 bg-slate-50/30 dark:bg-slate-900/30 border-t border-slate-50 dark:border-slate-800">
                                <Link href="/worklist" className="w-full block">
                                    <Button variant="ghost" className="w-full text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest hover:text-primary hover:bg-transparent">
                                        View Worklist
                                        <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, trend, color, bgColor, highlight = false }: any) {
    return (
        <Card className={cn(
            "border border-slate-200/60 dark:border-slate-800 shadow-2xl shadow-slate-200/40 dark:shadow-none rounded-[2rem] overflow-hidden hover:scale-[1.02] transition-all duration-500 bg-white dark:bg-slate-900 group",
            highlight && "border-primary/20 ring-1 ring-primary/5 shadow-primary/10"
        )}>
            <CardContent className="p-8">
                <div className="flex items-start justify-between">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">{title}</p>
                            <h3 className={cn(
                                "text-4xl font-black tracking-tight leading-none transition-colors",
                                highlight ? 'text-primary' : 'text-slate-900 dark:text-slate-100 group-hover:text-primary/70'
                            )}>{value}</h3>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-2 uppercase tracking-tighter bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full w-fit group-hover:bg-primary group-hover:text-white transition-all">
                            <span className={cn("size-1.5 rounded-full", highlight ? "bg-primary animate-pulse" : "bg-slate-300 dark:bg-slate-700")} />
                            {trend}
                        </p>
                    </div>
                    <div className={cn(
                        "p-4 rounded-[1.25rem] shadow-lg transition-transform duration-500 group-hover:rotate-12",
                        bgColor, color
                    )}>
                        <HugeiconsIcon icon={Icon} className="size-7" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function DashboardLoading() {
    return (
        <div className="flex flex-col gap-8 py-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-3xl" />)}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Skeleton className="lg:col-span-4 h-96 rounded-3xl" />
                <Skeleton className="lg:col-span-3 h-96 rounded-3xl" />
            </div>
        </div>
    );
}

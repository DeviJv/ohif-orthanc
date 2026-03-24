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
import { formatDicomDate } from "./worklist/utils/format";

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

export default function DashboardPage() {
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
        // Refresh every minute
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
        <div className="flex flex-col gap-8 p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex items-end justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">
                        Dashboard <span className="text-primary text-xl ml-2 font-bold bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">Quantum PACS</span>
                    </h1>
                    <p className="text-muted-foreground font-medium">Monitoring performa sistem dan volume data radiologi secara real-time.</p>
                </div>
                <div className="hidden md:block">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 bg-slate-100/80 px-4 py-2 rounded-xl border border-slate-200/60 shadow-sm">
                        <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                        System Online: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="Total Studies" 
                    value={stats?.summary.totalStudies || 0} 
                    icon={Files01Icon} 
                    trend="+12% from last month"
                    color="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <StatCard 
                    title="Total Patients" 
                    value={stats?.summary.totalPatients || 0} 
                    icon={UserIcon} 
                    trend="New patients today"
                    color="text-purple-600"
                    bgColor="bg-purple-50"
                />
                <StatCard 
                    title="Studies Today" 
                    value={stats?.summary.studiesToday || 0} 
                    icon={ActivityIcon} 
                    trend="Active examination"
                    color="text-green-600"
                    bgColor="bg-green-50"
                    highlight
                />
                <StatCard 
                    title="Storage Used" 
                    value={`${stats?.summary.diskSize || 0} MB`} 
                    icon={Database01Icon} 
                    trend="Cloud Orthanc Storage"
                    color="text-slate-600"
                    bgColor="bg-slate-50"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Modality Distribution */}
                <Card className="lg:col-span-4 border-2 border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl overflow-hidden group">
                    <CardHeader className="border-b border-slate-50 bg-slate-50/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <HugeiconsIcon icon={DashboardCircleIcon} className="size-5 text-primary" />
                                </div>
                                <CardTitle className="text-xl font-bold">Modality Distribution</CardTitle>
                            </div>
                            <Button variant="ghost" size="sm" className="text-slate-400 group-hover:text-primary transition-colors">
                                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            {/* Simple Visual Chart (CSS Based) */}
                            <div className="relative size-64 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-[16px] border-slate-100" />
                                <div className="z-10 text-center">
                                    <span className="block text-4xl font-black text-slate-800">{stats?.summary.totalStudies}</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Dicom</span>
                                </div>
                                {/* Modality Rings Overlay Simulation */}
                                <svg className="absolute inset-0 size-full -rotate-90">
                                    <circle
                                        cx="128" cy="128" r="112"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="16"
                                        strokeDasharray={`${(0.65 * 703)} 703`}
                                        className="text-primary/80"
                                    />
                                    <circle
                                        cx="128" cy="128" r="112"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="16"
                                        strokeDasharray={`${(0.25 * 703)} 703`}
                                        strokeDashoffset={`${-(0.65 * 703)}`}
                                        className="text-purple-400"
                                    />
                                </svg>
                            </div>

                            {/* Legend */}
                            <div className="flex-1 w-full space-y-4">
                                {Object.entries(stats?.modalities || {}).map(([name, count]) => (
                                    <div key={name} className="flex items-center justify-between group/item">
                                        <div className="flex items-center gap-3">
                                            <div className={`size-3 rounded-full ${modalityColors[name] || modalityColors.OTHER} shadow-sm shadow-black/10`} />
                                            <span className="font-bold text-slate-700">{name}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden hidden xl:block">
                                                <div 
                                                    className={`h-full ${modalityColors[name] || modalityColors.OTHER}`} 
                                                    style={{ width: `${(count / (stats?.summary.totalStudies || 1)) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-black text-slate-900 w-8 text-right">{count}</span>
                                        </div>
                                    </div>
                                ))}
                                {Object.keys(stats?.modalities || {}).length === 0 && (
                                    <p className="text-slate-400 text-center py-8 font-medium italic">Belum ada data modalitas terdeteksi.</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="lg:col-span-3 border-2 border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl overflow-hidden">
                    <CardHeader className="border-b border-slate-50 bg-slate-50/30">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <HugeiconsIcon icon={Clock01Icon} className="size-5 text-blue-600" />
                            </div>
                            <CardTitle className="text-xl font-bold">Recent Studies</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {stats?.recentActivity.map((activity, idx) => (
                                <div key={activity.id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="size-11 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                            <HugeiconsIcon icon={Folder01Icon} className="size-5 text-slate-400 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 line-clamp-1">{activity.patientName}</span>
                                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">
                                                {activity.modality} • {formatDicomDate(activity.studyDate)}
                                            </span>
                                        </div>
                                    </div>
                                    <Link href={`/worklist`}>
                                        <Button variant="ghost" size="icon" className="size-9 rounded-xl opacity-0 group-hover:opacity-100 transition-all text-primary hover:bg-primary/10">
                                            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                            {stats?.recentActivity.length === 0 && (
                                <div className="p-12 text-center flex flex-col items-center gap-3">
                                    <HugeiconsIcon icon={Files01Icon} className="size-12 text-slate-200" />
                                    <p className="text-slate-400 font-medium">Tidak ada aktivitas terbaru.</p>
                                </div>
                            )}
                        </div>
                        {stats?.recentActivity.length ? (
                            <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                                <Link href="/worklist">
                                    <Button variant="ghost" className="w-full text-slate-500 font-bold hover:text-primary hover:bg-transparent">
                                        View All Worklist
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
        <Card className={`border-2 ${highlight ? 'border-primary/20 shadow-primary/10' : 'border-slate-100 shadow-slate-200/40'} shadow-lg rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-300`}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
                        <h3 className={`text-3xl font-black ${highlight ? 'text-primary' : 'text-slate-900'}`}>{value}</h3>
                        <p className="text-[11px] font-bold text-slate-500 mt-2 flex items-center gap-1.5 uppercase tracking-tighter">
                            <span className="size-1.5 rounded-full bg-slate-200" />
                            {trend}
                        </p>
                    </div>
                    <div className={`p-3.5 rounded-2xl ${bgColor} ${color} shadow-sm`}>
                        <HugeiconsIcon icon={Icon} className="size-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function DashboardLoading() {
    return (
        <div className="flex flex-col gap-8 p-8 max-w-[1600px] mx-auto">
            <div className="space-y-2">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-4 w-[400px]" />
            </div>
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

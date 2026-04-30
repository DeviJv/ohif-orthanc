"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
    ActivityIcon, 
    ArrowRight01Icon, 
    Calendar03Icon,
    CheckListIcon,
    Database01Icon,
    DashboardCircleIcon,
    InformationCircleIcon,
    Search01Icon,
    Download01Icon,
    Clock01Icon,
    Cancel01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { FloatingSatuSehatExportProgress } from "./floating-satusehat-export-progress";

interface SatuSehatStats {
    summary: Record<string, number>;
    logs: Array<{
        id: string;
        resourceType: string;
        resourceId: string;
        accessionNumber: string;
        method: string;
        status: string;
        responseCode: number;
        createdAt: string;
    }>;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    orgId: string;
    environment: string;
}

export function SatuSehatDashboard() {
    const [stats, setStats] = useState<SatuSehatStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [environment, setEnvironment] = useState<string>("staging");
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(new Date().setDate(new Date().getDate() - 30)),
        to: new Date()
    });
    const [activeSubTab, setActiveSubTab] = useState("summary");

    const defaultDateRange = {
        from: new Date(new Date().setDate(new Date().getDate() - 30)),
        to: new Date()
    };

    const handleResetFilters = () => {
        setDateRange(defaultDateRange);
        setEnvironment("staging");
        setPage(1);
        toast.info("Filter telah direset");
    };

    const handleExportCSV = async () => {
        try {
            const res = await fetch("/api/stats/satusehat/export", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    filters: {
                        startDate: dateRange?.from?.toISOString(),
                        endDate: dateRange?.to?.toISOString(),
                        environment
                    }
                }),
            });
            if (res.ok) {
                toast.success("Proses export dimulai", {
                    description: "Data sedang disiapkan di latar belakang."
                });
            } else {
                throw new Error("Gagal memulai export");
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Gagal memulai export");
        }
    };

    const fetchStats = async (currentPage = 1) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (dateRange?.from) params.append("startDate", dateRange.from.toISOString());
            if (dateRange?.to) params.append("endDate", dateRange.to.toISOString());
            params.append("environment", environment);
            params.append("page", currentPage.toString());
            params.append("limit", "15"); // Use a fixed limit for now

            const response = await fetch(`/api/stats/satusehat?${params.toString()}`);
            if (response.ok) {
                const data = await response.json();
                setStats(data);
                
                // Reset to page 1 if we changed filters and no data on current page
                if (data.pagination && currentPage > data.pagination.totalPages && data.pagination.totalPages > 0) {
                    setPage(1);
                    fetchStats(1);
                }
            }
        } catch (error) {
            console.error("Failed to fetch SatuSehat stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBackfill = async () => {
        const promise = fetch("/api/stats/satusehat?backfill=true").then(r => r.json());
        toast.promise(promise, {
            loading: "Migrasi data lama...",
            success: (data) => {
                fetchStats();
                return `Berhasil migrasi ${data.backfilledCount} data transaksi.`;
            },
            error: "Gagal migrasi data."
        });
    };

    useEffect(() => {
        setPage(1);
        fetchStats(1);
    }, [dateRange, environment]);

    if (loading && !stats) {
        return <SatuSehatLoading />;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Unified Toolbar */}
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 rounded-[2rem] p-4 shadow-xl shadow-slate-200/30 dark:shadow-none flex flex-col xl:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-700 w-full md:w-auto overflow-x-auto no-scrollbar">
                        <button 
                            onClick={() => setEnvironment("staging")}
                            className={cn(
                                "flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap",
                                environment === "staging" ? "bg-white dark:bg-slate-900 text-primary shadow-lg shadow-primary/5" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                            )}
                        >
                            <div className={cn("size-2 rounded-full", environment === "staging" ? "bg-primary animate-pulse" : "bg-slate-300 dark:bg-slate-600")} />
                            STAGING
                        </button>
                        <button 
                            onClick={() => setEnvironment("production")}
                            className={cn(
                                "flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap",
                                environment === "production" ? "bg-white dark:bg-slate-900 text-amber-600 shadow-lg shadow-amber-600/5" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                            )}
                        >
                            <div className={cn("size-2 rounded-full", environment === "production" ? "bg-amber-500 animate-pulse" : "bg-slate-300 dark:bg-slate-600")} />
                            PRODUCTION
                        </button>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Organization ID</p>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">{stats?.orgId || "---"}</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto">
                    <div className="w-full md:w-auto">
                        <DateRangePicker range={dateRange} setRange={setDateRange} />
                    </div>
                    
                    {dateRange && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleResetFilters}
                            className="h-10 w-10 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                            title="Reset All Filters"
                        >
                            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
                        </Button>
                    )}
                    
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
                    
                    <div className="flex gap-2 w-full md:w-auto justify-end">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleExportCSV}
                            className="flex-1 md:flex-none h-10 px-4 rounded-xl text-[11px] font-black uppercase tracking-wider border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-slate-900 hover:text-white dark:hover:text-slate-100 hover:border-slate-900 dark:bg-slate-900 dark:text-slate-300"
                        >
                            <HugeiconsIcon icon={Download01Icon} className="size-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="flex justify-center mb-8">
                    <div className="flex bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-[1.25rem] border border-slate-200/30 dark:border-slate-800 w-fit max-w-full overflow-x-auto no-scrollbar">
                        <button 
                            onClick={() => setActiveSubTab("summary")}
                            className={cn(
                                "flex items-center gap-2 px-8 py-2.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap",
                                activeSubTab === "summary" ? "bg-white dark:bg-slate-900 text-primary shadow-xl shadow-primary/10" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                            )}
                        >
                            <HugeiconsIcon icon={DashboardCircleIcon} className="size-3.5" />
                            RINGKASAN TRANSAKSI
                        </button>
                        <button 
                            onClick={() => setActiveSubTab("logs")}
                            className={cn(
                                "flex items-center gap-2 px-8 py-2.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap",
                                activeSubTab === "logs" ? "bg-white dark:bg-slate-900 text-primary shadow-xl shadow-primary/10" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                            )}
                        >
                            <HugeiconsIcon icon={CheckListIcon} className="size-3.5" />
                            AKTIVITAS REAL-TIME
                        </button>
                    </div>
                </div>

                <div className="w-full">
                    {activeSubTab === "summary" && (
                        <div className="space-y-8 mt-0 border-none p-0 outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {/* Info Alert - Slimmer version */}
                    <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-[2rem] p-6 shadow-2xl flex flex-col md:flex-row gap-6 items-center">
                        <div className="bg-primary shadow-lg shadow-primary/20 p-4 rounded-2xl">
                            <HugeiconsIcon icon={InformationCircleIcon} className="size-6 text-white" strokeWidth={3} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-sm font-black uppercase tracking-widest text-primary-foreground/90">Insight Hari Ini</h4>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium leading-relaxed max-w-2xl">
                                Kami memantau pengiriman data fhir ke <span className="text-white font-bold">Kementerian Kesehatan (SATUSEHAT)</span>. 
                                Data yang ditampilkan mencakup transaksi sukses per-resource dengan filter periode terpilih.
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:items-end border-l border-slate-700 dark:border-slate-800 pl-6 hidden lg:flex">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Transaksi</p>
                            <p className="text-2xl font-black text-white dark:text-slate-100">{Object.values(stats?.summary || {}).reduce((a, b) => a + b, 0)}</p>
                        </div>
                    </div>



                    {/* Summary Cards Grid - More refined */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {Object.entries(stats?.summary || {}).map(([type, count]) => (
                            <div 
                                key={type} 
                                className="group relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="absolute top-4 right-4 text-xs font-black text-slate-100 dark:text-slate-800 group-hover:text-primary/10 transition-colors uppercase">
                                    {type.substring(0, 3)}
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors mb-4">{type}</p>
                                <div className="flex items-end justify-between">
                                    <h3 className={cn(
                                        "text-4xl font-black tracking-tight",
                                        count > 0 ? "text-slate-900 dark:text-slate-100" : "text-slate-200 dark:text-slate-800"
                                    )}>
                                        {count > 0 ? count : "0"}
                                    </h3>
                                    {count > 0 && (
                                        <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 p-1.5 rounded-lg">
                                            <HugeiconsIcon icon={ActivityIcon} className="size-3.5" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                        </div>
                    )}

                    {activeSubTab === "logs" && (
                        <div className="mt-0 border-none p-0 outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Card className="border border-slate-200/60 dark:border-slate-800 shadow-2xl shadow-slate-200/40 dark:shadow-none rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900/50 backdrop-blur-sm">
                        <CardHeader className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-xl">
                                            <HugeiconsIcon icon={Clock01Icon} className="size-5 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl font-black tracking-tight dark:text-slate-100">Activity Feeds</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-10">Real-time log transaksi per individu fhir resource.</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="h-6 px-3 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700">
                                        Showing {stats?.logs.length || 0} of {stats?.pagination?.total || 0} Records
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-slate-50/40 dark:bg-slate-800/40">
                                    <TableRow className="hover:bg-transparent border-none">
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 px-8 py-5 tracking-widest">Time & Date</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Resource Type</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Action</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Status</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Code</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 text-right pr-8 tracking-widest">Reference ID</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stats?.logs.map((log) => (
                                        <TableRow key={log.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all border-slate-50 dark:border-slate-800">
                                            <TableCell className="px-8 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{format(new Date(log.createdAt), "HH:mm:ss")}</span>
                                                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-tighter">{format(new Date(log.createdAt), "dd MMM yyyy")}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">{log.resourceType}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={cn(
                                                    "text-[10px] font-black px-2 py-1 rounded-md tracking-widest",
                                                    log.method === "POST" ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400" : "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400"
                                                )}>
                                                    {log.method}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("size-1.5 rounded-full shadow-sm", log.status === "SUCCESS" ? "bg-emerald-500 shadow-emerald-500/50" : "bg-red-500 shadow-red-500/50")} />
                                                    <span className={cn(
                                                        "text-xs font-bold",
                                                        log.status === "SUCCESS" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                                                    )}>
                                                        {log.status === "SUCCESS" ? "Success" : "Failed"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">{log.responseCode}</span>
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <span className="text-xs font-mono text-slate-300 dark:text-slate-600 transition-colors group-hover:text-slate-900 dark:group-hover:text-slate-100">{log.resourceId || "---"}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {stats?.logs.length === 0 && !loading && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-96 text-center">
                                                <div className="flex flex-col items-center justify-center gap-4">
                                                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-full">
                                                        <HugeiconsIcon icon={Search01Icon} className="size-16 text-slate-200 dark:text-slate-700" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">No Transactions Logged</p>
                                                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Try changing the date range or environment.</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {loading && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-32 text-center text-slate-400 italic font-medium">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <div className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <div className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                    <span className="ml-2 uppercase tracking-[0.2em] text-[10px] font-black">Refreshing Data...</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                            {/* Pagination Controls */}
                            {stats?.pagination && stats.pagination.totalPages > 1 && (
                                <div className="bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest leading-none">
                                        Page <span className="text-slate-900 dark:text-slate-100">{stats.pagination.page}</span> of <span className="text-slate-900 dark:text-slate-100">{stats.pagination.totalPages}</span> 
                                        <span className="mx-2 text-slate-200 dark:text-slate-800">•</span>
                                        Total <span className="text-slate-900 dark:text-slate-100">{stats.pagination.total}</span> entries
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-wider border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-white dark:hover:bg-slate-800 dark:bg-slate-900 dark:text-slate-300 disabled:opacity-30"
                                            onClick={() => {
                                                const newPage = page - 1;
                                                setPage(newPage);
                                                fetchStats(newPage);
                                            }}
                                            disabled={page <= 1 || loading}
                                        >
                                            Previous
                                        </Button>
                                        
                                        <div className="flex items-center gap-1">
                                            {[...Array(Math.min(5, stats.pagination.totalPages))].map((_, i) => {
                                                const pageNum = i + 1;
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => {
                                                            setPage(pageNum);
                                                            fetchStats(pageNum);
                                                        }}
                                                        disabled={loading}
                                                        className={cn(
                                                            "size-9 rounded-xl text-[10px] font-black transition-all flex items-center justify-center",
                                                            page === pageNum 
                                                                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                                                                : "text-slate-400 dark:text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                                                        )}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                            {stats.pagination.totalPages > 5 && (
                                                <span className="text-slate-300 text-xs px-1">...</span>
                                            )}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-wider border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-white dark:hover:bg-slate-800 dark:bg-slate-900 dark:text-slate-300 disabled:opacity-30"
                                            onClick={() => {
                                                const newPage = page + 1;
                                                setPage(newPage);
                                                fetchStats(newPage);
                                            }}
                                            disabled={page >= (stats.pagination?.totalPages || 1) || loading}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    </div>

            <div className="flex items-center justify-center gap-3 italic text-[10px] text-slate-400 dark:text-slate-500 font-bold bg-slate-50/50 dark:bg-slate-900/50 py-3 rounded-full border border-slate-100 dark:border-slate-800 mt-12">
                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Dihubungkan ke SATUSEHAT API • Terakhir diperbarui: {format(new Date(), "dd MMMM yyyy, HH:mm", { locale: id })} WIB
            </div>
            <FloatingSatuSehatExportProgress />
        </div>
    );

function DateRangePicker({ range, setRange }: { range: DateRange | undefined, setRange: (r: DateRange | undefined) => void }) {
    return (
        <Popover>
            <PopoverTrigger className={cn(
                buttonVariants({ variant: "outline" }),
                "h-10 w-full md:w-auto justify-start text-left font-bold text-xs bg-white dark:bg-slate-900 rounded-xl border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-100",
                !range && "text-muted-foreground"
            )}>
                <HugeiconsIcon icon={Calendar03Icon} className="mr-2 size-4 text-slate-400 dark:text-slate-500" />
                {range?.from ? (
                    range.to ? (
                        <>
                            {format(range.from, "LLL dd, y")} - {format(range.to, "LLL dd, y")}
                        </>
                    ) : (
                        format(range.from, "LLL dd, y")
                    )
                ) : (
                    <span>Pick a date</span>
                )}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-2xl shadow-2xl dark:shadow-none border-none overflow-hidden mt-2" align="end">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={range?.from}
                    selected={range}
                    onSelect={setRange}
                    numberOfMonths={2}
                    className="bg-white dark:bg-slate-950"
                />
            </PopoverContent>
        </Popover>
    );
}

function SatuSehatLoading() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between">
                <Skeleton className="h-8 w-32 rounded-full" />
                <Skeleton className="h-10 w-64 rounded-xl" />
            </div>
            <div className="flex gap-4">
                <Skeleton className="h-10 w-48 rounded-xl" />
                <Skeleton className="h-10 w-48 rounded-xl" />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton key={i} className="h-32 rounded-3xl" />)}
            </div>
        </div>
    );
}
}
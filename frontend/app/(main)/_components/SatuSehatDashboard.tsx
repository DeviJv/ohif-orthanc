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
    Clock01Icon
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
    orgId: string;
    environment: string;
}

export function SatuSehatDashboard() {
    const [stats, setStats] = useState<SatuSehatStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [environment, setEnvironment] = useState<string>("staging");
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(new Date().setDate(new Date().getDate() - 30)),
        to: new Date()
    });

    const fetchStats = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (dateRange?.from) params.append("startDate", dateRange.from.toISOString());
            if (dateRange?.to) params.append("endDate", dateRange.to.toISOString());
            params.append("environment", environment);

            const response = await fetch(`/api/stats/satusehat?${params.toString()}`);
            if (response.ok) {
                const data = await response.json();
                setStats(data);
                
                // If logs are empty, maybe offer a backfill?
                if (data.logs.length === 0) {
                    // Hidden backfill check logic if needed
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
        fetchStats();
    }, [dateRange, environment]);

    if (loading && !stats) {
        return <SatuSehatLoading />;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Unified Toolbar */}
            <div className="bg-white/50 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] p-4 shadow-xl shadow-slate-200/30 flex flex-col xl:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
                        <button 
                            onClick={() => setEnvironment("staging")}
                            className={cn(
                                "flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black transition-all",
                                environment === "staging" ? "bg-white text-primary shadow-lg shadow-primary/5" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <div className={cn("size-2 rounded-full", environment === "staging" ? "bg-primary animate-pulse" : "bg-slate-300")} />
                            STAGING
                        </button>
                        <button 
                            onClick={() => setEnvironment("production")}
                            className={cn(
                                "flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black transition-all",
                                environment === "production" ? "bg-white text-amber-600 shadow-lg shadow-amber-600/5" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <div className={cn("size-2 rounded-full", environment === "production" ? "bg-amber-500 animate-pulse" : "bg-slate-300")} />
                            PRODUCTION
                        </button>
                    </div>

                    <div className="hidden md:flex flex-col">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Organization ID</p>
                        <p className="text-xs font-bold text-slate-900 mt-1">{stats?.orgId || "---"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <DateRangePicker range={dateRange} setRange={setDateRange} />
                    
                    <div className="h-8 w-px bg-slate-200 hidden md:block" />
                    
                    <div className="flex gap-2 ml-auto">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-10 px-4 rounded-xl text-[11px] font-black uppercase tracking-wider border-slate-200 shadow-sm transition-all hover:bg-primary hover:text-white hover:border-primary"
                            onClick={handleBackfill}
                        >
                            <HugeiconsIcon icon={Clock01Icon} className="size-4 mr-2" />
                            Backfill Data
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-10 px-4 rounded-xl text-[11px] font-black uppercase tracking-wider border-slate-200 shadow-sm transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900"
                        >
                            <HugeiconsIcon icon={Download01Icon} className="size-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="summary" className="w-full">
                <div className="flex items-center justify-center mb-8">
                    <TabsList className="bg-slate-100/50 p-1.5 rounded-[1.25rem] border border-slate-200/30">
                        <TabsTrigger 
                            value="summary" 
                            className="rounded-xl px-10 py-2.5 text-xs font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl shadow-primary/10 transition-all"
                        >
                            <HugeiconsIcon icon={DashboardCircleIcon} className="size-3.5 mr-2" />
                            Ringkasan Transaksi
                        </TabsTrigger>
                        <TabsTrigger 
                            value="logs" 
                            className="rounded-xl px-10 py-2.5 text-xs font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl shadow-primary/10 transition-all"
                        >
                            <HugeiconsIcon icon={CheckListIcon} className="size-3.5 mr-2" />
                            Aktivitas Real-time
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="summary" className="space-y-8 mt-0 border-none p-0 outline-none">
                    {/* Info Alert - Slimmer version */}
                    <div className="bg-slate-900 text-white rounded-[2rem] p-6 shadow-2xl flex flex-col md:flex-row gap-6 items-center">
                        <div className="bg-primary shadow-lg shadow-primary/20 p-4 rounded-2xl">
                            <HugeiconsIcon icon={InformationCircleIcon} className="size-6 text-white" strokeWidth={3} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-sm font-black uppercase tracking-widest text-primary-foreground/90">Insight Hari Ini</h4>
                            <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed max-w-2xl">
                                Kami memantau pengiriman data fhir ke <span className="text-white font-bold">Kementerian Kesehatan (SATUSEHAT)</span>. 
                                Data yang ditampilkan mencakup transaksi sukses per-resource dengan filter periode terpilih.
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:items-end border-l border-slate-700 pl-6 hidden lg:flex">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Transaksi</p>
                            <p className="text-2xl font-black text-white">{Object.values(stats?.summary || {}).reduce((a, b) => a + b, 0)}</p>
                        </div>
                    </div>

                    {/* Test Router Helper */}
                    <Card className="border-2 border-primary/20 bg-primary/[0.02] rounded-[2rem] overflow-hidden">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary font-black text-xs">
                                    LAB
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-black tracking-tight uppercase">Test DICOM Router Helper</CardTitle>
                                    <CardDescription className="text-[10px] font-medium uppercase tracking-tighter">Prime SatuSehat with a ServiceRequest for automated testing.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap items-end gap-4 bg-white/50 p-4 rounded-2xl border border-slate-200/50">
                                <div className="space-y-1.5 flex-1 min-w-[200px]">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Accession Number</p>
                                    <input 
                                        type="text" 
                                        id="testAcsn"
                                        placeholder="Ex: TEST-12345" 
                                        className="w-full h-10 px-4 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all uppercase"
                                    />
                                </div>
                                <div className="space-y-1.5 flex-1 min-w-[200px]">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Patient Name</p>
                                    <input 
                                        type="text" 
                                        id="testName"
                                        placeholder="Ex: John Doe" 
                                        className="w-full h-10 px-4 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <Button 
                                    className="h-10 px-8 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 active:scale-95 transition-all"
                                    onClick={async () => {
                                        const acsn = (document.getElementById("testAcsn") as HTMLInputElement).value;
                                        const name = (document.getElementById("testName") as HTMLInputElement).value;
                                        if (!acsn) return toast.error("Accession Number wajib diisi");
                                        
                                        const promise = fetch("/api/stats/satusehat/test-order", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ accessionNumber: acsn, patientName: name })
                                        }).then(r => r.json());

                                        toast.promise(promise, {
                                            loading: "Mendaftarkan Order di SatuSehat...",
                                            success: (data) => {
                                                if (data.error) throw new Error(data.error);
                                                fetchStats();
                                                return "Order Berhasil Dibuat! Silakan test DICOM Router Anda.";
                                            },
                                            error: (err) => err.message || "Gagal membuat test order"
                                        });
                                    }}
                                >
                                    Create Order
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Summary Cards Grid - More refined */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {Object.entries(stats?.summary || {}).map(([type, count]) => (
                            <div 
                                key={type} 
                                className="group relative bg-white border border-slate-200/60 rounded-[2rem] p-6 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="absolute top-4 right-4 text-xs font-black text-slate-100 group-hover:text-primary/10 transition-colors uppercase">
                                    {type.substring(0, 3)}
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-primary transition-colors mb-4">{type}</p>
                                <div className="flex items-end justify-between">
                                    <h3 className={cn(
                                        "text-4xl font-black tracking-tight",
                                        count > 0 ? "text-slate-900" : "text-slate-200"
                                    )}>
                                        {count > 0 ? count : "0"}
                                    </h3>
                                    {count > 0 && (
                                        <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg">
                                            <HugeiconsIcon icon={ActivityIcon} className="size-3.5" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="logs" className="mt-0 border-none p-0 outline-none">
                    <Card className="border border-slate-200/60 shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="bg-white border-b border-slate-100 p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-xl">
                                            <HugeiconsIcon icon={Clock01Icon} className="size-5 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl font-black tracking-tight">Activity Feeds</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-slate-500 ml-10">Real-time log transaksi per individu fhir resource.</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="h-6 px-3 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-500 border-slate-200">
                                        Last 50 Records
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-slate-50/40">
                                    <TableRow className="hover:bg-transparent border-none">
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 px-8 py-5 tracking-widest">Time & Date</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Resource Type</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Action</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Code</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase text-slate-400 text-right pr-8 tracking-widest">Reference ID</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stats?.logs.map((log) => (
                                        <TableRow key={log.id} className="group hover:bg-slate-50/50 transition-all border-slate-50">
                                            <TableCell className="px-8 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-900">{format(new Date(log.createdAt), "HH:mm:ss")}</span>
                                                    <span className="text-[10px] font-medium text-slate-400 tracking-tighter">{format(new Date(log.createdAt), "dd MMM yyyy")}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm font-black text-slate-900 tracking-tight">{log.resourceType}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={cn(
                                                    "text-[10px] font-black px-2 py-1 rounded-md tracking-widest",
                                                    log.method === "POST" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                                                )}>
                                                    {log.method}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("size-1.5 rounded-full shadow-sm", log.status === "SUCCESS" ? "bg-emerald-500 shadow-emerald-500/50" : "bg-red-500 shadow-red-500/50")} />
                                                    <span className={cn(
                                                        "text-xs font-bold",
                                                        log.status === "SUCCESS" ? "text-emerald-600" : "text-red-600"
                                                    )}>
                                                        {log.status === "SUCCESS" ? "Success" : "Failed"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{log.responseCode}</span>
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <span className="text-xs font-mono text-slate-300 transition-colors group-hover:text-slate-900">{log.resourceId || "---"}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {stats?.logs.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-96 text-center">
                                                <div className="flex flex-col items-center justify-center gap-4">
                                                    <div className="bg-slate-50 p-6 rounded-full">
                                                        <HugeiconsIcon icon={Search01Icon} className="size-16 text-slate-200" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-lg font-black text-slate-900 uppercase tracking-tight">No Transactions Logged</p>
                                                        <p className="text-xs text-slate-400 font-medium">Try changing the date range or environment.</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex items-center justify-center gap-3 italic text-[10px] text-slate-400 font-bold bg-slate-50/50 py-3 rounded-full border border-slate-100 mt-12">
                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Dihubungkan ke SATUSEHAT API • Terakhir diperbarui: {format(new Date(), "dd MMMM yyyy, HH:mm", { locale: id })} WIB
            </div>
        </div>
    );

function DateRangePicker({ range, setRange }: { range: DateRange | undefined, setRange: (r: DateRange | undefined) => void }) {
    return (
        <Popover>
            <PopoverTrigger className={cn(
                buttonVariants({ variant: "outline" }),
                "h-10 justify-start text-left font-bold text-xs bg-white rounded-xl border-slate-200 shadow-sm transition-all hover:bg-slate-50",
                !range && "text-muted-foreground"
            )}>
                <HugeiconsIcon icon={Calendar03Icon} className="mr-2 size-4 text-slate-400" />
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
            <PopoverContent className="w-auto p-0 rounded-2xl shadow-2xl border-none overflow-hidden mt-2" align="end">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={range?.from}
                    selected={range}
                    onSelect={setRange}
                    numberOfMonths={2}
                    className="bg-white"
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
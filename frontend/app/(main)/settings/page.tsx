"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Card, CardHeader, CardTitle, CardDescription, CardContent,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Building04Icon,
    FloppyDiskIcon,
    Delete02Icon,
    PlusSignIcon,
    ImageUploadIcon,
    UserIcon,
    Settings05Icon,
    CpuIcon,
    CheckmarkCircle02Icon,
    AlertCircleIcon as CircleIcon,
    Message01Icon,
    Copy01Icon,
    ViewIcon,
    ViewOffSlashIcon,
    InformationCircleIcon,
    RoboticIcon,
    HealthIcon,
    Link01Icon,
    Download01Icon,
    RefreshIcon,
} from "@hugeicons/core-free-icons";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DockerServices } from "./components/docker-services";


interface ClinicConfig {
    clinicName: string;
    clinicAddress: string;
    clinicPhone: string;
    clinicCity: string;
    clinicLogo: string;
    doctors: string[];
}

export default function SettingsPage() {
    const [config, setConfig] = useState<ClinicConfig>({
        clinicName: "",
        clinicAddress: "",
        clinicPhone: "",
        clinicCity: "",
        clinicLogo: "",
        doctors: [""],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const logoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch("/api/config/clinic")
            .then((r) => r.json())
            .then((data) => {
                setConfig({
                    ...data,
                    doctors: data.doctors?.length ? data.doctors : [""],
                });
            })
            .catch(() => toast.error("Gagal memuat konfigurasi klinik"))
            .finally(() => setIsLoading(false));
    }, []);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 500 * 1024) {
            toast.error("Logo terlalu besar. Maksimal 500KB.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => setConfig((p) => ({ ...p, clinicLogo: ev.target?.result as string }));
        reader.readAsDataURL(file);
    };

    const handleDoctorChange = (idx: number, value: string) =>
        setConfig((p) => { const d = [...p.doctors]; d[idx] = value; return { ...p, doctors: d }; });

    const addDoctor = () => setConfig((p) => ({ ...p, doctors: [...p.doctors, ""] }));

    const removeDoctor = (idx: number) =>
        setConfig((p) => ({ ...p, doctors: p.doctors.filter((_, i) => i !== idx) }));

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/config/clinic", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...config,
                    doctors: config.doctors.filter((d) => d.trim() !== ""),
                }),
            });
            if (res.ok) toast.success("Pengaturan berhasil disimpan");
            else toast.error("Gagal menyimpan pengaturan");
        } catch {
            toast.error("Terjadi kesalahan saat menyimpan");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 dark:text-slate-100">
                    <HugeiconsIcon icon={Settings05Icon} className="size-6 text-primary dark:text-primary" strokeWidth={2} />
                    Pengaturan
                </h1>
                <div className="flex items-center gap-4">
                    <p className="text-muted-foreground text-sm">Kelola konfigurasi sistem dan profil fasilitas kesehatan.</p>
                    <Badge variant="outline" className="bg-primary/5 dark:bg-primary/10 text-primary border-primary/20 dark:border-primary/40">
                        AI Service: Active
                    </Badge>
                </div>
            </header>

            <Separator />

            <Tabs defaultValue="clinic" className="w-full overflow-hidden">
                <TabsList className="flex w-full overflow-x-auto overflow-y-hidden no-scrollbar justify-start h-auto p-1 py-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-slate-100 dark:bg-slate-800/50">
                    <TabsTrigger value="clinic" className="gap-2 px-4 whitespace-nowrap shrink-0 flex-1 sm:flex-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100">
                        <HugeiconsIcon icon={Building04Icon} className="size-4" />
                        Profil Klinik / RS
                    </TabsTrigger>
                    <TabsTrigger value="ai" className="gap-2 px-4 whitespace-nowrap shrink-0 flex-1 sm:flex-none">
                        <HugeiconsIcon icon={CpuIcon} className="size-4" />
                        Integrasi AI
                    </TabsTrigger>
                    <TabsTrigger value="telegram" className="gap-2 px-4 whitespace-nowrap shrink-0 flex-1 sm:flex-none">
                        <HugeiconsIcon icon={Message01Icon} className="size-4" />
                        Notifikasi Telegram
                    </TabsTrigger>
                    <TabsTrigger value="satusehat" className="gap-2 px-4 whitespace-nowrap shrink-0 flex-1 sm:flex-none">
                        <HugeiconsIcon icon={HealthIcon} className="size-4" />
                        Integrasi Satu Sehat
                    </TabsTrigger>
                    <TabsTrigger value="docker" className="gap-2 px-4 whitespace-nowrap shrink-0 flex-1 sm:flex-none">
                        <HugeiconsIcon icon={CpuIcon} className="size-4" />
                        Layanan Server
                    </TabsTrigger>

                </TabsList>

                {/* ── Tab: Layanan Server (Docker) ── */}
                <TabsContent value="docker" className="mt-6">
                    <DockerServices />
                </TabsContent>

                {/* ── Tab: Profil Klinik ── */}
                <TabsContent value="clinic" className="mt-6">

                    {isLoading ? (
                        <div className="flex items-center justify-center py-16">
                            <HugeiconsIcon icon={Building04Icon} className="size-8 animate-pulse text-primary/40" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left: Info + Doctors */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="border-2 border-slate-200/60 dark:border-slate-800 shadow-sm dark:bg-slate-900/50">
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2 dark:text-slate-100">
                                            <HugeiconsIcon icon={Building04Icon} className="size-4.5 text-primary" strokeWidth={2} />
                                            Informasi Klinik / RS
                                        </CardTitle>
                                        <CardDescription className="dark:text-slate-400">Tampil di header laporan PDF hasil rontgen</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="clinicName">Nama Klinik / RS</Label>
                                            <Input
                                                id="clinicName"
                                                placeholder="KLINIK ARSYAFI"
                                                value={config.clinicName}
                                                onChange={(e) => setConfig((p) => ({ ...p, clinicName: e.target.value }))}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="clinicAddress">Alamat Lengkap</Label>
                                            <Input
                                                id="clinicAddress"
                                                placeholder="Jln. Gatot Subroto Kelurahan Matakando..."
                                                value={config.clinicAddress}
                                                onChange={(e) => setConfig((p) => ({ ...p, clinicAddress: e.target.value }))}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="clinicPhone">Telp / Fax</Label>
                                                <Input
                                                    id="clinicPhone"
                                                    placeholder="(0374) 1234567"
                                                    value={config.clinicPhone}
                                                    onChange={(e) => setConfig((p) => ({ ...p, clinicPhone: e.target.value }))}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="clinicCity">Kota</Label>
                                                <Input
                                                    id="clinicCity"
                                                    placeholder="Kota Bima"
                                                    value={config.clinicCity}
                                                    onChange={(e) => setConfig((p) => ({ ...p, clinicCity: e.target.value }))}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-2 border-slate-200/60 dark:border-slate-800 shadow-sm dark:bg-slate-900/50">
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2 dark:text-slate-100">
                                            <HugeiconsIcon icon={UserIcon} className="size-4.5 text-primary" strokeWidth={2} />
                                            Daftar Dokter
                                        </CardTitle>
                                        <CardDescription className="dark:text-slate-400">Nama dokter bisa dipilih saat mengisi laporan PDF</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {config.doctors.map((doc, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <Input
                                                    placeholder="dr. Nama Dokter, Sp.Rad"
                                                    value={doc}
                                                    onChange={(e) => handleDoctorChange(idx, e.target.value)}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="shrink-0 text-destructive hover:bg-destructive/10"
                                                    onClick={() => removeDoctor(idx)}
                                                    disabled={config.doctors.length === 1}
                                                >
                                                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button variant="outline" size="sm" className="gap-2 mt-1" onClick={addDoctor}>
                                            <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
                                            Tambah Dokter
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right: Logo */}
                            <div className="flex flex-col gap-4">
                                <Card className="h-fit border-2 border-slate-200/60 dark:border-slate-800 shadow-sm dark:bg-slate-900/50">
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2 dark:text-slate-100">
                                            <HugeiconsIcon icon={ImageUploadIcon} className="size-4.5 text-primary" strokeWidth={2} />
                                            Logo Klinik
                                        </CardTitle>
                                        <CardDescription className="dark:text-slate-400">Maks. 500KB. Tampil di pojok kiri header PDF.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div
                                            className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl aspect-square flex items-center justify-center cursor-pointer hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all bg-slate-50/30 dark:bg-slate-900/30"
                                            onClick={() => logoInputRef.current?.click()}
                                        >
                                            {config.clinicLogo ? (
                                                <img
                                                    src={config.clinicLogo}
                                                    alt="Logo"
                                                    className="max-h-full max-w-full object-contain p-4 rounded-lg"
                                                />
                                            ) : (
                                                <div className="text-center text-slate-400 dark:text-slate-600 space-y-2 p-6">
                                                    <HugeiconsIcon icon={ImageUploadIcon} className="size-10 mx-auto opacity-40" />
                                                    <p className="text-xs">Klik untuk upload logo</p>
                                                    <p className="text-xs opacity-60">PNG, JPG, atau SVG</p>
                                                </div>
                                            )}
                                        </div>
                                        <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                                        {config.clinicLogo && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/5"
                                                onClick={() => setConfig((p) => ({ ...p, clinicLogo: "" }))}
                                            >
                                                <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                                                Hapus Logo
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>

                                <Button
                                    className="w-full gap-2 font-semibold shadow-md active:scale-95 transition-all h-11"
                                    onClick={handleSave}
                                    disabled={isSaving || isLoading}
                                >
                                    <HugeiconsIcon icon={FloppyDiskIcon} className="size-5" strokeWidth={2} />
                                    {isSaving ? "Menyimpan pengaturan..." : "Simpan Pengaturan"}
                                </Button>
                            </div>
                        </div>
                    )}
                </TabsContent>

                {/* ── Tab: Integrasi AI ── */}
                <TabsContent value="ai" className="mt-6">
                    <AiSettingsTab />
                </TabsContent>

                {/* ── Tab: Notifikasi Telegram ── */}
                <TabsContent value="telegram" className="mt-6">
                    <TelegramSettingsTab />
                </TabsContent>

                {/* ── Tab: Integrasi Satu Sehat ── */}
                <TabsContent value="satusehat" className="mt-6">
                    <SatuSehatSettingsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function TelegramSettingsTab() {
    const [botToken, setBotToken] = useState("");
    const [chatId, setChatId] = useState("");
    const [showToken, setShowToken] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    // Track whether user has actually edited (typed into) each field
    const [tokenDirty, setTokenDirty] = useState(false);
    const [chatIdDirty, setChatIdDirty] = useState(false);
    const [configInfo, setConfigInfo] = useState<{
        source: string;
        hasDbToken: boolean;
        hasDbChatId: boolean;
        botToken: string;
        chatId: string;
    } | null>(null);

    // Fetch current config on load
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch("/api/config/telegram");
                if (res.ok) {
                    const data = await res.json();
                    setBotToken(data.botToken);
                    setChatId(data.chatId);
                    setConfigInfo(data);
                }
            } catch (error) {
                console.error("Failed to fetch config:", error);
                toast.error("Gagal memuat konfigurasi Telegram");
            } finally {
                setIsLoading(false);
            }
        };

        fetchConfig();
    }, []);

    const handleSave = async () => {
        // Only send fields that the user actually edited to avoid saving masked values
        const payload: Record<string, string> = {};
        if (tokenDirty) payload.botToken = botToken;
        if (chatIdDirty) payload.chatId = chatId;

        if (Object.keys(payload).length === 0) {
            toast.info("Tidak ada perubahan untuk disimpan.");
            return;
        }

        setIsSaving(true);
        try {
            const res = await fetch("/api/config/telegram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            
            if (res.ok) {
                toast.success("Konfigurasi berhasil disimpan");
                // Reset dirty flags & refresh masked display
                setTokenDirty(false);
                setChatIdDirty(false);
                const refreshRes = await fetch("/api/config/telegram");
                if (refreshRes.ok) {
                    const data = await refreshRes.json();
                    setBotToken(data.botToken);
                    setChatId(data.chatId);
                    setConfigInfo(data);
                }
            } else {
                toast.error("Gagal menyimpan konfigurasi");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menyimpan");
        } finally {
            setIsSaving(false);
        }
    };

    const handleTest = async () => {
        if (!botToken || !chatId) {
            toast.error("Silakan isi Token dan Chat ID terlebih dahulu");
            return;
        }

        setIsTesting(true);
        try {
            const res = await fetch("/api/config/telegram/test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ botToken, chatId }),
            });
            
            const data = await res.json();
            if (res.ok) {
                toast.success(`Berhasil! Bot ditemukan: ${data.botName}`);
            } else {
                toast.error(data.error || "Gagal menghubungi Telegram API");
            }
        } catch (error) {
            toast.error("Gagal melakukan tes koneksi");
        } finally {
            setIsTesting(false);
        }
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} disalin ke clipboard`);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16">
                <HugeiconsIcon icon={RoboticIcon} className="size-8 animate-pulse text-primary/40" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            {/* Configuration Section */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="border-2 border-primary/20 dark:border-primary/40 shadow-sm overflow-hidden dark:bg-slate-900/50">
                    <CardHeader className="bg-primary/5 dark:bg-primary/10 pb-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-base flex items-center gap-2 dark:text-slate-100">
                                    <HugeiconsIcon icon={RoboticIcon} className="size-4.5 text-primary" strokeWidth={2} />
                                    Telegram API Settings
                                </CardTitle>
                                <CardDescription className="text-xs dark:text-slate-400">
                                    Konfigurasi bot Telegram untuk notifikasi hasil analisa AI.
                                </CardDescription>
                            </div>
                            {configInfo && (
                                <Badge variant={configInfo.source === "database" ? "default" : "secondary"} className="text-[10px] h-5">
                                    {configInfo.source === "database" ? "DB Overriden" : "Environment (.env)"}
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        {/* Bot Token */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="botToken" className="text-sm font-semibold">Bot Token API</Label>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-primary transition-colors"
                                    onClick={() => setShowToken(!showToken)}
                                >
                                    <HugeiconsIcon icon={showToken ? ViewOffSlashIcon : ViewIcon} className="size-3.5" />
                                    {showToken ? "Hide" : "Show"}
                                </Button>
                            </div>
                            <div className="flex gap-2 relative">
                                <Input
                                    id="botToken"
                                    type={showToken ? "text" : "password"}
                                    placeholder="Ex: 8601553740:AAHt68wyfkL5..."
                                    value={botToken}
                                    onChange={(e) => { setBotToken(e.target.value); setTokenDirty(true); }}
                                    className="pr-10 font-mono text-sm tracking-tighter h-10"
                                />
                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="shrink-0 h-10 w-10 aspect-square"
                                    onClick={() => copyToClipboard(botToken, "Token")}
                                >
                                    <HugeiconsIcon icon={Copy01Icon} className="size-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Chat ID */}
                        <div className="space-y-3">
                            <Label htmlFor="chatId" className="text-sm font-semibold">User/Chat ID Telegram</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="chatId"
                                    type="text"
                                    placeholder="Ex: 1085499706"
                                    value={chatId}
                                    onChange={(e) => { setChatId(e.target.value); setChatIdDirty(true); }}
                                    className="font-mono text-sm h-10"
                                />
                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="shrink-0 h-10 w-10 aspect-square"
                                    onClick={() => copyToClipboard(chatId, "Chat ID")}
                                >
                                    <HugeiconsIcon icon={Copy01Icon} className="size-4" />
                                </Button>
                            </div>
                            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 ml-1">
                                <HugeiconsIcon icon={InformationCircleIcon} className="size-3" />
                                Gunakan chat ID personal atau group ID (pake tanda minus).
                            </p>
                        </div>
                    </CardContent>
                    <Separator />
                    <div className="p-6 flex flex-wrap gap-3 justify-between">
                        <Button 
                            variant="outline" 
                            className="gap-2 shrink-0 h-10 px-6 font-medium"
                            onClick={handleTest}
                            disabled={isTesting || isSaving}
                        >
                            <HugeiconsIcon icon={Message01Icon} className={cn("size-4", isTesting && "animate-bounce")} strokeWidth={2} />
                            {isTesting ? "Testing..." : "Test Bot"}
                        </Button>
                        <Button 
                            className="gap-2 shrink-0 h-10 px-8 font-semibold shadow-md active:scale-95 transition-all"
                            onClick={handleSave}
                            disabled={isSaving || isTesting}
                        >
                            <HugeiconsIcon icon={FloppyDiskIcon} className={cn("size-4", isSaving && "animate-spin")} strokeWidth={2} />
                            {isSaving ? "Saving..." : "Simpan Config"}
                        </Button>
                    </div>
                </Card>

                {/* Status Legend */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex gap-3 text-blue-900 dark:text-blue-300 shadow-sm">
                        <div className="bg-blue-500 text-white rounded-lg p-2 h-fit shrink-0">
                            <HugeiconsIcon icon={InformationCircleIcon} className="size-4" strokeWidth={3} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold leading-tight">Database Priority</h4>
                            <p className="text-xs text-blue-800/80 dark:text-blue-300/80 leading-relaxed">
                                Sistem membaca konfig dari Database terlebih dahulu sebelum mengambil dari file .env.
                            </p>
                        </div>
                    </div>
                    <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-xl p-4 flex gap-3 text-amber-900 dark:text-amber-300 shadow-sm">
                        <div className="bg-amber-500 text-white rounded-lg p-2 h-fit shrink-0">
                            <HugeiconsIcon icon={CircleIcon} className="size-4" strokeWidth={3} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold leading-tight">Privacy Focus</h4>
                            <p className="text-xs text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
                                Token bot Anda di-mask secara otomatis. Pastikan bot sudah di-Start di Telegram.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tutorial Section */}
            <div className="space-y-6">
                <Card className="border-2 border-slate-200/60 dark:border-slate-800 shadow-sm dark:bg-slate-900/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-bold flex items-center gap-2 dark:text-slate-100">
                            <HugeiconsIcon icon={InformationCircleIcon} className="size-4 text-blue-500 dark:text-blue-400" strokeWidth={2.5} />
                            Langkah-langkah
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-sm">
                        <div className="space-y-4">
                            <div className="flex gap-3 relative">
                                <div className="absolute left-[9px] top-6 bottom-[-16px] w-[2px] bg-slate-100 dark:bg-slate-800" />
                                <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 size-5 p-0 flex items-center justify-center rounded-sm shrink-0 font-bold z-10 border-none">1</Badge>
                                <div className="space-y-1">
                                    <p className="font-bold text-xs uppercase tracking-tighter dark:text-slate-300">Chat @BotFather</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Ketik <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">/newbot</code> di BotFather.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 relative">
                                <div className="absolute left-[9px] top-6 bottom-[-16px] w-[2px] bg-slate-100 dark:bg-slate-800" />
                                <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 size-5 p-0 flex items-center justify-center rounded-sm shrink-0 font-bold z-10 border-none">2</Badge>
                                <div className="space-y-1">
                                    <p className="font-bold text-xs uppercase tracking-tighter dark:text-slate-300">Get API Token</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Copy token dari BotFather dan paste di input samping.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Badge className="bg-green-100 dark:bg-emerald-900/50 text-green-700 dark:text-emerald-300 hover:bg-green-100 dark:hover:bg-emerald-900/50 size-5 p-0 flex items-center justify-center rounded-sm shrink-0 font-bold z-10 border-none"><HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3" strokeWidth={4} /></Badge>
                                <div className="space-y-1">
                                    <p className="font-bold text-xs uppercase tracking-tighter dark:text-emerald-400">Start Bot!</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
                                        Klik **Start** di bot baru Anda.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function AiSettingsTab() {
    const [mode, setMode] = useState<string>("OFF");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // System Metrics state
    const [systemMetrics, setSystemMetrics] = useState<any>(null);

    // Password protection state
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [pendingMode, setPendingMode] = useState<string | null>(null);
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        const fetchAiConfig = async () => {
            try {
                const [resMode, resSystem] = await Promise.all([
                    fetch("/api/config/ai"),
                    fetch("/api/config/ai/system")
                ]);
                
                if (resMode.ok) {
                    const data = await resMode.json();
                    setMode(data.mode);
                }
                if (resSystem.ok) {
                    const sysData = await resSystem.json();
                    setSystemMetrics(sysData);
                }
            } catch (error) {
                console.error("Failed to fetch AI config:", error);
                toast.error("Gagal memuat konfigurasi AI");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAiConfig();
    }, []);

    const handleModeClick = (newMode: string) => {
        if (newMode === mode) return; // No change
        setPendingMode(newMode);
        setPasswordInput("");
        setPasswordError(false);
        setIsPasswordModalOpen(true);
    };

    const confirmSaveMode = async () => {
        if (passwordInput !== "quantum%2026") {
            setPasswordError(true);
            return;
        }

        if (!pendingMode) return;
        
        setIsSaving(true);
        setIsPasswordModalOpen(false);
        try {
            const res = await fetch("/api/config/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: pendingMode }),
            });
            if (res.ok) {
                setMode(pendingMode);
                toast.success(`Mode AI diubah ke ${pendingMode}`);
            } else {
                toast.error("Gagal menyimpan mode AI");
            }
        } catch {
            toast.error("Terjadi kesalahan saat menyimpan");
        } finally {
            setIsSaving(false);
            setPendingMode(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16">
                <HugeiconsIcon icon={CpuIcon} className="size-8 animate-pulse text-primary/40" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card className="dark:bg-slate-900/50 dark:border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2 dark:text-slate-100">
                            <HugeiconsIcon icon={CpuIcon} className="size-4.5 text-primary" strokeWidth={2} />
                            Status Kecerdasan Buatan (AI)
                        </CardTitle>
                        <CardDescription className="dark:text-slate-400">Atur bagaimana sistem memproses DICOM menggunakan model AI.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { id: "AUTO", label: "Otomatis (Auto)", desc: "AI langsung memproses setiap file yang masuk ke PACS dan mengirimkan notifikasi ke Telegram.", icon: "zap" },
                                { id: "MANUAL", label: "Manual", desc: "AI hanya bekerja saat tombol 'Run AI' ditekan di Worklist atau Viewer.", icon: "mouse" },
                                { id: "OFF", label: "Nonaktif (Off)", desc: "Matikan fitur AI sepenuhnya untuk menghemat resource perangkat.", icon: "slash" },
                            ].map((item) => (
                                <div 
                                    key={item.id}
                                    onClick={() => handleModeClick(item.id)}
                                    className={cn(
                                        "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                                        mode === item.id 
                                            ? "border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary/10 shadow-sm" 
                                            : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    )}
                                >
                                    <div className={cn(
                                        "p-2.5 rounded-lg shrink-0 transition-colors",
                                        mode === item.id ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                    )}>
                                        <HugeiconsIcon icon={mode === item.id ? CheckmarkCircle02Icon : CircleIcon} className="size-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className={cn("font-bold text-sm", mode === item.id ? "text-primary" : "text-slate-900")}>
                                            {item.label}
                                        </h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <Card className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-3 border-b border-slate-200/60 dark:border-slate-800 mb-2">
                        <CardTitle className="text-sm font-bold flex items-center justify-between dark:text-slate-100">
                            <span className="flex items-center gap-2">
                                <HugeiconsIcon icon={Settings05Icon} className="size-4" />
                                Hardware & System Metrics
                            </span>
                            {systemMetrics?.ai?.status === "Connected" ? (
                                <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-[10px] h-5 shadow-none px-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />Online</Badge>
                            ) : (
                                <Badge variant="outline" className="bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 text-[10px] h-5 shadow-none px-1.5"><div className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1" />Offline</Badge>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-4 text-slate-600 pt-2">
                        {systemMetrics ? (
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50 dark:border-slate-800">
                                    <span className="text-muted-foreground font-medium">OS Server:</span>
                                    <span className="font-mono text-slate-800 dark:text-slate-200 uppercase">{systemMetrics.system?.platform} ({systemMetrics.system?.arch})</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50 dark:border-slate-800">
                                    <span className="text-muted-foreground font-medium">CPU Cores:</span>
                                    <span className="font-mono text-slate-800 dark:text-slate-200">{systemMetrics.system?.cpuCount} vCPU</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50 dark:border-slate-800">
                                    <span className="text-muted-foreground font-medium">Memori Terpakai:</span>
                                    <span className="font-mono text-slate-800 dark:text-slate-200">{systemMetrics.system?.usedMemGb} GB / {systemMetrics.system?.totalMemGb} GB</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50 dark:border-slate-800">
                                    <span className="text-muted-foreground font-medium">AI Hardware Device:</span>
                                    <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 border-blue-100 dark:border-blue-800 shadow-none uppercase">
                                        {systemMetrics.ai?.device}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center pb-1">
                                    <span className="text-muted-foreground font-medium">Engine Build:</span>
                                    <span className="font-mono text-slate-800 dark:text-slate-200 font-bold tracking-tighter bg-slate-200/50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{systemMetrics.ai?.backendMode}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-4 text-slate-400 dark:text-slate-600">Loading system metrics...</div>
                        )}
                        
                        <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-lg p-3 text-blue-900 dark:text-blue-300 mt-2 shadow-sm">
                            <p className="leading-relaxed">
                                **Tips VPS:** Jika Anda mendeploy di VPS, pastikan RAM cukup. Sistem kami merekomendasikan minimal **4GB RAM** agar komputasi AI berjalan stabil.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Keamanan</DialogTitle>
                        <DialogDescription>
                            Masukkan kata sandi administrator untuk mengubah mode AI.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 my-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Masukkan password..."
                                value={passwordInput}
                                onChange={(e) => {
                                    setPasswordInput(e.target.value);
                                    setPasswordError(false);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") confirmSaveMode();
                                }}
                            />
                            {passwordError && (
                                <p className="text-sm text-destructive font-medium">Password salah!</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setIsPasswordModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button onClick={confirmSaveMode} disabled={isSaving}>
                            {isSaving ? "Menyimpan..." : "Lanjutkan"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function SatuSehatSettingsTab() {
    const [config, setConfig] = useState<any>({
        env: "staging",
        // Staging Fields
        stgOrgId: "",
        stgClientId: "",
        stgClientSecret: "",
        stgAuthUrl: "",
        stgBaseUrl: "",

        // Production Fields
        prdOrgId: "",
        prdClientId: "",
        prdClientSecret: "",
        prdAuthUrl: "",
        prdBaseUrl: "",

        defaultPatientId: "",
        defaultPractitionerId: "",
        encounterUrl: "",
        conditionUrl: "",
        serviceRequestUrl: "",
        imagingStudyUrl: "",
        observationUrl: "",
        diagnosticReportUrl: "",
        compositionUrl: "",
        patientUrl: "",
        locationUrl: "",
        practitionerUrl: "",
        patientIdSource: "PatientID",
        autoSyncEnabled: false,
        autoSyncFrequency: "DAILY",
        autoSyncTime: "23:00",
    });
    
    const [showSecretStg, setShowSecretStg] = useState(false);
    const [showSecretPrd, setShowSecretPrd] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [debugResult, setDebugResult] = useState<any>(null);
    
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch("/api/config/satusehat");
                if (res.ok) {
                    const data = await res.json();
                    setConfig((prev: any) => ({ ...prev, ...data }));
                } else {
                    toast.error("Gagal mendapatkan konfigurasi dari server");
                }
            } catch (error) {
                console.error("Failed to fetch config:", error);
                toast.error("Gagal memuat konfigurasi SatuSehat");
            } finally {
                setIsLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/config/satusehat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });
            
            if (res.ok) {
                toast.success("Konfigurasi Satu Sehat berhasil disimpan");
                
                // Refresh to get masked secrets if needed
                const refreshRes = await fetch("/api/config/satusehat");
                if (refreshRes.ok) {
                    const data = await refreshRes.json();
                    setConfig((prev: any) => ({ ...prev, ...data }));
                }
            } else {
                toast.error("Gagal menyimpan konfigurasi");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menyimpan");
        } finally {
            setIsSaving(false);
        }
    };

    const handleTest = async () => {
        setIsTesting(true);
        setDebugResult(null);
        
        // Use active values for testing
        const isActiveStaging = config.env === "staging";
        const testPayload = {
            clientId: isActiveStaging ? config.stgClientId : config.prdClientId,
            clientSecret: isActiveStaging ? config.stgClientSecret : config.prdClientSecret,
            env: config.env,
            organizationId: isActiveStaging ? config.stgOrgId : config.prdOrgId,
            authUrl: isActiveStaging ? config.stgAuthUrl : config.prdAuthUrl
        };

        try {
            const res = await fetch("/api/config/satusehat/test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(testPayload),
            });
            
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message || "Koneksi berhasil!");
                setDebugResult(data.data);
            } else {
                toast.error(data.error || "Gagal menghubungi API Satu Sehat");
            }
        } catch (error) {
            toast.error("Gagal melakukan tes koneksi");
        } finally {
            setIsTesting(false);
        }
    };

    const handleDownloadRouter = async (source: "official" | "local" = "local") => {
        if (source === "official" && (!debugResult || !debugResult.token)) {
            toast.error("Silakan lakukan 'Test' integrasi terlebih dahulu untuk mendapatkan token otorisasi resmi.");
            return;
        }

        try {
            const urlParams = new URLSearchParams({
                source,
                env: config.env
            });
            if (debugResult?.token) {
                urlParams.append("token", debugResult.token);
            }

            const res = await fetch(`/api/config/satusehat/download-router?${urlParams.toString()}`);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Gagal mengunduh konfigurasi");
            }

            // Detect filename from header if possible
            const contentDisposition = res.headers.get("Content-Disposition");
            let filename = source === "local" ? "docker-compose.yml" : "dicom-router-official.zip";
            
            if (contentDisposition && contentDisposition.includes("filename=")) {
                const parts = contentDisposition.split("filename=");
                filename = parts[1].replace(/"/g, "");
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            if (source === "local") {
                toast.success("Konfigurasi Quantum Optimized berhasil diunduh (Siap pakai!)");
            } else {
                toast.success("Konfigurasi Official berhasil diunduh");
            }
        } catch (error: any) {
            toast.error(error.message || "Gagal mengunduh configuration");
        }
    };

    const handleChange = (key: string, value: any) => {
        setConfig((prev: any) => ({ ...prev, [key]: value }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 animate-pulse">
                <div className="flex flex-col items-center gap-4">
                    <HugeiconsIcon icon={HealthIcon} className="size-12 text-primary/40 animate-bounce" />
                    <p className="text-sm font-medium text-slate-400 dark:text-slate-600">Memuat konfigurasi SatuSehat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Environment Selection & Action Bar */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white/40 dark:bg-slate-900/40 p-6 rounded-2xl border-2 border-primary/10 dark:border-primary/20 backdrop-blur-md shadow-sm">
                <div className="space-y-1">
                    <h3 className="text-lg font-bold flex items-center gap-2 dark:text-slate-100">
                        <HugeiconsIcon icon={HealthIcon} className="size-5 text-primary" />
                        Mode Integrasi Aktif
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Pilih lingkungan yang akan digunakan oleh sistem saat ini.</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex-1 md:w-64">
                        <Select value={config.env} onValueChange={(v) => handleChange("env", v)}>
                            <SelectTrigger className="w-full bg-white dark:bg-slate-900 border-primary/20 dark:border-primary/40 focus:ring-primary shadow-sm h-11 dark:text-slate-100">
                                <SelectValue placeholder="Pilih Environment" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-slate-900 dark:border-slate-800">
                                <SelectItem value="staging">Staging (Sandbox)</SelectItem>
                                <SelectItem value="production">Production</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <div className="flex gap-2">
                        <TooltipProvider>
                            {/* Quantum Optimized Download (Recommended) */}
                            <Tooltip>
                                <TooltipTrigger 
                                    render={(props) => (
                                        <Button 
                                            {...props}
                                            variant="default" 
                                            className="gap-2 h-11 px-4 font-medium shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white"
                                            onClick={() => handleDownloadRouter("local")}
                                        >
                                            <HugeiconsIcon icon={Download01Icon} className="size-4" strokeWidth={2} />
                                        </Button>
                                    )} 
                                />
                                <TooltipContent>
                                    <p>Download Quantum Optimized YAML (Recommended)</p>
                                </TooltipContent>
                            </Tooltip>
                            
                            {/* Official Satu Sehat Download (ZIP) */}
                            <Tooltip>
                                <TooltipTrigger 
                                    render={(props) => (
                                        <Button 
                                            {...props}
                                            variant="outline" 
                                            className="gap-2 h-11 px-4 font-medium border-primary/20 hover:bg-primary/5 shadow-sm"
                                            onClick={() => handleDownloadRouter("official")}
                                            disabled={!debugResult?.token}
                                        >
                                            <HugeiconsIcon icon={Download01Icon} className="size-4" strokeWidth={2} />
                                        </Button>
                                    )} 
                                />
                                <TooltipContent>
                                    <p>Download Official Satu Sehat (ZIP)</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <Button 
                            variant="outline" 
                            className="gap-2 h-11 px-4 font-medium border-primary/20 hover:bg-primary/5 shadow-sm"
                            onClick={handleTest}
                            disabled={isTesting || isSaving}
                        >
                            <HugeiconsIcon icon={Link01Icon} className={cn("size-4", isTesting && "animate-bounce")} strokeWidth={2} />
                            {isTesting ? "Testing..." : "Test"}
                        </Button>
                        <Button 
                            className="gap-2 h-11 px-6 font-semibold shadow-md active:scale-95 transition-all bg-primary hover:bg-primary/90"
                            onClick={handleSave}
                            disabled={isSaving || isTesting}
                        >
                            <HugeiconsIcon icon={FloppyDiskIcon} className={cn("size-4", isSaving && "animate-spin")} strokeWidth={2} />
                            {isSaving ? "Saving..." : "Simpan"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Dual Grid for Staging and Production */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* ── STAGING SECTION ── */}
                <Card className={cn(
                    "border-2 transition-all duration-300 overflow-hidden dark:bg-slate-900/50",
                    config.env === "staging" ? "border-primary shadow-lg ring-4 ring-primary/5" : "border-slate-200 dark:border-slate-800 opacity-80"
                )}>
                    <CardHeader className={cn(
                        "pb-6 border-b",
                        config.env === "staging" ? "bg-primary/5 dark:bg-primary/10 border-primary/10 dark:border-primary/20" : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800"
                    )}>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-base flex items-center gap-2 dark:text-slate-100">
                                    <div className="size-2 rounded-full bg-blue-500 animate-pulse" />
                                    Staging (Sandbox) Config
                                </CardTitle>
                                <CardDescription className="text-[10px] font-medium uppercase tracking-wider opacity-60 dark:text-slate-400">
                                    Environment untuk Pengembangan & Testing
                                </CardDescription>
                            </div>
                            {config.env === "staging" && <Badge className="bg-primary hover:bg-primary uppercase text-[9px] px-1.5 h-5 flex items-center gap-1"><HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3" /> Active</Badge>}
                        </div>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-6 bg-white/50 dark:bg-transparent">
                        <div className="space-y-1.5">
                            <Label htmlFor="stgOrgId" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter ml-1">Staging Organization ID</Label>
                            <Input
                                id="stgOrgId"
                                placeholder="IHS ID Staging"
                                value={config.stgOrgId}
                                onChange={(e) => handleChange("stgOrgId", e.target.value)}
                                className="font-mono text-sm shadow-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="stgClientId" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter ml-1">Staging Client ID</Label>
                            <Input
                                id="stgClientId"
                                placeholder="Client ID Staging"
                                value={config.stgClientId}
                                onChange={(e) => handleChange("stgClientId", e.target.value)}
                                className="font-mono text-sm shadow-sm dark:bg-slate-900 dark:border-slate-800"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="stgClientSecret" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter ml-1">Staging Client Secret</Label>
                                <Button variant="ghost" size="sm" className="h-4 p-0 px-1 text-[9px] text-primary" onClick={() => setShowSecretStg(!showSecretStg)}>
                                    {showSecretStg ? "Sembunyikan" : "Tampilkan"}
                                </Button>
                            </div>
                            <Input
                                id="stgClientSecret"
                                type={showSecretStg ? "text" : "password"}
                                placeholder="Client Secret Staging"
                                value={config.stgClientSecret}
                                onChange={(e) => handleChange("stgClientSecret", e.target.value)}
                                className="font-mono text-sm shadow-sm dark:bg-slate-900 dark:border-slate-800"
                            />
                        </div>
                        <div className="space-y-1.5 pt-2">
                            <Label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter ml-1">Staging Auth URL</Label>
                            <Input
                                value={config.stgAuthUrl}
                                onChange={(e) => handleChange("stgAuthUrl", e.target.value)}
                                placeholder="https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken..."
                                className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 border-transparent"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter ml-1">Staging Base FHIR URL</Label>
                            <Input
                                value={config.stgBaseUrl}
                                onChange={(e) => handleChange("stgBaseUrl", e.target.value)}
                                placeholder="https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1"
                                className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 border-transparent"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* ── PRODUCTION SECTION ── */}
                <Card className={cn(
                    "border-2 transition-all duration-300 overflow-hidden dark:bg-slate-900/50",
                    config.env === "production" ? "border-emerald-500 shadow-lg ring-4 ring-emerald-500/5" : "border-slate-200 dark:border-slate-800 opacity-80"
                )}>
                    <CardHeader className={cn(
                        "pb-6 border-b",
                        config.env === "production" ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30" : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800"
                    )}>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-base flex items-center gap-2 dark:text-slate-100">
                                    <div className="size-2 rounded-full bg-emerald-500" />
                                    Production Config
                                </CardTitle>
                                <CardDescription className="text-[10px] font-medium uppercase tracking-wider opacity-60 dark:text-slate-400">
                                    Environment untuk Operasional Klinik / RS
                                </CardDescription>
                            </div>
                            {config.env === "production" && <Badge className="bg-emerald-600 hover:bg-emerald-600 uppercase text-[9px] px-1.5 h-5 flex items-center gap-1"><HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3" /> Active</Badge>}
                        </div>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-6 bg-white/50 dark:bg-transparent">
                        <div className="space-y-1.5">
                            <Label htmlFor="prdOrgId" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter ml-1">Production Organization ID</Label>
                            <Input
                                id="prdOrgId"
                                placeholder="IHS ID Production"
                                value={config.prdOrgId}
                                onChange={(e) => handleChange("prdOrgId", e.target.value)}
                                className="font-mono text-sm shadow-sm border-emerald-100 dark:border-emerald-900 focus:ring-emerald-500 dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="prdClientId" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter ml-1">Production Client ID</Label>
                            <Input
                                id="prdClientId"
                                placeholder="Client ID Production"
                                value={config.prdClientId}
                                onChange={(e) => handleChange("prdClientId", e.target.value)}
                                className="font-mono text-sm shadow-sm border-emerald-100 dark:border-emerald-900 focus:ring-emerald-500 dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="prdClientSecret" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter ml-1">Production Client Secret</Label>
                                <Button variant="ghost" size="sm" className="h-4 p-0 px-1 text-[9px] text-emerald-600" onClick={() => setShowSecretPrd(!showSecretPrd)}>
                                    {showSecretPrd ? "Sembunyikan" : "Tampilkan"}
                                </Button>
                            </div>
                            <Input
                                id="prdClientSecret"
                                type={showSecretPrd ? "text" : "password"}
                                placeholder="Client Secret Production"
                                value={config.prdClientSecret}
                                onChange={(e) => handleChange("prdClientSecret", e.target.value)}
                                className="font-mono text-sm shadow-sm border-emerald-100 dark:border-emerald-900 focus:ring-emerald-500 dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1.5 pt-2">
                            <Label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter ml-1">Production Auth URL</Label>
                            <Input
                                value={config.prdAuthUrl}
                                onChange={(e) => handleChange("prdAuthUrl", e.target.value)}
                                placeholder="https://api-satusehat.kemkes.go.id/oauth2/v1/accesstoken..."
                                className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 border-transparent"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter ml-1">Production Base FHIR URL</Label>
                            <Input
                                value={config.prdBaseUrl}
                                onChange={(e) => handleChange("prdBaseUrl", e.target.value)}
                                placeholder="https://api-satusehat.kemkes.go.id/fhir-r4/v1"
                                className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 border-transparent"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {debugResult && (
                <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 shadow-inner overflow-hidden animate-in zoom-in-95 duration-300">
                    <CardHeader className="py-3 px-4 bg-emerald-100/50 dark:bg-emerald-900/30 border-b border-emerald-200 dark:border-emerald-800">
                        <CardTitle className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 uppercase tracking-widest">
                            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                            Auth Debug Output ({config.env.toUpperCase()})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4 font-mono text-[11px]">
                        <div className="space-y-1.5">
                            <Label className="text-[10px] text-emerald-600/70 font-bold uppercase">Active Access Token (Bearer)</Label>
                            <div className="group relative">
                                <div className="bg-slate-900 text-slate-100 p-3 rounded-md break-all leading-relaxed shadow-lg max-h-32 overflow-y-auto border border-slate-800">
                                    {debugResult.token}
                                </div>
                                <Button 
                                    variant="secondary" 
                                    size="sm" 
                                    className="absolute top-2 right-2 h-7 px-2 bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => {
                                        navigator.clipboard.writeText(debugResult.token);
                                        toast.success("Token disalin");
                                    }}
                                >
                                    <HugeiconsIcon icon={Copy01Icon} className="size-3 mr-1" />
                                    Copy
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-2 bg-white/60 dark:bg-slate-900/60 rounded border border-emerald-100 dark:border-emerald-900">
                                <span className="text-emerald-600/70 dark:text-emerald-400/70 font-bold mr-2 uppercase">Application:</span>
                                <span className="text-emerald-900 dark:text-emerald-100">{debugResult.application_name}</span>
                            </div>
                            <div className="p-2 bg-white/60 dark:bg-slate-900/60 rounded border border-emerald-100 dark:border-emerald-900">
                                <span className="text-emerald-600/70 dark:text-emerald-400/70 font-bold mr-2 uppercase">Org Verify:</span>
                                <Badge variant="outline" className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-none h-4 px-1 text-[9px]">
                                    {debugResult.organization_verified ? "SUCCESS" : "SKIPPED"}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* 2-Column Grid for Identity and Advanced Overrides */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                {/* Column 1: Global Identity */}
                <Card className="border-2 border-slate-200/60 dark:border-slate-800 shadow-sm bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base flex items-center gap-2 dark:text-slate-100">
                            <HugeiconsIcon icon={UserIcon} className="size-4 text-primary" strokeWidth={2.5} />
                            Dummy Personas (Testing)
                        </CardTitle>
                        <CardDescription className="text-xs dark:text-slate-400">ID virtual untuk keperluan simulasi integrasi.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="defPat" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Default Patient ID</Label>
                                <Input 
                                    id="defPat"
                                    value={config.defaultPatientId || ""}
                                    onChange={(e) => handleChange("defaultPatientId", e.target.value)}
                                    className="text-[13px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
                                    placeholder="Ex: P000001"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="defPrac" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Default Practitioner ID</Label>
                                <Input 
                                    id="defPrac"
                                    value={config.defaultPractitionerId || ""}
                                    onChange={(e) => handleChange("defaultPractitionerId", e.target.value)}
                                    className="text-[13px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
                                    placeholder="Ex: 1000001"
                                />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                                <Label htmlFor="patIdSource" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Patient Identifier Source (NIK)</Label>
                                <Select 
                                    value={config.patientIdSource || "PatientID"} 
                                    onValueChange={(v) => handleChange("patientIdSource", v)}
                                >
                                    <SelectTrigger id="patIdSource" className="w-full text-[13px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
                                        <SelectValue placeholder="Pilih Sumber NIK" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PatientID">PatientID (Default DICOM Tag)</SelectItem>
                                        <SelectItem value="StudyDescription">StudyDescription (Fallback Tag)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-[10px] text-muted-foreground mt-1 italic">
                                    Sumber data yang akan digunakan sistem untuk mencari data Pasien di Satu Sehat.
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 border border-primary/10 dark:border-primary/20 mt-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-primary dark:text-primary flex items-center gap-2">
                                            <HugeiconsIcon icon={RefreshIcon} className="size-4" strokeWidth={2.5} />
                                            Jadwal Auto Sync 
                                        </h4>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                            Sistem otomatis melakukan integrasi pasien secara masal (*Bulk Sync*) di latar belakang.
                                        </p>
                                    </div>
                                    <Switch 
                                        checked={config.autoSyncEnabled} 
                                        onCheckedChange={(v) => handleChange("autoSyncEnabled", v)} 
                                    />
                                </div>
                                
                                {config.autoSyncEnabled && (
                                    <div className="grid grid-cols-2 gap-4 mt-2 p-3 bg-white/60 dark:bg-slate-900/60 rounded-lg border border-primary/10 dark:border-primary/20 animate-in slide-in-from-top-2">
                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Frekuensi</Label>
                                            <Select 
                                                value={config.autoSyncFrequency} 
                                                onValueChange={(v) => handleChange("autoSyncFrequency", v)}
                                            >
                                                <SelectTrigger className="w-full text-xs h-8">
                                                    <SelectValue placeholder="Pilih Frekuensi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="DAILY">Setiap Hari</SelectItem>
                                                    <SelectItem value="EVERY_3_DAYS">Setiap 3 Hari</SelectItem>
                                                    <SelectItem value="WEEKLY">Seminggu Sekali</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Jam Eksekusi</Label>
                                            <Input 
                                                type="time"
                                                value={config.autoSyncTime}
                                                onChange={(e) => handleChange("autoSyncTime", e.target.value)}
                                                className="w-full text-xs h-8"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Column 2: Advanced Resource Overrides */}
                <Card className="border-2 border-slate-200/60 dark:border-slate-800 shadow-sm bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base flex items-center gap-2 dark:text-slate-100">
                            <HugeiconsIcon icon={Settings05Icon} className="size-4 text-primary" strokeWidth={2.5} />
                            Advanced Resource Overrides
                        </CardTitle>
                        <CardDescription className="text-xs dark:text-slate-400">URL spesifik per resource (Jangan ganti jika tidak perlu).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            {[
                                { id: "encounterUrl", label: "Encounter" },
                                { id: "conditionUrl", label: "Condition" },
                                { id: "serviceRequestUrl", label: "Service Request" },
                                { id: "imagingStudyUrl", label: "Imaging Study" },
                                { id: "observationUrl", label: "Observation" },
                                { id: "diagnosticReportUrl", label: "Diagnostic Report" },
                                { id: "compositionUrl", label: "Composition" },
                                { id: "patientUrl", label: "Patient" },
                                { id: "locationUrl", label: "Location" },
                                { id: "practitionerUrl", label: "Practitioner" },
                            ].map((resource) => (
                                <div key={resource.id} className="space-y-1">
                                    <Label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter ml-1">{resource.label}</Label>
                                    <Input 
                                        value={config[resource.id] || ""}
                                        onChange={(e) => handleChange(resource.id, e.target.value)}
                                        className="text-[10px] font-mono bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm py-1 h-8 dark:text-slate-300"
                                        placeholder="Auto-derived"
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Separator className="my-6" />

            {/* DICOM Router Tester Section */}
            <SatuSehatIntegrationTester />
        </div>
    );
}

function SatuSehatIntegrationTester() {
    const [accessionNumber, setAccessionNumber] = useState("");
    const [patientName, setPatientName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Order, 2: DICOM, 3: Verify
    
    const [orderResult, setOrderResult] = useState<{ id: string, patientId: string, logs: string[] } | null>(null);
    const [dicomResult, setDicomResult] = useState<{ id: string, logs: string[] } | null>(null);
    const [statusResult, setStatusResult] = useState<{ serviceRequest?: any, imagingStudy?: any, logs: string[] } | null>(null);

    const handleCreateOrder = async () => {
        if (!accessionNumber) {
            toast.error("Accession Number wajib diisi!");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/config/satusehat/test-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessionNumber, patientName }),
            });
            
            const data = await res.json();
            if (res.ok) {
                setOrderResult(data);
                toast.success("Step 1 Berhasil: Order dibuat di SatuSehat!");
                setStep(2);
            } else {
                toast.error(data.error || "Gagal membuat Test Order");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan sistem saat membuat order");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateDicom = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/config/satusehat/test-dicom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    accessionNumber, 
                    patientName, 
                    patientId: orderResult?.patientId 
                }),
            });
            
            const data = await res.json();
            if (res.ok) {
                setDicomResult(data);
                toast.success("Step 2 Berhasil: DICOM sampel dikirim ke Orthanc!");
                setStep(3);
            } else {
                toast.error(data.error || "Gagal membuat DICOM di Orthanc");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan sistem saat membuat DICOM");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyStatus = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/config/satusehat/test-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessionNumber }),
            });
            
            const data = await res.json();
            if (res.ok) {
                setStatusResult(data);
                if (data.imagingStudy) {
                    toast.success("Step 3 BERHASIL: ImagingStudy ditemukan!");
                } else {
                    toast.info("ServiceRequest ditemukan, menunggu Router memproses DICOM...");
                }
            } else {
                toast.error(data.error || "Gagal mengecek status");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat verifikasi");
        } finally {
            setIsLoading(false);
        }
    };

    const resetTest = () => {
        setStep(1);
        setOrderResult(null);
        setDicomResult(null);
        setStatusResult(null);
        setAccessionNumber("");
        setPatientName("");
    };

    return (
        <Card className="border-2 border-emerald-200/60 dark:border-emerald-900/30 shadow-md bg-emerald-50/20 dark:bg-emerald-950/20 overflow-hidden">
            <CardHeader className="bg-emerald-50/50 dark:bg-emerald-900/30 border-b border-emerald-100 dark:border-emerald-800 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 rounded-lg text-white shadow-sm ring-4 ring-emerald-500/10">
                            <HugeiconsIcon icon={Link01Icon} className="size-5" strokeWidth={2.5} />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-emerald-900 dark:text-emerald-100">SatuSehat Full-Chain Tester</CardTitle>
                            <CardDescription className="text-emerald-700/70 dark:text-emerald-400 text-xs text-balance">
                                Debug integrasi otomatis (Order {'->'} DICOM {'->'} Router {'->'} Resource) tanpa CLI.
                            </CardDescription>
                        </div>
                    </div>
                    {(step > 1 || accessionNumber) && (
                        <Button variant="ghost" size="sm" onClick={resetTest} className="text-emerald-700 hover:bg-emerald-100/50 h-8 gap-1.5 px-3">
                            <HugeiconsIcon icon={Delete02Icon} className="size-3.5" />
                            Reset
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
                {/* Stepper Visual */}
                <div className="relative flex justify-between max-w-2xl mx-auto mb-10">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-emerald-100 dark:bg-emerald-900 -translate-y-1/2 z-0" />
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="relative z-10 flex flex-col items-center gap-2 group">
                            <div className={cn(
                                "size-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-4",
                                step >= s ? "bg-emerald-500 text-white border-emerald-100 dark:border-emerald-800 ring-4 ring-emerald-500/10" : "bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700 border-slate-100 dark:border-slate-800"
                            )}>
                                {step > s ? <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-5" strokeWidth={3} /> : s}
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold uppercase tracking-widest",
                                step >= s ? "text-emerald-700 dark:text-emerald-400" : "text-slate-400 dark:text-slate-600"
                            )}>
                                {s === 1 ? "Create Order" : s === 2 ? "Send DICOM" : "Verify Result"}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/40 dark:bg-slate-900/40 border border-emerald-100 dark:border-emerald-900 rounded-2xl">
                    <div className="space-y-2.5">
                        <Label htmlFor="accNo" className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">Accession Number</Label>
                        <Input 
                            id="accNo"
                            value={accessionNumber}
                            onChange={(e) => setAccessionNumber(e.target.value)}
                            disabled={step > 1}
                            placeholder="Contoh: test-888"
                            className="bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900 focus:ring-emerald-500 h-12 font-mono dark:text-slate-100"
                        />
                    </div>
                    <div className="space-y-2.5">
                        <Label htmlFor="patientNameTest" className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">Nama Pasien</Label>
                        <Input 
                            id="patientNameTest"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            disabled={step > 1}
                            placeholder="Nama Pasien Test"
                            className="bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900 focus:ring-emerald-500 h-12 dark:text-slate-100"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Step 1: Create Order */}
                    <div className={cn("space-y-4 transition-all", step !== 1 && "opacity-50 pointer-events-none")}>
                        <Button 
                            onClick={handleCreateOrder}
                            disabled={isLoading || step !== 1}
                            className="w-full md:w-fit px-8 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-lg shadow-emerald-600/20"
                        >
                            <HugeiconsIcon icon={PlusSignIcon} className="size-4" strokeWidth={3} />
                            Step 1: Create Test Order
                        </Button>
                        {orderResult && (
                            <div className="p-4 bg-white/80 dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-4 animate-in slide-in-from-left-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-800">
                                        <span className="text-emerald-700 dark:text-emerald-400 font-bold tracking-tight">ServiceRequest ID:</span>
                                        <code className="bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded font-bold text-emerald-900 dark:text-emerald-100">{orderResult.id}</code>
                                    </div>
                                    <div className="flex justify-between items-center text-xs p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-800">
                                        <span className="text-blue-700 dark:text-blue-400 font-bold tracking-tight">Patient ID (Sync):</span>
                                        <code className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded font-bold text-blue-900 dark:text-blue-100">{orderResult.patientId}</code>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest opacity-60">Backend Logs</p>
                                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-tight space-y-1 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800 max-h-40 overflow-y-auto">
                                        {orderResult.logs.map((L, i) => <div key={i}>[{i+1}] {L}</div>)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Create DICOM */}
                    <div className={cn("space-y-4 transition-all", step !== 2 && "opacity-50 pointer-events-none")}>
                        <Button 
                            onClick={handleCreateDicom}
                            disabled={isLoading || step !== 2}
                            className="w-full md:w-fit px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-lg shadow-blue-600/20"
                        >
                            <HugeiconsIcon icon={ImageUploadIcon} className="size-4" strokeWidth={3} />
                            Step 2: Push Dummy DICOM to Orthanc
                        </Button>
                        {dicomResult && (
                            <div className="p-4 bg-white/80 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900 rounded-xl space-y-2 animate-in slide-in-from-left-4">
                                <p className="text-xs font-bold text-blue-700 dark:text-blue-400 underline mb-2 tracking-tight">Orthanc Creation Logs:</p>
                                <div className="text-[10px] font-mono text-slate-500 leading-tight space-y-1">
                                    {dicomResult.logs.map((L, i) => <div key={i}>[{i+1}] {L}</div>)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Step 3: Verify Status */}
                    <div className={cn("space-y-4 transition-all", step !== 3 && "opacity-50 pointer-events-none")}>
                        <Button 
                            onClick={handleVerifyStatus}
                            disabled={isLoading || step !== 3}
                            className="w-full md:w-fit px-8 h-12 bg-amber-600 hover:bg-amber-700 text-white font-bold gap-2 shadow-lg shadow-amber-600/20"
                        >
                            <HugeiconsIcon icon={ViewIcon} className="size-4" strokeWidth={3} />
                            Step 3: Verify ImagingStudy Status
                        </Button>
                        
                        {statusResult && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/80 border border-amber-200 rounded-xl">
                                    <p className="text-[10px] font-bold text-amber-700 uppercase mb-3">Service Request</p>
                                    {statusResult.serviceRequest ? (
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-emerald-500 text-white border-none shadow-none">Found</Badge>
                                            <code className="text-xs font-bold">{statusResult.serviceRequest.id}</code>
                                        </div>
                                    ) : (
                                        <Badge variant="outline" className="text-slate-400">Not Created Yet</Badge>
                                    )}
                                </div>
                                <div className="p-4 bg-white/80 border border-amber-200 rounded-xl">
                                    <p className="text-[10px] font-bold text-amber-700 uppercase mb-3">Imaging Study</p>
                                    {statusResult.imagingStudy ? (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Badge className="bg-blue-500 text-white border-none shadow-none">Available</Badge>
                                                <code className="text-xs font-bold">{statusResult.imagingStudy.id}</code>
                                            </div>
                                            <p className="text-[10px] text-slate-500">Instance Count: {statusResult.imagingStudy.seriesCount} Series</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-amber-500 border-amber-200 animate-pulse bg-amber-50">Checking Router...</Badge>
                                            <p className="text-[9px] text-slate-400 font-medium">Tunggu 5-10 detik</p>
                                        </div>
                                    )}
                                </div>
                                <div className="md:col-span-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Diagnostic Logs</p>
                                    <div className="text-[9px] font-mono text-slate-400 leading-relaxed max-h-32 overflow-y-auto">
                                        {statusResult.logs.map((L, i) => <div key={i}>{L}</div>)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
            {step === 3 && statusResult?.imagingStudy && (
                <div className="p-6 bg-emerald-500 text-white flex items-center gap-4 animate-in slide-in-from-bottom-6">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-8" strokeWidth={3} />
                    <div>
                        <h4 className="font-bold text-lg">Integrasi Terverifikasi!</h4>
                        <p className="text-xs opacity-90">PACS, DICOM Router, dan SatuSehat sudah terhubung dengan sempurna untuk nomor aksesi ini.</p>
                    </div>
                </div>
            )}
        </Card>
    );
}

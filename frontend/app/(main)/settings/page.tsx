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
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";

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
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <HugeiconsIcon icon={Settings05Icon} className="size-6 text-primary" strokeWidth={2} />
                    Pengaturan
                </h1>
                <div className="flex items-center gap-4">
                    <p className="text-muted-foreground text-sm">Kelola konfigurasi sistem dan profil fasilitas kesehatan.</p>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        AI Service: Active
                    </Badge>
                </div>
            </header>

            <Separator />

            <Tabs defaultValue="clinic" className="w-full overflow-hidden">
                <TabsList className="flex w-full overflow-x-auto overflow-y-hidden no-scrollbar justify-start h-auto p-1 py-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <TabsTrigger value="clinic" className="gap-2 px-4 whitespace-nowrap shrink-0 flex-1 sm:flex-none">
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
                </TabsList>

                {/* ── Tab: Profil Klinik ── */}
                <TabsContent value="clinic">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-16">
                            <HugeiconsIcon icon={Building04Icon} className="size-8 animate-pulse text-primary/40" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left: Info + Doctors */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <HugeiconsIcon icon={Building04Icon} className="size-4.5 text-primary" strokeWidth={2} />
                                            Informasi Klinik / RS
                                        </CardTitle>
                                        <CardDescription>Tampil di header laporan PDF hasil rontgen</CardDescription>
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

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <HugeiconsIcon icon={UserIcon} className="size-4.5 text-primary" strokeWidth={2} />
                                            Daftar Dokter
                                        </CardTitle>
                                        <CardDescription>Nama dokter bisa dipilih saat mengisi laporan PDF</CardDescription>
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
                                <Card className="h-fit">
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <HugeiconsIcon icon={ImageUploadIcon} className="size-4.5 text-primary" strokeWidth={2} />
                                            Logo Klinik
                                        </CardTitle>
                                        <CardDescription>Maks. 500KB. Tampil di pojok kiri header PDF.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div
                                            className="border-2 border-dashed border-slate-200 rounded-xl aspect-square flex items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-slate-50 transition-all"
                                            onClick={() => logoInputRef.current?.click()}
                                        >
                                            {config.clinicLogo ? (
                                                <img
                                                    src={config.clinicLogo}
                                                    alt="Logo"
                                                    className="max-h-full max-w-full object-contain p-4 rounded-lg"
                                                />
                                            ) : (
                                                <div className="text-center text-slate-400 space-y-2 p-6">
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
                <TabsContent value="ai">
                    <AiSettingsTab />
                </TabsContent>

                {/* ── Tab: Notifikasi Telegram ── */}
                <TabsContent value="telegram">
                    <TelegramSettingsTab />
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
        setIsSaving(true);
        try {
            const res = await fetch("/api/config/telegram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ botToken, chatId }),
            });
            
            if (res.ok) {
                toast.success("Konfigurasi berhasil disimpan");
                // Refresh data to update mask/source
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
                <Card className="border-primary/10 shadow-sm overflow-hidden">
                    <CardHeader className="bg-primary/5 pb-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <HugeiconsIcon icon={RoboticIcon} className="size-4.5 text-primary" strokeWidth={2} />
                                    Telegram API Settings
                                </CardTitle>
                                <CardDescription className="text-xs">
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
                                    onChange={(e) => setBotToken(e.target.value)}
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
                                    onChange={(e) => setChatId(e.target.value)}
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
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-900 shadow-sm">
                        <div className="bg-blue-500 text-white rounded-lg p-2 h-fit shrink-0">
                            <HugeiconsIcon icon={InformationCircleIcon} className="size-4" strokeWidth={3} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold leading-tight">Database Priority</h4>
                            <p className="text-xs text-blue-800/80 leading-relaxed">
                                Sistem membaca konfig dari Database terlebih dahulu sebelum mengambil dari file .env.
                            </p>
                        </div>
                    </div>
                    <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 flex gap-3 text-amber-900 shadow-sm">
                        <div className="bg-amber-500 text-white rounded-lg p-2 h-fit shrink-0">
                            <HugeiconsIcon icon={CircleIcon} className="size-4" strokeWidth={3} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold leading-tight">Privacy Focus</h4>
                            <p className="text-xs text-amber-800/80 leading-relaxed">
                                Token bot Anda di-mask secara otomatis. Pastikan bot sudah di-Start di Telegram.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tutorial Section */}
            <div className="space-y-6">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            <HugeiconsIcon icon={InformationCircleIcon} className="size-4 text-blue-500" strokeWidth={2.5} />
                            Langkah-langkah
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-sm">
                        <div className="space-y-4">
                            <div className="flex gap-3 relative">
                                <div className="absolute left-[9px] top-6 bottom-[-16px] w-[2px] bg-slate-100" />
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 size-5 p-0 flex items-center justify-center rounded-sm shrink-0 font-bold z-10 border-none">1</Badge>
                                <div className="space-y-1">
                                    <p className="font-bold text-xs uppercase tracking-tighter">Chat @BotFather</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Ketik <code className="bg-slate-100 px-1 rounded">/newbot</code> di BotFather.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 relative">
                                <div className="absolute left-[9px] top-6 bottom-[-16px] w-[2px] bg-slate-100" />
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 size-5 p-0 flex items-center justify-center rounded-sm shrink-0 font-bold z-10 border-none">2</Badge>
                                <div className="space-y-1">
                                    <p className="font-bold text-xs uppercase tracking-tighter">Get API Token</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Copy token dari BotFather dan paste di input samping.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 size-5 p-0 flex items-center justify-center rounded-sm shrink-0 font-bold z-10 border-none"><HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3" strokeWidth={4} /></Badge>
                                <div className="space-y-1">
                                    <p className="font-bold text-xs uppercase tracking-tighter">Start Bot!</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed text-emerald-700">
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
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <HugeiconsIcon icon={CpuIcon} className="size-4.5 text-primary" strokeWidth={2} />
                            Status Kecerdasan Buatan (AI)
                        </CardTitle>
                        <CardDescription>Atur bagaimana sistem memproses DICOM menggunakan model AI.</CardDescription>
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
                                            ? "border-primary bg-primary/5 ring-2 ring-primary/10 shadow-sm" 
                                            : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                                    )}
                                >
                                    <div className={cn(
                                        "p-2.5 rounded-lg shrink-0 transition-colors",
                                        mode === item.id ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
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
                <Card className="bg-slate-50 border-slate-200">
                    <CardHeader className="pb-3 border-b border-slate-200/60 mb-2">
                        <CardTitle className="text-sm font-bold flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <HugeiconsIcon icon={Settings05Icon} className="size-4" />
                                Hardware & System Metrics
                            </span>
                            {systemMetrics?.ai?.status === "Connected" ? (
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[10px] h-5 shadow-none px-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />Online</Badge>
                            ) : (
                                <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200 text-[10px] h-5 shadow-none px-1.5"><div className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1" />Offline</Badge>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-4 text-slate-600 pt-2">
                        {systemMetrics ? (
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                                    <span className="text-muted-foreground font-medium">OS Server:</span>
                                    <span className="font-mono text-slate-800 uppercase">{systemMetrics.system?.platform} ({systemMetrics.system?.arch})</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                                    <span className="text-muted-foreground font-medium">CPU Cores:</span>
                                    <span className="font-mono text-slate-800">{systemMetrics.system?.cpuCount} vCPU</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                                    <span className="text-muted-foreground font-medium">Memori Terpakai:</span>
                                    <span className="font-mono text-slate-800">{systemMetrics.system?.usedMemGb} GB / {systemMetrics.system?.totalMemGb} GB</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                                    <span className="text-muted-foreground font-medium">AI Hardware Device:</span>
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 shadow-none uppercase">
                                        {systemMetrics.ai?.device}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center pb-1">
                                    <span className="text-muted-foreground font-medium">Engine Build:</span>
                                    <span className="font-mono text-slate-800 font-bold tracking-tighter bg-slate-200/50 px-1.5 py-0.5 rounded">{systemMetrics.ai?.backendMode}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-4 text-slate-400">Loading system metrics...</div>
                        )}
                        
                        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-blue-900 mt-2 shadow-sm">
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

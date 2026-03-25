"use client";

import React, { useState, useEffect } from "react";
import { 
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
    HugeiconsIcon 
} from "@hugeicons/react";
import { 
    RoboticIcon, 
    ViewIcon, 
    ViewOffSlashIcon, 
    Copy01Icon, 
    CheckmarkCircle02Icon,
    AlertCircleIcon,
    InformationCircleIcon,
    Message01Icon,
    FloppyDiskIcon
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function TelegramBotConfigPage() {
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
            <div className="flex h-full items-center justify-center p-8">
                <HugeiconsIcon icon={RoboticIcon} className="size-8 animate-pulse text-primary/50" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight">Bot Telegram API</h1>
                <p className="text-muted-foreground">
                    Konfigurasi bot Telegram untuk notifikasi dan preview hasil imaging.
                </p>
            </header>

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration Section */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-primary/10 shadow-sm overflow-hidden">
                        <CardHeader className="bg-primary/5 pb-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <HugeiconsIcon icon={RoboticIcon} className="size-5 text-primary" strokeWidth={2} />
                                        API Settings
                                    </CardTitle>
                                    <CardDescription>
                                        Masukkan token API dan ID chat bot Anda di sini.
                                    </CardDescription>
                                </div>
                                {configInfo && (
                                    <Badge variant={configInfo.source === "database" ? "default" : "secondary"}>
                                        Source: {configInfo.source === "database" ? "Database (Override)" : "Environment (.env)"}
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
                                        placeholder="Ex: 8601553740:AAHt68wyfkL5XUw1QHa5..."
                                        value={botToken}
                                        onChange={(e) => setBotToken(e.target.value)}
                                        className="pr-10 font-mono text-sm tracking-tighter"
                                    />
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="shrink-0 aspect-square"
                                        onClick={() => copyToClipboard(botToken, "Token")}
                                        title="Copy to clipboard"
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
                                        className="font-mono text-sm"
                                    />
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="shrink-0 aspect-square"
                                        onClick={() => copyToClipboard(chatId, "Chat ID")}
                                        title="Copy to clipboard"
                                    >
                                        <HugeiconsIcon icon={Copy01Icon} className="size-4" />
                                    </Button>
                                </div>
                                <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 ml-1">
                                    <HugeiconsIcon icon={InformationCircleIcon} className="size-3" />
                                    Bisa ID user pribadi, ID group (pake tanda minus), atau ID channel.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/50 border-t flex flex-wrap gap-3 justify-between p-6">
                            <Button 
                                variant="outline" 
                                className="gap-2 shrink-0 h-10 px-6 font-medium"
                                onClick={handleTest}
                                disabled={isTesting || isSaving}
                            >
                                <HugeiconsIcon icon={Message01Icon} className={cn("size-4", isTesting && "animate-bounce")} strokeWidth={2} />
                                {isTesting ? "Testing..." : "Test Connection"}
                            </Button>
                            <Button 
                                className="gap-2 shrink-0 h-10 px-8 font-semibold shadow-md active:scale-95 transition-all"
                                onClick={handleSave}
                                disabled={isSaving || isTesting}
                            >
                                <HugeiconsIcon icon={FloppyDiskIcon} className={cn("size-4", isSaving && "animate-spin")} strokeWidth={2} />
                                {isSaving ? "Saving..." : "Save Settings"}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Status Legend */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-900 shadow-sm">
                            <div className="bg-blue-500 text-white rounded-lg p-2 h-fit shrink-0">
                                <HugeiconsIcon icon={InformationCircleIcon} className="size-4" strokeWidth={3} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold">Fallback Logic</h4>
                                <p className="text-xs text-blue-800/80 leading-relaxed">
                                    Sistem akan mencoba membaca token dari **database** terlebih dahulu. 
                                    Jika kosong, sistem akan mengambil nilai dari **Environment Variable (.env)**.
                                </p>
                            </div>
                        </div>
                        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 flex gap-3 text-amber-900 shadow-sm">
                            <div className="bg-amber-500 text-white rounded-lg p-2 h-fit shrink-0">
                                <HugeiconsIcon icon={AlertCircleIcon} className="size-4" strokeWidth={3} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold">Security Note</h4>
                                <p className="text-xs text-amber-800/80 leading-relaxed">
                                    Token bot Anda dirahasiakan (masked). Hanya admin yang memiliki hak akses penuh ke modul ini. 
                                    Jangan sebarkan token ini ke siapapun.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tutorial Section */}
                <div className="space-y-6">
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <HugeiconsIcon icon={InformationCircleIcon} className="size-4.5 text-blue-500" strokeWidth={2.5} />
                                Cara Setting Bot
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 text-sm">
                            <div className="space-y-4">
                                <div className="flex gap-3 relative">
                                    <div className="absolute left-[9px] top-6 bottom-[-16px] w-[2px] bg-slate-100" />
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 size-5 p-0 flex items-center justify-center rounded-sm shrink-0 font-bold z-10 border-none">1</Badge>
                                    <div className="space-y-1">
                                        <p className="font-bold">Chat @BotFather</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Cari <span className="font-mono text-primary font-semibold">@BotFather</span> di Telegram, ketik <code className="bg-slate-100 px-1 rounded">/newbot</code> dan ikuti instruksinya.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 relative">
                                    <div className="absolute left-[9px] top-6 bottom-[-16px] w-[2px] bg-slate-100" />
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 size-5 p-0 flex items-center justify-center rounded-sm shrink-0 font-bold z-10 border-none">2</Badge>
                                    <div className="space-y-1">
                                        <p className="font-bold">Copy API Token</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            BotFather akan memberikan token panjang. Copy dan paste di input di samping.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 relative">
                                    <div className="absolute left-[9px] top-6 bottom-[-16px] w-[2px] bg-slate-100" />
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 size-5 p-0 flex items-center justify-center rounded-sm shrink-0 font-bold z-10 border-none">3</Badge>
                                    <div className="space-y-1">
                                        <p className="font-bold">Get Your Chat ID</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Chat <span className="font-mono text-primary font-semibold">@userinfobot</span> untuk mendapatkan ID anda. Paste di input Chat ID.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 size-5 p-0 flex items-center justify-center rounded-sm shrink-0 font-bold z-10 border-none"><HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3" strokeWidth={4} /></Badge>
                                    <div className="space-y-1">
                                        <p className="font-bold">Start Your Bot!</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Klik tombol **Start** pada bot baru Anda agar ia bisa mengirim pesan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator />
                            
                            <div className="bg-slate-50 border p-3 rounded-lg flex items-center gap-3">
                                <div className="size-8 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm shadow-blue-200">
                                    <HugeiconsIcon icon={RoboticIcon} className="size-5" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Bot Username</p>
                                    <p className="text-xs font-mono font-bold truncate">@YourNewCustomBot</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}



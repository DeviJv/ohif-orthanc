"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from "@/components/ui/card";
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

export default function ClinicSettingsPage() {
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
        reader.onload = (ev) => {
            setConfig((prev) => ({ ...prev, clinicLogo: ev.target?.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleDoctorChange = (idx: number, value: string) => {
        setConfig((prev) => {
            const doctors = [...prev.doctors];
            doctors[idx] = value;
            return { ...prev, doctors };
        });
    };

    const addDoctor = () => setConfig((prev) => ({ ...prev, doctors: [...prev.doctors, ""] }));

    const removeDoctor = (idx: number) =>
        setConfig((prev) => ({ ...prev, doctors: prev.doctors.filter((_, i) => i !== idx) }));

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const cleanedDoctors = config.doctors.filter((d) => d.trim() !== "");
            const res = await fetch("/api/config/clinic", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...config, doctors: cleanedDoctors }),
            });
            if (res.ok) {
                toast.success("Konfigurasi klinik berhasil disimpan");
            } else {
                toast.error("Gagal menyimpan konfigurasi");
            }
        } catch {
            toast.error("Terjadi kesalahan saat menyimpan");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <HugeiconsIcon icon={Building04Icon} className="size-8 animate-pulse text-primary/50" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 max-w-4xl mx-auto">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight">Pengaturan Profil Klinik</h1>
                <p className="text-muted-foreground">
                    Data ini digunakan sebagai header pada laporan hasil rontgen (PDF).
                </p>
            </header>

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Clinic Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <HugeiconsIcon icon={Building04Icon} className="size-4.5 text-primary" strokeWidth={2} />
                                Informasi Klinik / RS
                            </CardTitle>
                            <CardDescription>Nama, alamat, dan kontak yang tampil di header PDF</CardDescription>
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
                                <Label htmlFor="clinicAddress">Alamat</Label>
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

                    {/* Doctors */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <HugeiconsIcon icon={UserIcon} className="size-4.5 text-primary" strokeWidth={2} />
                                Daftar Dokter
                            </CardTitle>
                            <CardDescription>Nama dokter yang bisa dipilih saat mengisi laporan PDF</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {config.doctors.map((doc, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <Input
                                        placeholder={`dr. Nama Dokter, Sp.Rad`}
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

                {/* Logo Upload */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <HugeiconsIcon icon={ImageUploadIcon} className="size-4.5 text-primary" strokeWidth={2} />
                                Logo Klinik
                            </CardTitle>
                            <CardDescription>Maks. 500KB. Akan tampil di pojok kiri header PDF.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div
                                className="border-2 border-dashed border-slate-200 rounded-xl aspect-square flex items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-slate-50 transition-all"
                                onClick={() => logoInputRef.current?.click()}
                            >
                                {config.clinicLogo ? (
                                    <img
                                        src={config.clinicLogo}
                                        alt="Logo Klinik"
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
                            <input
                                ref={logoInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleLogoUpload}
                            />
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
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <Button
                    className="gap-2 h-10 px-8 font-semibold shadow-md active:scale-95 transition-all"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    <HugeiconsIcon icon={FloppyDiskIcon} className="size-4" strokeWidth={2} />
                    {isSaving ? "Menyimpan..." : "Simpan Pengaturan"}
                </Button>
            </div>
        </div>
    );
}

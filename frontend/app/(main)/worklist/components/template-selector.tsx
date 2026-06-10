"use client";

import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import { RefreshIcon } from "@hugeicons/core-free-icons";

interface TemplateSelectorProps {
    doctorId: string;
    onSelectTemplate: (templateText: string) => void;
}

export function TemplateSelector({ doctorId, onSelectTemplate }: TemplateSelectorProps) {
    const [templates, setTemplates] = useState<{ id: string, nama: string, template: string }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!doctorId) {
            setTemplates([]);
            return;
        }

        setLoading(true);
        fetch(`/api/template-exercise?userId=${doctorId}&limit=100`)
            .then(res => res.json())
            .then(data => {
                if (data.items) {
                    setTemplates(data.items);
                }
            })
            .catch(err => console.error("Error fetching templates:", err))
            .finally(() => setLoading(false));
    }, [doctorId]);

    if (!doctorId) {
        return (
            <div className="flex items-center text-xs text-muted-foreground bg-muted/50 p-2 rounded border">
                Pilih dokter terlebih dahulu untuk melihat daftar template
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center gap-2 text-xs text-muted-foreground p-2 border rounded bg-background">
                <HugeiconsIcon icon={RefreshIcon} className="size-3 animate-spin" />
                Memuat template dokter...
            </div>
        );
    }

    if (templates.length === 0) {
        return (
            <div className="flex items-center text-xs text-muted-foreground bg-muted/50 p-2 rounded border">
                Dokter ini belum memiliki template exercise
            </div>
        );
    }

    return (
        <Select 
            onValueChange={(val) => {
                const tpl = templates.find(t => t.nama === val);
                if (tpl) onSelectTemplate(tpl.template);
            }}
        >
            <SelectTrigger className="w-full h-9 text-xs bg-background border">
                <SelectValue placeholder="Pilih template untuk disalin ke Exercise..." />
            </SelectTrigger>
            <SelectContent>
                {templates.map(tpl => (
                    <SelectItem key={tpl.id} value={tpl.nama} className="text-xs">
                        {tpl.nama}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

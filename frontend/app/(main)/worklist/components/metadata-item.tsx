"use client";

import { toast } from "sonner";
import { Copy01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";

export const MetadataItem = ({ 
    label, 
    value, 
    copyable = false, 
    small = false 
}: { 
    label: string; 
    tag?: string; 
    value?: string; 
    copyable?: boolean; 
    small?: boolean 
}) => {
    if (!value) return null;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    return (
        <div className={`flex items-start justify-between gap-4 ${small ? "text-[11px]" : "text-sm"}`}>
            <div className="flex items-center gap-2 shrink-0">
                <span className="text-muted-foreground font-medium">{label}:</span>
            </div>
            <div className="flex items-center gap-2 overflow-hidden">
                <span className="font-semibold truncate text-right" title={value}>{value}</span>
                {copyable && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-4 shrink-0 hover:text-primary"
                        onClick={() => copyToClipboard(value)}
                    >
                        <HugeiconsIcon icon={Copy01Icon} className="size-3" />
                    </Button>
                )}
            </div>
        </div>
    );
};

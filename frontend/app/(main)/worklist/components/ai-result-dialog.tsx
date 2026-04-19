"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    AiCloud01Icon, 
    Alert01Icon, 
    InformationCircleIcon,
    Tick02Icon
} from "@hugeicons/core-free-icons";

interface AiResultDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    result: any | null;
    patientName?: string;
}

export const AiResultDialog = React.memo(({
    open,
    onOpenChange,
    result,
    patientName
}: AiResultDialogProps) => {
    if (!result) return null;

    // Filter findings to only show numeric results (probabilities)
    const findings = result.findings ? (typeof result.findings === 'string' ? JSON.parse(result.findings) : result.findings) : {};
    const probabilityEntries = Object.entries(findings).filter(([_, v]) => typeof v === 'number');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-7xl overflow-hidden p-0 gap-0">
                <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                    {/* Left Side: Visual Heatmap Image */}
                    <div className="md:w-1/2 bg-slate-950 flex flex-col items-center justify-center relative min-h-[300px] border-r border-slate-800">
                        {result.heatmapBase64 ? (
                            <>
                                <img 
                                    src={result.heatmapBase64} 
                                    alt="AI Heatmap Visualization" 
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                                    <p className="text-[10px] text-white/80 leading-tight">
                                        <span className="text-rose-400 font-bold shrink-0 mr-1">HEATMAP:</span> 
                                        Area berwarna merah menunjukkan probabilitas temuan tertinggi yang dideteksi oleh AI.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-3 text-slate-500">
                                <HugeiconsIcon icon={AiCloud01Icon} className="size-12 opacity-20" />
                                <p className="text-xs italic">Visual heatmap not available for this modality</p>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Analysis Findings */}
                    <div className="md:w-1/2 flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
                        <DialogHeader className="p-6 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-2 text-left">
                                <div className={`p-2 rounded-xl shrink-0 ${result.isUrgent ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    <HugeiconsIcon icon={AiCloud01Icon} className="size-6" />
                                </div>
                                <div>
                                    <DialogTitle className="text-xl dark:text-slate-100">AI Analysis Result</DialogTitle>
                                    <DialogDescription className="text-xs dark:text-slate-400">
                                        Detail temuan untuk pasien <span className="font-bold text-foreground dark:text-slate-200">{patientName || 'N/A'}</span>
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Summary & Conclusion */}
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-[10px] font-bold uppercase text-slate-500 mb-2 flex items-center gap-2 tracking-wider">
                                    <HugeiconsIcon icon={InformationCircleIcon} className="size-3" />
                                    Kesimpulan AI
                                </h4>
                                <p className={`text-xl font-black tracking-tight leading-tight ${result.isUrgent ? 'text-rose-600' : 'text-emerald-700'}`}>
                                    {result.conclusion}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge variant={result.isUrgent ? "destructive" : "secondary"} className="rounded-lg text-[10px] px-2 py-0 h-5">
                                        Modality: {result.modality}
                                    </Badge>
                                    {result.isUrgent && (
                                        <Badge className="bg-rose-500 hover:bg-rose-600 rounded-lg animate-pulse gap-1 text-[10px] px-2 py-0 h-5 border-none">
                                            <HugeiconsIcon icon={Alert01Icon} className="size-2" />
                                            Urgent
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Probabilities List */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold uppercase text-slate-500 mb-4 flex items-center gap-2 tracking-wider">
                                    <HugeiconsIcon icon={Tick02Icon} className="size-3" />
                                    Probability Findings
                                </h4>
                                <div className="grid grid-cols-1 gap-2.5">
                                    {probabilityEntries.length > 0 ? (
                                        probabilityEntries.sort((a, b) => (b[1] as number) - (a[1] as number)).map(([key, value]) => {
                                            const percent = (value as number) * 100;
                                            if (percent < 1) return null; // Only show significant findings
                                            return (
                                                <div key={key} className="p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-colors">
                                                     <div className="flex justify-between text-[11px] font-semibold mb-1.5">
                                                        <span className="capitalize text-slate-700 dark:text-slate-300">{key.replace(/_/g, ' ')}</span>
                                                        <span className={percent > 50 ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-emerald-600 dark:text-emerald-400'}>
                                                            {(percent).toFixed(1)}%
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full transition-all duration-1000 ${percent > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                                            style={{ width: `${percent}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-8 text-slate-400 dark:text-slate-600 text-xs italic">
                                            No detailed findings available.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
                            <div className="text-[10px] text-slate-400 italic leading-relaxed">
                                <strong>Disclaimer:</strong> AI-Generated Preliminary Report. Hasil ini adalah prediksi algoritma dan harus divalidasi oleh Radiolog.
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
});

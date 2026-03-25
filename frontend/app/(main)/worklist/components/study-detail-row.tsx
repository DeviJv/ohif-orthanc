"use client";

import React, { useState } from "react";
import { 
    Tag01Icon, 
    ShieldIcon, 
    Search01Icon, 
    UserIcon, 
    ArrowDown01Icon, 
    ViewIcon, 
    Download01Icon, 
    Delete01Icon,
    RefreshIcon,
    Copy01Icon,
    Upload01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Study, Series, Instance, DicomTags } from "../types";
import { MetadataItem } from "./metadata-item";
import { formatDicomDate, formatDicomTime } from "../utils/format";
import { UploadSeriesDialog } from "./upload-series-dialog";

interface StudyDetailRowProps {
    study: Study;
    studies: Study[];
    seriesData: Record<string, Series[]>;
    instancesData: Record<string, Instance[]>;
    tagsData: Record<string, DicomTags>;
    expandedSeries: Record<string, boolean>;
    expandedInstances: Record<string, boolean>;
    toggleSeriesExpansion: (id: string) => void;
    toggleInstanceExpansion: (id: string) => void;
    handleAnonymize: (id: string, type: "study" | "series") => void;
    handleOpenOrthancViewer: (id: string, type: "study" | "series" | "instance") => void;
    handleDownloadSeries: (id: string, desc: string) => void;
    handleDeleteSeries: (id: string, studyId: string) => void;
    handleDownloadInstance: (id: string, num: string) => void;
    handleDeleteInstance: (id: string, seriesId: string) => void;
    handleAddLabel: (id: string) => void;
    handleRemoveLabel: (id: string, label: string) => void;
    handleUploadSeries: (files: FileList, studyId: string) => Promise<void>;
    columnsCount: number;
}

export function StudyDetailRow({
    study,
    studies,
    seriesData,
    instancesData,
    tagsData,
    expandedSeries,
    expandedInstances,
    toggleSeriesExpansion,
    toggleInstanceExpansion,
    handleAnonymize,
    handleOpenOrthancViewer,
    handleDownloadSeries,
    handleDeleteSeries,
    handleDownloadInstance,
    handleDeleteInstance,
    handleAddLabel,
    handleRemoveLabel,
    handleUploadSeries,
    columnsCount
}: StudyDetailRowProps) {
    const [isUploadSeriesOpen, setIsUploadSeriesOpen] = useState(false);
    const patientName = study.PatientMainDicomTags?.PatientName || study.MainDicomTags.PatientName;
    return (
        <TableRow className="bg-muted/30 hover:bg-muted/30 border-none">
            <TableCell colSpan={columnsCount} className="p-0">
                <div className="p-6 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Labels Section */}
                    <div className="flex flex-wrap gap-2 items-center bg-muted/20 p-3 rounded-lg border border-dashed border-slate-300">
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mr-2">
                            <HugeiconsIcon icon={Tag01Icon} className="size-3" />
                            LABELS:
                        </div>
                        {study.Labels?.map((label: string) => (
                            <span key={label} className="group relative flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded border border-primary/20">
                                {label}
                                <button 
                                    onClick={() => handleRemoveLabel(study.ID, label)}
                                    className="hover:text-destructive transition-colors ml-1"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        <Button 
                            variant="ghost" 
                            size="xs" 
                            className="h-6 gap-1 text-[10px] border border-dashed border-slate-400 hover:border-primary hover:text-primary"
                            onClick={() => handleAddLabel(study.ID)}
                        >
                            + Add Label
                        </Button>
                    </div>

                    {/* Study Metadata Grid */}
                    <div className="grid grid-cols-2 gap-8 bg-background p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden mb-8">
                        <div className="absolute bottom-0 right-0 p-4 flex gap-1 bg-muted/30 rounded-tl-xl border-l border-t backdrop-blur-sm z-10">
                            <Button variant="ghost" size="icon-sm" className="size-8 hover:bg-background" title="Anonymize Study" onClick={() => handleAnonymize(study.ID, "study")}>
                                <HugeiconsIcon icon={ShieldIcon} className="size-4 text-primary" />
                            </Button>
                            <Button variant="ghost" size="icon-sm" className="size-8 hover:bg-background" title="View in Orthanc Explorer" onClick={() => handleOpenOrthancViewer(study.ID, "study")}>
                                <HugeiconsIcon icon={Search01Icon} className="size-4 text-primary" />
                            </Button>
                        </div>
                        <div className="space-y-3">
                             <MetadataItem label="Study Date" value={formatDicomDate(study.MainDicomTags.StudyDate)} />
                             <MetadataItem label="Study Time" value={formatDicomTime(study.MainDicomTags.StudyTime)} />
                             <MetadataItem label="Study Description" value={study.MainDicomTags.StudyDescription} />
                             <MetadataItem label="Accession Number" value={study.MainDicomTags.AccessionNumber} />
                             <MetadataItem label="Study ID" value={study.MainDicomTags.StudyID} />
                             <MetadataItem label="Study Instance UID" value={study.MainDicomTags.StudyInstanceUID} copyable />
                             <MetadataItem label="Referring Physician" value={study.MainDicomTags.ReferringPhysicianName} />
                             <MetadataItem label="Institution Name" value={study.MainDicomTags.InstitutionName} />
                         </div>
                         <div className="space-y-3">
                             <MetadataItem label="Patient ID" value={study.MainDicomTags.PatientID} copyable />
                             <MetadataItem label="Patient Name" value={study.PatientMainDicomTags?.PatientName || study.MainDicomTags.PatientName} copyable />
                             <MetadataItem label="Patient Birth Date" value={study.PatientMainDicomTags?.PatientBirthDate} />
                             <MetadataItem label="Patient Sex" value={study.PatientMainDicomTags?.PatientSex} />
                            
                            <div className="mt-6 pt-4 border-t border-slate-100">
                                <div className="text-[11px] text-muted-foreground flex items-center gap-2 mb-2">
                                    <HugeiconsIcon icon={UserIcon} className="size-3" />
                                    Other studies for this patient:
                                </div>
                                <div className="text-[11px] italic text-slate-400">
                                    {studies.filter(s => s.MainDicomTags.PatientID === study.MainDicomTags.PatientID && s.ID !== study.ID).length === 0 
                                        ? "This patient has no other studies." 
                                        : `${studies.filter(s => s.MainDicomTags.PatientID === study.MainDicomTags.PatientID && s.ID !== study.ID).length} other studies found.`}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Series Table */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-4 bg-primary rounded-full" />
                                Series List
                            </h3>
                            <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 text-xs h-7 border-primary/30 text-primary hover:bg-primary/5"
                                onClick={() => setIsUploadSeriesOpen(true)}
                            >
                                <HugeiconsIcon icon={Upload01Icon} className="size-3" />
                                Add Series
                            </Button>
                        </div>
                        <div className="rounded-lg border bg-background overflow-hidden">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="w-10"></TableHead>
                                        <TableHead className="text-[11px] font-bold uppercase">Series Number</TableHead>
                                        <TableHead className="text-[11px] font-bold uppercase">Description</TableHead>
                                        <TableHead className="text-[11px] font-bold uppercase">Modality</TableHead>
                                        <TableHead className="text-[11px] font-bold uppercase">Instances</TableHead>
                                        <TableHead className="text-right text-[11px] font-bold uppercase">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {!seriesData[study.ID] ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                <HugeiconsIcon icon={RefreshIcon} className="size-4 animate-spin inline mr-2" />
                                                Loading series...
                                            </TableCell>
                                        </TableRow>
                                    ) : seriesData[study.ID].length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                No series found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        seriesData[study.ID].map((series) => (
                                            <React.Fragment key={series.ID}>
                                                <TableRow className="hover:bg-muted/50 cursor-pointer">
                                                    <TableCell>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="size-7"
                                                            onClick={() => toggleSeriesExpansion(series.ID)}
                                                        >
                                                            <HugeiconsIcon
                                                                icon={ArrowDown01Icon}
                                                                className={`size-3 transition-transform duration-200 ${expandedSeries[series.ID] ? "rotate-180" : ""}`}
                                                            />
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell className="font-medium">{series.MainDicomTags.SeriesNumber}</TableCell>
                                                    <TableCell>{series.MainDicomTags.SeriesDescription || "-"}</TableCell>
                                                    <TableCell>
                                                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded">
                                                            {series.MainDicomTags.Modality}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>{series.Instances.length}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-1">
                                                            <Button 
                                                                size="icon-xs" 
                                                                variant="outline" 
                                                                title="View Series in Orthanc"
                                                                onClick={() => handleOpenOrthancViewer(series.ID, "series")}
                                                            >
                                                                <HugeiconsIcon icon={ViewIcon} className="size-3" />
                                                            </Button>
                                                            <Button 
                                                                size="icon-xs" 
                                                                variant="outline" 
                                                                title="Anonymize Series"
                                                                onClick={() => handleAnonymize(series.ID, "series")}
                                                            >
                                                                <HugeiconsIcon icon={ShieldIcon} className="size-3" />
                                                            </Button>
                                                            <Button 
                                                                size="icon-xs" 
                                                                variant="outline" 
                                                                title="Download Series ZIP"
                                                                onClick={() => handleDownloadSeries(series.ID, series.MainDicomTags.SeriesDescription)}
                                                            >
                                                                <HugeiconsIcon icon={Download01Icon} className="size-3" />
                                                            </Button>
                                                            <Button 
                                                                size="icon-xs" 
                                                                variant="outline" 
                                                                className="text-destructive hover:text-destructive" 
                                                                title="Delete Series"
                                                                onClick={() => handleDeleteSeries(series.ID, study.ID)}
                                                            >
                                                                <HugeiconsIcon icon={Delete01Icon} className="size-3" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                {expandedSeries[series.ID] && (
                                                    <TableRow className="bg-muted/10 hover:bg-muted/10 border-none">
                                                        <TableCell colSpan={6} className="p-4 pt-0">
                                                            <div className="space-y-4 pl-10 border-l-2 border-primary/20 ml-3">
                                                                {/* Series Metadata */}
                                                                 <div className="grid grid-cols-2 gap-4 text-[11px] bg-background/30 p-3 rounded-lg border">
                                                                     <div className="space-y-1">
                                                                         <MetadataItem label="Series Date" value={formatDicomDate(series.MainDicomTags.SeriesDate)} small />
                                                                         <MetadataItem label="Series Time" value={formatDicomTime(series.MainDicomTags.SeriesTime)} small />
                                                                         <MetadataItem label="Protocol Name" value={series.MainDicomTags.ProtocolName} small />
                                                                         <MetadataItem label="Body Part" value={series.MainDicomTags.BodyPartExamined} small />
                                                                     </div>
                                                                     <div className="space-y-1">
                                                                         <MetadataItem label="Series UID" value={series.MainDicomTags.SeriesInstanceUID} copyable small />
                                                                     </div>
                                                                 </div>

                                                                {/* Instances Table */}
                                                                <div className="rounded border bg-background overflow-hidden">
                                                                    <Table>
                                                                        <TableHeader className="bg-muted/30">
                                                                            <TableRow>
                                                                                 <TableHead className="w-8 h-8"></TableHead>
                                                                                 <TableHead className="text-[10px] font-bold h-8">Instance #</TableHead>
                                                                                 <TableHead className="text-[10px] font-bold h-8">SOP Instance UID</TableHead>
                                                                                 <TableHead className="text-[10px] font-bold h-8 text-right">Size</TableHead>
                                                                                 <TableHead className="text-[10px] font-bold h-8 text-right">Action</TableHead>
                                                                             </TableRow>
                                                                        </TableHeader>
                                                                        <TableBody>
                                                                                {!instancesData[series.ID] ? (
                                                                                    <TableRow>
                                                                                        <TableCell colSpan={5} className="text-center py-4 text-[11px]">
                                                                                            Loading instances...
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                ) : (
                                                                                    instancesData[series.ID].map((instance) => (
                                                                                        <React.Fragment key={instance.ID}>
                                                                                            <TableRow className="hover:bg-muted/20 cursor-pointer">
                                                                                                <TableCell className="py-1">
                                                                                                    <Button
                                                                                                        variant="ghost"
                                                                                                        size="icon"
                                                                                                        className="size-6"
                                                                                                        onClick={() => toggleInstanceExpansion(instance.ID)}
                                                                                                    >
                                                                                                        <HugeiconsIcon
                                                                                                            icon={ArrowDown01Icon}
                                                                                                            className={`size-2.5 transition-transform duration-200 ${expandedInstances[instance.ID] ? "rotate-180" : ""}`}
                                                                                                        />
                                                                                                    </Button>
                                                                                                </TableCell>
                                                                                                <TableCell className="text-[11px] py-1.5">{instance.MainDicomTags.InstanceNumber}</TableCell>
                                                                                                <TableCell className="text-[11px] py-1.5 font-mono text-muted-foreground">{instance.MainDicomTags.SOPInstanceUID}</TableCell>
                                                                                                <TableCell className="text-[11px] py-1.5 text-right text-muted-foreground">
                                                                                                    {(instance.FileSize / 1024 / 1024).toFixed(2)} MB
                                                                                                </TableCell>
                                                                                                <TableCell className="text-right py-1">
                                                                                                    <div className="flex justify-end gap-1">
                                                                                                        <Button size="icon-xs" variant="ghost" className="size-6" onClick={() => handleDownloadInstance(instance.ID, instance.MainDicomTags.InstanceNumber)} title="Download DCM">
                                                                                                            <HugeiconsIcon icon={Download01Icon} className="size-2.5" />
                                                                                                        </Button>
                                                                                                        <Button size="icon-xs" variant="ghost" className="size-6 text-destructive" onClick={() => handleDeleteInstance(instance.ID, series.ID)} title="Delete Instance">
                                                                                                            <HugeiconsIcon icon={Delete01Icon} className="size-2.5" />
                                                                                                        </Button>
                                                                                                    </div>
                                                                                                </TableCell>
                                                                                            </TableRow>
                                                                                            {expandedInstances[instance.ID] && (
                                                                                                <TableRow className="bg-muted/5 hover:bg-muted/5 border-none">
                                                                                                    <TableCell colSpan={5} className="p-4 pt-0">
                                                                                                        <div className="space-y-2 bg-slate-50/50 p-4 rounded-lg border border-slate-100 font-mono text-[10px] overflow-auto max-h-[400px]">
                                                                                                            <div className="flex items-center justify-between border-b pb-2 mb-2">
                                                                                                                <span className="font-bold text-slate-500 uppercase">DICOM Tags (Full)</span>
                                                                                                                <Button variant="ghost" size="icon-xs" className="size-5" onClick={() => navigator.clipboard.writeText(JSON.stringify(tagsData[instance.ID], null, 2))}>
                                                                                                                    <HugeiconsIcon icon={Copy01Icon} className="size-3" />
                                                                                                                </Button>
                                                                                                            </div>
                                                                                                            {!tagsData[instance.ID] ? (
                                                                                 <div className="flex items-center gap-2 text-muted-foreground italic">
                                                                                     <HugeiconsIcon icon={RefreshIcon} className="size-3 animate-spin" />
                                                                                     Loading tags...
                                                                                 </div>
                                                                             ) : (
                                                                                 <div className="grid grid-cols-[100px_1fr_2fr] gap-x-6 gap-y-1">
                                                                                     <div className="text-[10px] font-bold text-slate-400 border-b pb-1">Tag</div>
                                                                                     <div className="text-[10px] font-bold text-slate-400 border-b pb-1">Name</div>
                                                                                     <div className="text-[10px] font-bold text-slate-400 border-b pb-1">Value</div>
                                                                                     {Object.entries(tagsData[instance.ID]).map(([key, value]) => (
                                                                                         <React.Fragment key={key}>
                                                                                             <div className="text-slate-400 font-mono">{key}</div>
                                                                                             <div className="text-slate-600 font-medium truncate" title={value.Name}>{value.Name}</div>
                                                                                             <div className="text-slate-800 break-all truncate" title={String(value.Value)}>{typeof value.Value === 'object' ? JSON.stringify(value.Value) : String(value.Value || "-")}</div>
                                                                                         </React.Fragment>
                                                                                     ))}
                                                                                 </div>
                                                                             )}
                                                                                                        </div>
                                                                                                    </TableCell>
                                                                                                </TableRow>
                                                                                            )}
                                                                                        </React.Fragment>
                                                                                    ))
                                                                                )}
                                                                        </TableBody>
                                                                    </Table>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </React.Fragment>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </TableCell>

            {/* Upload Series Dialog */}
            <UploadSeriesDialog
                open={isUploadSeriesOpen}
                onOpenChange={setIsUploadSeriesOpen}
                studyId={study.ID}
                patientName={patientName}
                onUpload={(files) => handleUploadSeries(files, study.ID)}
            />
        </TableRow>
    );
}

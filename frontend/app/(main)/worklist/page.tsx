"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, ArrowRight01Icon, RefreshIcon, ViewIcon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";

interface Study {
    ID: string;
    MainDicomTags: {
        PatientName: string;
        PatientID: string;
        StudyDate: string;
        StudyDescription: string;
        AccessionNumber: string;
        StudyInstanceUID: string;
    };
    PatientMainDicomTags?: {
        PatientName: string;
    };
}

export default function WorklistPage() {
    const [studies, setStudies] = useState<Study[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedStudyUID, setSelectedStudyUID] = useState<string | null>(null);
    const [viewerMode, setViewerMode] = useState<string>("viewer");
    const [showViewer, setShowViewer] = useState(false);

    const fetchStudies = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/orthanc/studies");
            if (!response.ok) throw new Error("Failed to fetch study list");
            const ids: string[] = await response.json();

            const details = await Promise.all(
                ids.slice(0, 20).map(async (id) => {
                    const res = await fetch(`/api/orthanc/studies/${id}`);
                    return res.json();
                })
            );

            setStudies(details);
        } catch (error) {
            console.error("Failed to fetch studies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudies();
    }, []);

    const handleOpenViewer = (uid: string, mode: string = "viewer") => {
        setSelectedStudyUID(uid);
        setViewerMode(mode);
        setShowViewer(true);
    };

    const handleBackToList = () => {
        setShowViewer(false);
        setSelectedStudyUID(null);
    };

    const filteredStudies = studies.filter((study) => {
        const patientName = (study.PatientMainDicomTags?.PatientName || study.MainDicomTags.PatientName || "").toLowerCase();
        const patientID = (study.MainDicomTags.PatientID || "").toLowerCase();
        return patientName.includes(search.toLowerCase()) || patientID.includes(search.toLowerCase());
    });

    const getOhifUrl = (uid: string, mode: string) => {
        return `/ohif/${mode}?StudyInstanceUIDs=${uid}`;
    };

    if (showViewer && selectedStudyUID) {
        return (
            <div className="flex flex-col h-full gap-4">
                <div className="flex items-center justify-between px-6 pt-4">
                    <div className="flex items-center gap-6">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={handleBackToList}
                        >
                            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
                            Back
                        </Button>
                        <div className="flex items-center gap-3">
                            <HugeiconsIcon icon={ViewIcon} className="size-5 text-primary" />
                            <h1 className="font-bold text-lg tracking-tight">Diagnostic Viewer</h1>
                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ml-1">
                                Orthanc Node
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-black mx-6 mb-6 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative">
                    <iframe
                        src={getOhifUrl(selectedStudyUID, viewerMode)}
                        className="w-full h-full border-0 absolute inset-0"
                        title="OHIF Medical Viewer"
                        allowFullScreen
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Study Worklist</h1>
                    <p className="text-muted-foreground">Monitoring all radiographic studies from PACS node.</p>
                </div>
                <Button onClick={fetchStudies} disabled={loading} variant="outline" className="gap-2">
                    <HugeiconsIcon icon={RefreshIcon} className={`size-4 ${loading ? "animate-spin" : ""}`} />
                    Refresh Data
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search Patient Name or ID..."
                                className="pl-9"
                                value={search}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Patient ID</TableHead>
                                <TableHead>Study Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-2">
                                            <HugeiconsIcon icon={RefreshIcon} className="size-8 animate-spin text-primary" />
                                            <span className="text-sm font-medium">Fetching from PACS Server...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredStudies.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                        No studies found in the worklist.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredStudies.map((study) => (
                                    <TableRow key={study.ID}>
                                        <TableCell className="font-semibold">
                                            {study.PatientMainDicomTags?.PatientName || study.MainDicomTags.PatientName}
                                        </TableCell>
                                        <TableCell>{study.MainDicomTags.PatientID}</TableCell>
                                        <TableCell>
                                            {study.MainDicomTags.StudyDate ?
                                                `${study.MainDicomTags.StudyDate.slice(0, 4)}-${study.MainDicomTags.StudyDate.slice(4, 6)}-${study.MainDicomTags.StudyDate.slice(6, 8)}`
                                                : "N/A"}
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate">
                                            {study.MainDicomTags.StudyDescription || "-"}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    className="gap-1 h-8 text-[11px]"
                                                    onClick={() => handleOpenViewer(study.MainDicomTags.StudyInstanceUID, "viewer")}
                                                >
                                                    <HugeiconsIcon icon={ViewIcon} className="size-3" />
                                                    Basic
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="gap-1 h-8 text-[11px]"
                                                    onClick={() => handleOpenViewer(study.MainDicomTags.StudyInstanceUID, "segmentation")}
                                                >
                                                    <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
                                                    Segmentation
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

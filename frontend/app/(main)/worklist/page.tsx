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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, InformationCircleIcon, ArrowRight01Icon, RefreshIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

    const filteredStudies = studies.filter((study) => {
        const patientName = (study.PatientMainDicomTags?.PatientName || study.MainDicomTags.PatientName || "").toLowerCase();
        const patientID = (study.MainDicomTags.PatientID || "").toLowerCase();
        return patientName.includes(search.toLowerCase()) || patientID.includes(search.toLowerCase());
    });

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
                                            <Link
                                                href={`/viewer?id=${study.MainDicomTags.StudyInstanceUID}`}
                                                className={cn(buttonVariants({ size: "sm", variant: "secondary" }), "gap-1")}
                                            >
                                                Open Viewer
                                                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
                                            </Link>
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

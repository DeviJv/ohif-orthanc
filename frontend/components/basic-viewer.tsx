"use client";

import React, { useEffect, useState } from "react";

interface BasicViewerProps {
    studyInstanceUID: string;
}

export default function BasicViewer({ studyInstanceUID }: BasicViewerProps) {
    const [viewerUrl, setViewerUrl] = useState<string>("");

    useEffect(() => {
        // Direct Port access for local development as requested by the user
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            setViewerUrl(`http://${window.location.hostname}:8042/ohif/viewer?StudyInstanceUIDs=${studyInstanceUID}`);
        } else {
            // Production fallback through Nginx
            setViewerUrl(`/orthanc/ohif/viewer?StudyInstanceUIDs=${studyInstanceUID}`);
        }
    }, [studyInstanceUID]);

    if (!viewerUrl) return null;

    return (
        <iframe
            src={viewerUrl}
            className="w-full h-full border-0 bg-black"
            title="Basic Viewer"
        />
    );
}

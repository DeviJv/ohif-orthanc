"use client";

import React, { useEffect, useState } from "react";

interface OhifViewerProps {
    studyInstanceUIDs: string;
}

export default function OhifViewer({ studyInstanceUIDs }: OhifViewerProps) {
    const [viewerUrl, setViewerUrl] = useState<string>("");

    useEffect(() => {
        // Direct Port access for local development as requested by the user
        // This bypasses any Next.js proxy 404 issues on port 3001
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            setViewerUrl(`http://${window.location.hostname}:8042/ohif/viewer?StudyInstanceUIDs=${studyInstanceUIDs}`);
        } else {
            // Production fallback through Nginx
            setViewerUrl(`/orthanc/ohif/viewer?StudyInstanceUIDs=${studyInstanceUIDs}`);
        }
    }, [studyInstanceUIDs]);

    if (!viewerUrl) return null;

    return (
        <iframe
            src={viewerUrl}
            className="w-full h-full border-0"
            title="OHIF Viewer"
        />
    );
}

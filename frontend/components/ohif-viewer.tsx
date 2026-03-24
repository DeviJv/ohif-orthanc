"use client";

import React from "react";

interface OhifViewerProps {
    studyInstanceUIDs: string;
}

/**
 * OhifViewer - Restored to baseline stability.
 * Uses the standard /orthanc/ path prefix which is handled by Nginx in production.
 * Globally handles the StudyInstanceUIDs parameter.
 */
export default function OhifViewer({ studyInstanceUIDs }: OhifViewerProps) {
    const viewerUrl = `/orthanc/ohif/viewer?StudyInstanceUIDs=${studyInstanceUIDs}`;
    
    return (
        <iframe
            src={viewerUrl}
            className="w-full h-full border-0"
            title="OHIF Viewer"
        />
    );
}

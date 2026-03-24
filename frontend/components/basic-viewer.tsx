"use client";

import React from "react";

interface BasicViewerProps {
    studyInstanceUID: string;
}

/**
 * BasicViewer - Restored to baseline stability.
 * Points to the same secure OHIF viewer using the standard StudyInstanceUIDs parameter.
 */
export default function BasicViewer({ studyInstanceUID }: BasicViewerProps) {
    const viewerUrl = `/orthanc/ohif/viewer?StudyInstanceUIDs=${studyInstanceUID}`;

    return (
        <iframe
            src={viewerUrl}
            className="w-full h-full border-0 bg-black"
            title="Basic Viewer"
        />
    );
}

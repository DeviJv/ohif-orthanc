"use client";

import React from "react";

interface BasicViewerProps {
    studyInstanceUID: string;
}

export default function BasicViewer({ studyInstanceUID }: BasicViewerProps) {
    return (
        <iframe
            src={`/ohif/basic-viewer?StudyInstanceUIDs=${studyInstanceUID}`}
            className="w-full h-full border-0"
            title="Basic Viewer"
        />
    );
}

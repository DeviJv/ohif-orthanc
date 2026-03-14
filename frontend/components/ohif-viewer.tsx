"use client";

import React from "react";

interface OhifViewerProps {
    studyInstanceUIDs: string;
}

export default function OhifViewer({ studyInstanceUIDs }: OhifViewerProps) {
    return (
        <iframe
            src={`/ohif/viewer?StudyInstanceUIDs=${studyInstanceUIDs}`}
            className="w-full h-full border-0"
            title="OHIF Viewer"
        />
    );
}

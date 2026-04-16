"use client";

import React, { useState } from "react";

interface OhifViewerProps {
    studyInstanceUIDs: string;
}

/**
 * OhifViewer - with instant loading skeleton.
 * The overlay is shown immediately so the user sees feedback right away,
 * then fades out once the iframe content has fully loaded.
 */
export default function OhifViewer({ studyInstanceUIDs }: OhifViewerProps) {
    const viewerUrl = `/ohif/viewer?StudyInstanceUIDs=${studyInstanceUIDs}`;
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full h-full">
            {/* Loading skeleton — visible instantly, before iframe paints */}
            {!loaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black gap-3">
                    <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
                    <span className="text-gray-400 text-sm">Loading viewer…</span>
                </div>
            )}
            <iframe
                src={viewerUrl}
                className="w-full h-full border-0"
                title="OHIF Viewer"
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}

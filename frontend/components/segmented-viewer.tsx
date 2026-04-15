"use client";

import React, { useState } from "react";

interface SegmentedViewerProps {
    studyInstanceUIDs: string;
}

/**
 * SegmentedViewer - Opens OHIF in Segmentation mode.
 * Uses the /segmentationmode route (OHIF v3 extension) so radiologists
 * can review and edit segmentation overlays.
 * Shows an instant skeleton overlay until the iframe is ready.
 */
export default function SegmentedViewer({ studyInstanceUIDs }: SegmentedViewerProps) {
    const viewerUrl = `/viewer/dicomweb?StudyInstanceUIDs=${studyInstanceUIDs}&hangingprotocolId=mpr`;
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full h-full">
            {/* Loading skeleton — visible instantly, before iframe paints */}
            {!loaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black gap-3">
                    <div className="w-10 h-10 border-4 border-purple-800 border-t-purple-400 rounded-full animate-spin" />
                    <span className="text-purple-300 text-sm">Loading Segmented Viewer…</span>
                </div>
            )}
            <iframe
                src={viewerUrl}
                className="w-full h-full border-0"
                title="Segmented Viewer"
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}

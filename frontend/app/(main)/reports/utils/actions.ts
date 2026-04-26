import { toast } from "sonner";

export async function handleBulkDownloadZip(ids: string[]) {
    if (ids.length === 0) return;

    try {
        const response = await fetch('/api/reports/download-zip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids }),
        });

        if (!response.ok) {
            throw new Error('Failed to download ZIP');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `measurement_reports_${new Date().getTime()}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast.success("ZIP file downloaded successfully");
    } catch (error: any) {
        console.error("Bulk download error:", error);
        toast.error(`Error downloading ZIP: ${error.message}`);
    }
}

import { ReportsResponse, Report } from "../types";

export async function fetchReports(params: {
    page?: number;
    limit?: number;
    patientName?: string;
    accessionNumber?: string;
    startDate?: string;
    endDate?: string;
    doctorNames?: string[];
}): Promise<ReportsResponse> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.patientName) searchParams.set('patientName', params.patientName);
    if (params.accessionNumber) searchParams.set('accessionNumber', params.accessionNumber);
    if (params.startDate) searchParams.set('startDate', params.startDate);
    if (params.endDate) searchParams.set('endDate', params.endDate);
    if (params.doctorNames && params.doctorNames.length > 0) searchParams.set('doctorName', params.doctorNames.join(','));

    const response = await fetch(`/api/reports?${searchParams.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch reports');
    }
    return response.json();
}

export async function deleteReport(id: string): Promise<void> {
    const response = await fetch(`/api/reports/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete report');
    }
}

export async function bulkDeleteReports(ids: string[]): Promise<void> {
    const response = await fetch('/api/reports', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
    });
    if (!response.ok) {
        throw new Error('Failed to bulk delete reports');
    }
}

export async function updateReport(id: string, data: Partial<Report>): Promise<Report> {
    const response = await fetch(`/api/reports/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update report');
    }
    return response.json();
}

export interface Report {
    id: string;
    patientId: string;
    studyInstanceUid: string;
    studyDate?: string | null;
    accessionNumber?: string | null;
    patientName?: string | null;
    patientSex?: string | null;
    age?: string | null;
    examType?: string | null;
    findings?: string | null;
    measurementImages?: any | null;
    selectedSeries?: any | null;
    reportDate?: string | null;
    createdAt: string;
    updatedAt: string;
    doctorId?: string | null;
    doctorName?: string | null;
}

export interface ReportsResponse {
    reports: Report[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

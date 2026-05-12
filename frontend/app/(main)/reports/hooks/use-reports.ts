import { useState, useEffect, useCallback } from 'react';
import { Report, ReportsResponse } from '../types';
import { fetchReports, deleteReport, bulkDeleteReports, updateReport } from '../utils/api';
import { toast } from 'sonner';

export function useReports() {
    const [data, setData] = useState<ReportsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        patientName: '',
        accessionNumber: '',
        startDate: '',
        endDate: '',
        doctorNames: [] as string[],
    });
    const [doctors, setDoctors] = useState<any[]>([]);

    const loadReports = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchReports(filters);
            setData(res);
        } catch (error) {
            console.error('Failed to load reports:', error);
            toast.error('Failed to load reports');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const fetchDoctors = useCallback(async () => {
        try {
            const res = await fetch("/api/users/doctors");
            if (res.ok) {
                const data = await res.json();
                setDoctors(data);
            }
        } catch (e) {
            console.error("Failed to fetch doctors:", e);
        }
    }, []);

    useEffect(() => {
        loadReports();
        fetchDoctors();
    }, [loadReports, fetchDoctors]);

    const handleDelete = async (id: string) => {
        try {
            await deleteReport(id);
            toast.success('Report deleted successfully');
            loadReports();
        } catch (error) {
            console.error('Failed to delete report:', error);
            toast.error('Failed to delete report');
        }
    };

    const handleBulkDelete = async (ids: string[]) => {
        try {
            await bulkDeleteReports(ids);
            toast.success('Reports deleted successfully');
            loadReports();
        } catch (error) {
            console.error('Failed to bulk delete reports:', error);
            toast.error('Failed to bulk delete reports');
        }
    };

    const handleUpdate = async (id: string, updateData: Partial<Report>) => {
        try {
            await updateReport(id, updateData);
            toast.success('Report updated successfully');
            loadReports();
        } catch (error) {
            console.error('Failed to update report:', error);
            toast.error('Failed to update report');
        }
    };

    return {
        reports: data?.reports || [],
        total: data?.total || 0,
        page: data?.page || 1,
        totalPages: data?.totalPages || 1,
        loading,
        filters,
        setFilters,
        handleDelete,
        handleBulkDelete,
        handleUpdate,
        refresh: loadReports,
        doctors,
    };
}

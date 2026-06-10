import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { TemplateExercise, TemplateExerciseResponse } from '../types';

export function useTemplateExercise() {
    const [data, setData] = useState<TemplateExerciseResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        search: '',
    });
    const [doctors, setDoctors] = useState<any[]>([]);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: filters.page.toString(),
                limit: filters.limit.toString(),
                search: filters.search,
            });
            const res = await fetch(`/api/template-exercise?${params.toString()}`);
            if (res.ok) {
                const json = await res.json();
                setData(json);
            } else {
                toast.error('Failed to load template exercises');
            }
        } catch (error) {
            toast.error('Error fetching data');
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
        loadData();
        fetchDoctors();
    }, [loadData, fetchDoctors]);

    const handleCreate = async (payload: Partial<TemplateExercise>) => {
        try {
            const res = await fetch('/api/template-exercise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                toast.success('Template created successfully');
                loadData();
            } else {
                toast.error('Failed to create template');
            }
        } catch (error) {
            toast.error('Error creating template');
        }
    };

    const handleUpdate = async (id: string, payload: Partial<TemplateExercise>) => {
        try {
            const res = await fetch(`/api/template-exercise/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                toast.success('Template updated successfully');
                loadData();
            } else {
                toast.error('Failed to update template');
            }
        } catch (error) {
            toast.error('Error updating template');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/template-exercise/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Template deleted successfully');
                loadData();
            } else {
                toast.error('Failed to delete template');
            }
        } catch (error) {
            toast.error('Error deleting template');
        }
    };

    const handleBulkDelete = async (ids: string[]) => {
        try {
            const res = await fetch('/api/template-exercise/bulk', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids }),
            });
            if (res.ok) {
                toast.success('Templates deleted successfully');
                loadData();
            } else {
                toast.error('Failed to bulk delete templates');
            }
        } catch (error) {
            toast.error('Error bulk deleting templates');
        }
    };

    return {
        items: data?.items || [],
        total: data?.total || 0,
        page: data?.page || 1,
        totalPages: data?.totalPages || 1,
        loading,
        filters,
        setFilters,
        doctors,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleBulkDelete,
        refresh: loadData,
    };
}

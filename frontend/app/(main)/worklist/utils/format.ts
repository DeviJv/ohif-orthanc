import { format } from "date-fns";

export const formatDicomDate = (dateStr?: string) => {
    if (!dateStr || dateStr.length !== 8) return dateStr || "-";
    try {
        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(4, 6);
        const day = dateStr.slice(6, 8);
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return format(date, "MMM dd, yyyy");
    } catch (e) {
        return dateStr;
    }
};

export const formatDicomTime = (timeStr?: string) => {
    if (!timeStr || timeStr.length < 6) return timeStr || "-";
    try {
        const hours = timeStr.slice(0, 2);
        const minutes = timeStr.slice(2, 4);
        const seconds = timeStr.slice(4, 6);
        return `${hours}:${minutes}:${seconds}`;
    } catch (e) {
        return timeStr;
    }
};

export const normalizePatientName = (name?: string) => {
    if (!name) return "";
    return name.replace(/\^/g, " ").replace(/\s+/g, " ").trim();
};

export const getCurrentMonthRange = () => {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { from, to };
};

export const toDicomDate = (date?: Date): string | undefined => {
    if (!date) return undefined;
    return format(date, "yyyyMMdd");
};

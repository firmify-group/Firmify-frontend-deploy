import { useMemo } from 'react';

export interface StatusItem {
    id: string | number;
    status: string;
    [key: string]: unknown;
}

export interface StatusGroups {
    pending: StatusItem[];
    rejected: StatusItem[];
    completed: StatusItem[];
}

export interface StatusMapping {
    pending: string;
    rejected: string;
    completed: string;
}

export const useGroupedByStatus = <T extends StatusItem>(
    items: T[],
    statusMapping: StatusMapping = {
        pending: 'Pendiente',
        rejected: 'Objetado',
        completed: 'Completado',
    }
): StatusGroups => {
    const pending = useMemo(
        () =>
            items
                .filter((item) => item.status === statusMapping.pending)
                .map((item) => ({ ...item, id: String(item.id) })),
        [items, statusMapping.pending]
    );

    const rejected = useMemo(
        () =>
            items
                .filter((item) => item.status === statusMapping.rejected)
                .map((item) => ({ ...item, id: String(item.id) })),
        [items, statusMapping.rejected]
    );

    const completed = useMemo(
        () =>
            items
                .filter((item) => item.status === statusMapping.completed)
                .map((item) => ({ ...item, id: String(item.id) })),
        [items, statusMapping.completed]
    );

    return {
        pending,
        rejected,
        completed,
    };
};
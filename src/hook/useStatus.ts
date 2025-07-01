    import { useMemo } from 'react';

    export interface StatusItem {
    id: string | number;
    status: string;
    [key: string]: unknown;
    }

    export interface StatusGroups {
    pending: StatusItem[];
    rejected: StatusItem[];
    objected: StatusItem[];
    completed: StatusItem[];
    }

    export const useGroupedByStatus = <T extends StatusItem>(items: T[]): StatusGroups => {
    const normalize = (s: string) => s.toLowerCase().trim();

    const pending = useMemo(
        () => items.filter(item =>
        ['pending', 'pendiente'].includes(normalize(item.status))
        ),
        [items]
    );

    const rejected = useMemo(
        () => items.filter(item =>
        ['rejected', 'rechazada'].includes(normalize(item.status))
        ),
        [items]
    );

    const objected = useMemo(
        () => items.filter(item =>
        ['object', 'objetada', 'objetado'].includes(normalize(item.status))
        ),
        [items]
    );

    const completed = useMemo(
        () => items.filter(item =>
        ['aprobada','completed', 'completado', 'finalizado'].includes(normalize(item.status))
        ),
        [items]
    );

    return {
        pending,
        rejected,
        objected,
        completed,
    };
    };

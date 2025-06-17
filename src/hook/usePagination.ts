import { useEffect, useState, useCallback } from 'react';
import type { ProcessPagination } from 'src/utils/types/components.client';


export function usePagination(processes: ProcessPagination[], pageSize = 8) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(processes.length / pageSize);

    const paginatedProcesses = processes.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    const handlePageClick = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);



    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        setCurrentPage(1);
    }, [processes]);

    return { currentPage, totalPages, paginatedProcesses, handlePageClick };
}
import { useMemo, useState } from 'react';

export interface FilterOptions {
    name: string;
    category: string;
    startDate: string;
    endDate: string;
}

export const useFilteredData = <T>(
    data: T[],
    initialFilters: Partial<FilterOptions> = {},
    filterFn?: (item: T, filters: FilterOptions) => boolean
) => {
    const [filters, setFilters] = useState<FilterOptions>({
        name: '',
        category: '',
        startDate: '',
        endDate: '',
        ...initialFilters,
    });

    const updateFilters = (newFilters: Partial<FilterOptions>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    const filteredData = useMemo(() => {
        if (!data.length) return [];

        if (filterFn) {
            return data.filter(item => filterFn(item, filters));
        }

        // Default filtering logic for processes
        return data.filter((item: unknown) => {
            const matchesName = filters.name === '' ||
                (item as { name?: string }).name?.toLowerCase().includes(filters.name.toLowerCase());
            const matchesCategory = filters.category === '' || (item as { category?: string }).category === filters.category;
            const matchesStartDate = filters.startDate === '' || ((item as { start_date?: string }).start_date ?? '') >= filters.startDate;
            const matchesEndDate = filters.endDate === '' || ((item as { end_date?: string }).end_date ?? '') <= filters.endDate;

            return matchesName && matchesCategory && matchesStartDate && matchesEndDate;
        });
    }, [data, filters, filterFn]);

    return {
        filters,
        filteredData,
        updateFilters,
        setFilters,
    };
};
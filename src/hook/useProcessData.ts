import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePrivateAPI } from 'src/config/api/usePrivateRequest';
import type { AllProcessesResponse, SummaryRequest, AllUserResponse } from 'src/utils/types/response.admin';
import { API_ENDPOINTS } from 'src/utils/constant/API';

//  TODO: Este es el punto central de la integración con la API de procesos.
//  Aquí se gestionan las solicitudes de datos y se exponen los hooks para su uso en componentes.

export const useProcessData = (endpoint: string = API_ENDPOINTS.ADMIN_ALL_PROCESSES) => {
    const { get } = usePrivateAPI();
    const [data, setData] = useState<AllProcessesResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await get<AllProcessesResponse>(endpoint);
            setData(response);
        } finally {
            setIsLoading(false);
        }
    }, [get, endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const handleFocus = () => {
            fetchData();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [fetchData]);

    const processes = useMemo(() => {
        if (!data?.data?.processes) return [];
        return data.data.processes;
    }, [data?.data?.processes]);

    const categories = useMemo(() => {
        if (!processes.length) return [];

        const uniqueCategories = processes
            .map((process) => process.category)
            .filter((category): category is string => !!category?.trim())
            .filter((category, index, self) => self.indexOf(category) === index)
            .sort((a, b) => a.localeCompare(b));

        return uniqueCategories;
    }, [processes]);

    const subtitleText = useMemo(
        () => `Ultima actualización hoy a las ${data?.timestamp ?? 'N/A'}`,
        [data?.timestamp],
    );

    return {
        subtitleText,
        processes,
        categories,
        isLoading,
        refetch: fetchData,
    };
};

export const useSummaryData = (endpoint: string = API_ENDPOINTS.ADMIN_ALL_PROCESSES) => {
    const { get } = usePrivateAPI();
    const [summaryData, setSummaryData] = useState<SummaryRequest | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSummaryData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await get<SummaryRequest>(endpoint);
            setSummaryData(response);
        } finally {
            setIsLoading(false);
        }
    }, [get, endpoint]);

    useEffect(() => {
        fetchSummaryData();
    }, [fetchSummaryData]);

    useEffect(() => {
        const handleFocus = () => {
            fetchSummaryData();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [fetchSummaryData]);

    const subtitleText = useMemo(
        () => `Ultima actualización hoy a las ${summaryData?.timestamp ?? 'N/A'}`,
        [summaryData?.timestamp],
    );

    const hasRequestData = useMemo(
        () => Boolean(summaryData?.data?.request),
        [summaryData?.data?.request],
    );

    const counterCategoryData = useMemo(
        () => Boolean(summaryData?.data?.categorySumers),
        [summaryData?.data?.categorySumers],
    );

    return {
        summaryData,
        subtitleText,
        hasRequestData,
        counterCategoryData,
        isLoading,
        refetch: fetchSummaryData,
    };
}

export const useAllProcesses = (endpoint: string = API_ENDPOINTS.ADMIN_ALL_PROCESSES) => {
    const { get } = usePrivateAPI();
    const [summaryData, setSummaryData] = useState<AllProcessesResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSummaryData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await get<AllProcessesResponse>(endpoint);
            setSummaryData(response);
        } finally {
            setIsLoading(false);
        }
    }, [get, endpoint]);

    useEffect(() => {
        fetchSummaryData();
    }, [fetchSummaryData]);

    useEffect(() => {
        const handleFocus = () => {
            fetchSummaryData();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [fetchSummaryData]);

    const pendingProcesses = useMemo(() => {
        if (!summaryData?.data?.processes) return [];

        return summaryData.data.processes
            .filter((process) => process.status === 'Pendiente')
            .reverse()
            .slice(0, 6);
    }, [summaryData?.data?.processes]);

    return {
        summaryData,
        pendingProcesses,
        isLoading,
        refetch: fetchSummaryData,
    }
}

export const useAllUsers = (endpoint: string = API_ENDPOINTS.ADMIN_ALL_USERS) => {
    const { get } = usePrivateAPI();
    const [usersData, setUsersData] = useState<AllUserResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUsersData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await get<AllUserResponse>(endpoint);
            setUsersData(response);
            console.log('Users data fetched:', response);
        } finally {
            setIsLoading(false);
        }
    }, [get, endpoint]);

    useEffect(() => {
        fetchUsersData();
    }, [fetchUsersData]);

    useEffect(() => {
        const handleFocus = () => {
            fetchUsersData();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [fetchUsersData]);

    const users = useMemo(() => {
        if (!usersData?.data?.users) return [];
        return usersData.data.users;
    }, [usersData?.data?.users]);

    type FilterState = {
        name: string;
        rut: string;
    };

    const [filters, setFilters] = useState<FilterState>({
        name: '',
        rut: '',
    });

    const handleDeleteUser = useCallback(async (userId: number) => {
        console.log('Eliminando usuario con ID:', userId);
        await fetchUsersData();
    }, [fetchUsersData]);

    const updateFilter = useCallback((field: keyof FilterState, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({ name: '', rut: '' });
    }, []);

    const filteredUsers = users.filter((user) => {
        const normalize = (str: string) => str.replace(/\./g, '').toLowerCase();
        return (
            normalize(user.name ?? '').includes(normalize(filters.name)) &&
            normalize(user.rut ?? '').includes(normalize(filters.rut))
        );
    });

    return {
        users,
        filteredUsers,
        filters,
        handleDeleteUser,
        updateFilter,
        clearFilters,
        isLoading,
        refetch: fetchUsersData,
    };
}
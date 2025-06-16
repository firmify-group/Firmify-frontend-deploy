import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePrivateAPI } from 'src/config/api/usePrivateRequest';
import type { AllProcessesResponse, SummaryRequest, AllUserResponse } from 'src/utils/types/response.admin';
import type { AllProcessByUser } from 'src/utils/types/response.client';
import { API_ENDPOINTS } from 'src/utils/constant/API';

export const useProcessData = (endpoint: string = API_ENDPOINTS.ADMIN_ALL_PROCESSES) => {
    const { get } = usePrivateAPI();
    const [data, setData] = useState<AllProcessesResponse | null>(null);

    // TODO: Aqui se debe modificar el endpoint y adaptarlo al back.

    const fetchData = useCallback(async () => {
        const response = await get<AllProcessesResponse>(endpoint);
        setData(response);
    }, [get, endpoint]);

    useEffect(() => {
        fetchData();
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
    };
};

export const useSummaryData = (endpoint: string = API_ENDPOINTS.ADMIN_ALL_PROCESSES) => {
    const { get } = usePrivateAPI();
    const [summaryData, setSummaryData] = useState<SummaryRequest | null>(null);

    // TODO: Aqui se debe modificar el endpoint y adaptarlo al back.
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const fetchSummaryData = useCallback(async () => {
        const response = await get<SummaryRequest>(API_ENDPOINTS.ADMIN_SUMMARY_PROCESS);
        setSummaryData(response);
    }, []);

    useEffect(() => {
        fetchSummaryData();
    }, [fetchSummaryData]);

    // TODO: Cuando hagas el cambio debes mantener esto, puesto que evita que se re consulte al re-renderizar el componente
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
        refetch: fetchSummaryData,
    };
}

export const useAllProcesses = (endpoint: string = API_ENDPOINTS.ADMIN_ALL_PROCESSES) => {
    const { get } = usePrivateAPI();
    const [summaryData, setSummaryData] = useState<AllProcessesResponse | null>(null);

    // TODO: No puedo simular el SEE con los mocks usando json. Aqui deberia implementarse esta logica
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const fetchSummaryData = useCallback(async () => {
        const response = await get<AllProcessesResponse>(endpoint);
        setSummaryData(response);
    }, []);

    useEffect(() => {
        fetchSummaryData();
    }, [fetchSummaryData]);

    // TODO: Cuando hagas el cambio debes mantener esto, puesto que evita que se re consulte al re-renderizar el componente
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
    }
}
export const useAllUsers = (endpoint: string = API_ENDPOINTS.ADMIN_ALL_USERS) => {
    const { get } = usePrivateAPI();
    const [usersData, setUsersData] = useState<AllUserResponse | null>(null);

    // TODO: No puedo simular el SEE con los mocks usando json. Aqui deberia implementarse esta logica
    const fetchUsersData = useCallback(async () => {
        const response = await get<AllUserResponse>(endpoint);
        setUsersData(response);
        console.log('Users data fetched:', response);
    }, [get, endpoint]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        fetchUsersData();
    }, []);

    // TODO: Cuando hagas el cambio debes mantener esto, puesto que evita que se re consulte al re-renderizar el componente
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

    const filteredUsers = users.filter((user: { name: string; rut: string; }) => {
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
        refetch: fetchUsersData,
    };
}


export const useAllProcessByUser = (endpoint: string = API_ENDPOINTS.USER_ALL_REQUESTS) => {
    const { get } = usePrivateAPI();
    const [processData, setProcessData] = useState<AllProcessByUser | null>(null);

    const fetchProcessData = useCallback(async () => {
        const response = await get<AllProcessByUser>(endpoint);
        setProcessData(response);
        console.log('Process data fetched:', response);
    }, [get, endpoint]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        fetchProcessData();
    }, []);

    const processes = useMemo(() => {
        if (!processData?.data?.request) return [];
        return processData.data.request.map((req) => ({
            id: req.id,
            category: req.category,
            state: req.state,
            created_at: req.created_at,
            finished_at: req.finished_at
        }));
    }, [processData?.data?.request]);

    type FilterProcess = {
        id: number | string;
        category: string;
        state: string;
        created_at: string;
        finished_at: string;
    };

    const [filters, setFilters] = useState<FilterProcess>({
        id: '',
        category: '',
        state: '',
        created_at: '',
        finished_at: '',
    });

    const handleObjectProcess = useCallback(async (processId: number) => {
        console.log('Objetando proceso con ID:', processId);
        // Aquí implementarías la lógica para objetar el proceso
        await fetchProcessData();
    }, [fetchProcessData]);

    const handleViewProcess = useCallback(async (processId: number) => {
        console.log('Viendo proceso con ID:', processId);
        // Aquí implementarías la lógica para ver el proceso
    }, []);

    const updateFilter = useCallback((field: keyof FilterProcess, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({ id: '', category: '', state: '', created_at: '', finished_at: '' });
    }, []);

    const filteredProcesses = processes.filter((process) => {
        const normalize = (str: string) => str.replace(/\./g, '').toLowerCase();
        return (
            normalize(String(process.id ?? '')).includes(normalize(String(filters.id))) &&
            normalize(process.category ?? '').includes(normalize(filters.category)) &&
            normalize(process.state ?? '').includes(normalize(filters.state)) &&
            normalize(process.created_at ?? '').includes(normalize(filters.created_at)) &&
            normalize(process.finished_at ?? '').includes(normalize(filters.finished_at))
        );
    });
    4


    const subtitleText = useMemo(
        () => `Ultima actualización hoy a las ${processData?.timestamp ?? 'N/A'}`,
        [processData?.timestamp],
    );


    return {
        processes,
        filteredProcesses,
        filters,
        handleObjectProcess,
        handleViewProcess,
        updateFilter,
        clearFilters,
        refetch: fetchProcessData,
        date: subtitleText
    }
}
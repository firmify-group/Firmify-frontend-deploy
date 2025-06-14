import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePrivateAPI } from 'src/config/api/usePrivateRequest';
import type { AllProcessesResponse, SummaryRequest } from 'src/utils/types/response.admin';
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
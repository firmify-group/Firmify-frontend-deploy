import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePrivateAPI } from 'src/config/api/PrivateRequest';
import type { AllProcessesResponse, SummaryRequest, AllUserResponse } from 'src/utils/types/response.admin';
import type { AllProcessByUser } from 'src/utils/types/response.client';
import { API_ENDPOINTS } from 'src/utils/constant/API';
import { formatToLocalTime } from 'src/utils/helpers/date';
import { useBaseUrl } from 'src/config/api/BaseUrl.API';

//obtener todos las solicitudes existentes ADMIN
export const useProcessData = (endpoint: string = API_ENDPOINTS.ADMIN_ALL_REQUESTS) => {
  const { get } = usePrivateAPI();
  const [data, setData] = useState<AllProcessesResponse | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refresh = useCallback(() => {
    setRefreshIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get<AllProcessesResponse>(endpoint);
        setData(response);
      } catch (err) {
        console.error('Error al obtener procesos:', err);
      }
    };

    fetchData();
  }, [endpoint, refreshIndex]);

  const processes = useMemo(() => {
    return Array.isArray(data?.data)
      ? data.data.map((p) => ({ ...p }))
      : [];
  }, [data]);

  const categories = useMemo(() => {
    if (!processes.length) return [];

    const uniqueCategories = processes
      .map((process) => process.category)
      .filter((category): category is string => !!category?.trim())
      .filter((category, index, self) => self.indexOf(category) === index)
      .sort((a, b) => a.localeCompare(b));

    return uniqueCategories;
  }, [processes]);

  const subtitleText = useMemo(() => {
    return `Última actualización hoy a las ${data?.timestamp ?? 'N/A'}`;
  }, [data?.timestamp]);

  return {
    subtitleText,
    processes,
    categories,
    refresh,
  };
};

// Resumen de solicitudes para dashboard
export const useSummaryData = () => {
    const { get } = usePrivateAPI();
    const [summaryData, setSummaryData] = useState<SummaryRequest | null>(null);

    const fetchSummaryData = useCallback(async () => {
        try {
            const response = await get<SummaryRequest>(API_ENDPOINTS.ADMIN_SUMMARY_PROCESS);
            setSummaryData(response);
        } catch (error) {
            console.error('Error al obtener resumen:', error);
        }
    }, [get]);
    useEffect(() => {
        fetchSummaryData();
    }, [fetchSummaryData]);

    const subtitleText = useMemo(
        () => `Última actualización hoy a las ${formatToLocalTime(summaryData?.timestamp)}`,
        [summaryData?.timestamp],
    );

    const hasRequestData = useMemo(
    () => !!summaryData?.data?.request && summaryData.data.request.totalProcesos > 0,
    [summaryData?.data?.request]
    );


    const counterCategoryData = useMemo(
        () => Boolean(summaryData?.data?.categorySumers?.length),
        [summaryData?.data?.categorySumers],
    );

    return {
        summaryData,
        subtitleText,
        hasRequestData,
        counterCategoryData,
        refetch: fetchSummaryData,
    };
};


export const useAllProcesses = () => {
	const [summaryData, setSummaryData] = useState<AllProcessesResponse | null>(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const baseUrl = useBaseUrl();
		const wsUrl = `${baseUrl.replace(/^http/, 'ws')}${API_ENDPOINTS.ADMIN_ALL_PROCESSES_WS}`;

		const ws = new WebSocket(wsUrl);

		ws.onopen = () => {
			setConnected(true);
		};

		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);

				if (data?.data?.processes) {
					setSummaryData({
						status: data.status,
						timestamp: data.timestamp,
						message: data.message,
						data: {
							processes: data.data.processes,
						},
					});
				}
			} catch (error) {
				console.error('Error al procesar mensaje WebSocket:', error);
			}
		};

		ws.onerror = (error) => {
    if (ws.readyState === WebSocket.CLOSED) return;
    console.error('Error WebSocket:', error);
};


		ws.onclose = () => {
			console.warn('WebSocket cerrado');
			setConnected(false);
		};

		return () => {
			ws.close();
		};
	}, []);

	const pendingProcesses = useMemo(() => {
		if (!summaryData?.data?.processes) return [];

		return summaryData.data.processes
			.filter((process) => process.status?.toUpperCase() === 'PENDIENTE')
			.reverse()
			.slice(0, 6);
	}, [summaryData?.data?.processes]);

	return {
		summaryData,
		pendingProcesses,
		connected,
	};
};



export const useAllUsers = (endpoint: string = API_ENDPOINTS.ADMIN_ALL_USERS) => {
    const { get } = usePrivateAPI();
    const [usersData, setUsersData] = useState<AllUserResponse | null>(null);
    const fetchUsersData = useCallback(async () => {
        const response = await get<AllUserResponse>(endpoint);
        setUsersData(response);
    }, [get, endpoint]);
    useEffect(() => {
        fetchUsersData();
    }, []);
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

    

    const { del } = usePrivateAPI();

    const handleDeleteUser = useCallback(
    async (userId: string) => {
        try {

        await del(`${API_ENDPOINTS.DELETE_USER}/${userId}`);

        await fetchUsersData();
        } catch (error: any) {
        alert(`Error al eliminar usuario: ${error.message || error}`);
        }
    },
    [del, fetchUsersData]
    );



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

    const subtitleText = useMemo(
        () => `Ultima actualización hoy a las ${formatToLocalTime(usersData?.timestamp)}`,
        [usersData?.timestamp],
    );


    return {
        users,
        filteredUsers,
        filters,
        handleDeleteUser,
        updateFilter,
        clearFilters,
        refetch: fetchUsersData,
        subtitleText,
    };
}

//obtener solicitudes del usuario
export const useAllProcessByUser = (endpoint: string = API_ENDPOINTS.USER_ALL_REQUESTS) => {
    const { get } = usePrivateAPI();
    const [processData, setProcessData] = useState<AllProcessByUser | null>(null);

    const fetchProcessData = useCallback(async () => {
        const response = await get<AllProcessByUser>(endpoint);
        setProcessData(response);
    }, [get, endpoint]);
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

    const { patch } = usePrivateAPI();

    const handleObjectProcess = useCallback(
    async (processId: number, description: string) => {
        try {
        await patch(API_ENDPOINTS.USER_OBJECT_PROCESS, {
            id: processId,
            description,
        });

        await fetchProcessData();
        } catch (error) {
        console.error('Error al objetar proceso:', error);
        }
    },
    [fetchProcessData, patch]
    );



    const handleViewProcess = useCallback(async (processId: number) => {
        console.log('Viendo proceso con ID:', processId);
        // TODO: Aquí implementarías la lógica para ver el proceso
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
            normalize(process.state ?? '').includes(normalize(filters.state)) 
            &&normalize(process.created_at ?? '').includes(normalize(filters.created_at)) &&
            normalize(process.finished_at ?? '').includes(normalize(filters.finished_at))
        );
    });


    const subtitleText = useMemo(
        () => `Ultima actualización hoy a las ${formatToLocalTime(processData?.timestamp)}`,
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

export const createHandleObjectProcess = (onObjectProcess?: (id: number) => void) =>
    (e: React.MouseEvent, processId: number) => {
        e.stopPropagation();
        if (onObjectProcess) {
            onObjectProcess(processId);
        }
    };

export const createHandleViewProcess = (onViewProcess?: (id: number) => void) =>
    (e: React.MouseEvent, processId: number) => {
        e.stopPropagation();
        if (onViewProcess) {
            onViewProcess(processId);
        }
    };
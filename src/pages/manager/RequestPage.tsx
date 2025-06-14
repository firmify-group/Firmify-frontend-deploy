import Header from 'src/components/ui/atoms/Header';
import FilterBar from 'src/components/ui/molecules/FilterBar';
import KanvaColumn from 'src/components/ui/molecules/KanvaColum';
import { usePrivateAPI } from 'src/config/api/usePrivateRequest';
import type { AllProcessesResponse } from 'src/utils/types/response.admin';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_ENDPOINTS } from 'src/utils/constant/API';

const RequestManagerPage: React.FC = () => {
	const [filters, setFilters] = useState({
		name: '',
		category: '',
		startDate: '',
		endDate: '',
	});

	const { get } = usePrivateAPI();
	const [summaryData, setSummaryData] = useState<AllProcessesResponse | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// TODO: Aqui se debe implementar la api real para obtener los datos de las solicitudes. No puedo simular sockets con los mocks usando json.
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const fetchSummaryData = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await get<AllProcessesResponse>(API_ENDPOINTS.ADMIN_ALL_PROCESSES);
			setSummaryData(response);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al cargar datos');
			console.error('Error fetching processes:', err);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchSummaryData();
	}, [fetchSummaryData]);

	// TODO: Cuando hagas el cambio debes mantener esto, puesto que evita que se re consulte al re-renderizar el componente
	const allProcesses = useMemo(() => {
		if (!summaryData?.data?.processes) return [];
		return summaryData.data.processes;
	}, [summaryData?.data?.processes]);

	// Extraer categorías únicas
	const availableCategories = useMemo(() => {
		if (!allProcesses.length) return [];

		const categories = allProcesses
			.map((process) => process.category)
			.filter((category): category is string => !!category?.trim())
			.filter((category, index, self) => self.indexOf(category) === index)
			.sort((a, b) => a.localeCompare(b));

		return categories;
	}, [allProcesses]);

	const handleFilterChange = (newFilters: Partial<typeof filters>) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	};

	const filteredCards = useMemo(() => {
		if (!allProcesses.length) return [];

		return allProcesses.filter((card) => {
			const nameMatch =
				filters.name === '' || card.name.toLowerCase().includes(filters.name.toLowerCase());

			const categoryMatch = filters.category === '' || card.category === filters.category;

			const startDateMatch = filters.startDate === '' || card.start_date >= filters.startDate;

			const endDateMatch = filters.endDate === '' || card.end_date <= filters.endDate;

			return nameMatch && categoryMatch && startDateMatch && endDateMatch;
		});
	}, [allProcesses, filters]);

	const pendingCards = useMemo(
		() =>
			filteredCards
				.filter((card) => card.status === 'Pendiente')
				.map((card) => ({ ...card, id: String(card.id) })),
		[filteredCards],
	);

	const objectedCards = useMemo(
		() =>
			filteredCards
				.filter((card) => card.status === 'Objetado')
				.map((card) => ({ ...card, id: String(card.id) })),
		[filteredCards],
	);

	const approvedCards = useMemo(
		() =>
			filteredCards
				.filter((card) => card.status === 'Completado')
				.map((card) => ({ ...card, id: String(card.id) })),
		[filteredCards],
	);

	const subtitleText = useMemo(
		() => `Ultima actualización hoy a las ${summaryData?.timestamp ?? '12:00hrs'}`,
		[summaryData?.timestamp],
	);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div>Cargando solicitudes...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col justify-center items-center h-64">
				<div className="text-red-600 mb-4">Error: {error}</div>
				<button
					type="button"
					onClick={fetchSummaryData}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Reintentar
				</button>
			</div>
		);
	}

	return (
		<>
			<Header title="Solicitudes ingresadas" subtitle={subtitleText} />

			<FilterBar
				filters={filters}
				onChange={handleFilterChange}
				availableCategories={availableCategories}
			/>

			<article className="flex flex-row justify-between items-start gap-4 size-full">
				<KanvaColumn
					name="Pendientes"
					low="#FCE3CD"
					higt="#F28D35"
					id="Pendientes"
					cards={pendingCards}
				/>
				<KanvaColumn
					name="Objetados"
					low="#F6D1DB"
					higt="#E37692"
					id="Objetados"
					cards={objectedCards}
				/>
				<KanvaColumn
					name="Concluidos"
					low="#BEF1D6"
					higt="#22BD6B"
					id="Concluidos"
					cards={approvedCards}
				/>
			</article>
		</>
	);
};

export default RequestManagerPage;

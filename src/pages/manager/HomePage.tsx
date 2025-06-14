import Header from 'src/components/ui/atoms/Header';
import MonitoringSummary from 'src/components/ui/organisms/MonitoringSummary';
import ToDoSummary from 'src/components/ui/molecules/ToDoSummary';
import CounterSummary from 'src/components/ui/molecules/CounterSummary';
import CategorySummary from 'src/components/ui/molecules/CategorySummary';
import type { SummaryRequest } from 'src/utils/types/response.admin';
import { usePrivateAPI } from 'src/config/api/usePrivateRequest';
import { API_ENDPOINTS } from 'src/utils/constant/API';
import { useCallback, useEffect, useMemo, useState } from 'react';

const HomeManagerPage: React.FC = () => {
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

	return (
		<>
			<Header title="Monitoreo de solicitudes" subtitle={subtitleText} />
			<MonitoringSummary>
				{hasRequestData && <CounterSummary {...summaryData?.data.request} />}
				{counterCategoryData && (
					<CategorySummary
						totalProcesos={summaryData?.data?.request?.totalProcesos}
						categorySumers={summaryData?.data?.categorySumers}
					/>
				)}
			</MonitoringSummary>
			<ToDoSummary />
		</>
	);
};

export default HomeManagerPage;

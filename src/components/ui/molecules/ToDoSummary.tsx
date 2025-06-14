import { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router';
import { usePrivateAPI } from 'src/config/api/usePrivateRequest';
import { API_ENDPOINTS } from 'src/utils/constant/API';
import type { AllProcessesResponse } from 'src/utils/types/response.admin';

const ToDoSummary: React.FC = () => {
	const { get } = usePrivateAPI();
	const [summaryData, setSummaryData] = useState<AllProcessesResponse | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const fetchSummaryData = useCallback(async () => {
		const response = await get<AllProcessesResponse>(API_ENDPOINTS.ADMIN_ALL_PROCESSES);
		setSummaryData(response);
	}, []);

	useEffect(() => {
		fetchSummaryData();
	}, [fetchSummaryData]);

	const pendingProcesses = useMemo(() => {
		if (!summaryData?.data?.processes) return [];

		return summaryData.data.processes
			.filter((process) => process.status === 'Pendiente')
			.reverse()
			.slice(0, 5);
	}, [summaryData?.data?.processes]);

	return (
		<section className="container-base size-full flex flex-col gap-4">
			<header className="flex flex-row items-start justify-between">
				<div className="flex flex-col items-start justify-center gap-1">
					<h3 className="header-6 font-semibold text-font-1000">Solicitudes en curso</h3>
					<p className="body-3 text-font-600">Ordenado por solicitudes entrantes</p>
				</div>
				<NavLink
					className="py-0.5  px-3 border-1 border-font-600 rounded-md text-font-800 hover:bg-font-200 active:bg-primary-500 active:text-font-100 active:border-primary-500"
					to={'/manager/requests'}
				>
					Ver más
				</NavLink>
			</header>
			<main className="flex-1 w-full overflow-auto flex flex-col justify-start">
				<table className="w-full h-fit table-fixed text-left border-separate border-spacing-y-2">
					<thead>
						<tr>
							<th colSpan={5} className="p-0">
								<div className="flex rounded-lg border-[1.5px] border-font-300 bg-[#f7f7f7]  overflow-hidden **:font-medium">
									<div className="body-4 text-font-800 w-1/12 text-center py-2 bg-transparent">
										ID
									</div>
									<div className="body-4 text-font-800 w-3/12 text-center py-2 bg-transparent">
										Funcionario
									</div>
									<div className="body-4 text-font-800 w-3/12 text-center py-2 bg-transparent">
										Categoría
									</div>
									<div className="body-4 text-font-800 w-2/12 text-center py-2 bg-transparent">
										Estatus
									</div>
									<div className="body-4 text-font-800 w-3/12 text-center py-2 bg-transparent">
										Plazo
									</div>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{pendingProcesses.length > 0 ? (
							pendingProcesses.map((row) => (
								<tr key={row.id}>
									<td colSpan={5} className="p-0">
										<div className="flex rounded-lg border-[1.5px] border-font-300  overflow-hidden cursor-pointer hover:bg-[#E5F7FE] active:bg-primary-500 active:*:text-font-100 active:border-primary-500">
											<div className="body-4 text-font-1000 w-1/12 text-center py-2 bg-transparent">
												{row.id}
											</div>
											<div className="body-4 text-font-1000 w-3/12 text-center py-2 bg-transparent">
												{row.name}
											</div>
											<div className="body-4 text-font-1000 w-3/12 text-center py-2 bg-transparent">
												{row.category}
											</div>
											<div className="body-4 text-font-1000 w-2/12 text-center py-2 bg-transparent">
												<span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
													{row.status}
												</span>
											</div>
											<div className="body-4 text-font-1000 w-3/12 text-center py-2 bg-transparent">
												{row.start_date} - {row.end_date}
											</div>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5} className="p-0">
									<div className="flex justify-center items-center py-8 text-font-600">
										No hay solicitudes pendientes
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</main>
		</section>
	);
};

export default ToDoSummary;

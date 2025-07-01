import type { ProcessTableProps } from 'src/utils/types/components.client';
import { usePagination } from 'src/hook/usePagination';
import { useCallback } from 'react';

const ProcessTable: React.FC<ProcessTableProps> = ({
	processes,
	onObjectProcess,
	//onViewProcess,
	showFilterInfo = false,
	totalProcesses,
}) => {
	const { currentPage, totalPages, paginatedProcesses, handlePageClick } =
		usePagination(processes);

	const handleObjectProcess = useCallback(
		(e: React.MouseEvent, processId: number) => {
			e.stopPropagation();
			if (onObjectProcess) {
				onObjectProcess(processId);
			}
		},
		[onObjectProcess],
	);

	// const handleViewProcess = useCallback(
	// 	(e: React.MouseEvent, processId: number) => {
	// 		e.stopPropagation();
	// 		if (onViewProcess) {
	// 			onViewProcess(processId);
	// 		}
	// 	},
	// 	[onViewProcess],
	// );

	const getStateStyles = (state: string) => {
		switch (state.toUpperCase()) {
			case 'APROBADA':
				return 'bg-green-100 text-green-800';
			case 'RECHAZADA':
				return 'bg-red-100 text-red-800';
			case 'OBJETADA':
				return 'bg-orange-100 text-orange-800';
			case 'PENDIENTE':
				return 'bg-yellow-100 text-yellow-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const emptyRowsCount = 8 - paginatedProcesses.length;
	const emptyRows = Array(emptyRowsCount).fill(null);

	return (
		<div className="space-y-4">
			<div className="border-[1.5px] border-font-400 rounded-lg box-border overflow-hidden flex flex-col">
				<div className="flex bg-[#f7f7f7] border-b-[1.5px] border-font-400 shrink-0  py-1">
					<div className="body-3 text-font-800 w-[10%] pl-5 py-1.5 bg-transparent font-medium">
						ID
					</div>
					<div className="body-3 text-font-800 w-[20%] pl-3 py-1.5 bg-transparent font-medium">
						Categoría
					</div>
					<div className="body-3 text-font-800 w-[15%] pl-3 py-1.5 bg-transparent font-medium">
						Estado
					</div>
					<div className="body-3 text-font-800 w-[15%] pl-3 py-1.5 bg-transparent font-medium">
						Fecha Creación
					</div>
					<div className="body-3 text-font-800 w-[15%] pl-3 py-1.5 bg-transparent font-medium">
						Fecha Finalización
					</div>
					<div className="body-3 text-font-800 w-[25%] pl-3 py-1.5 bg-transparent font-medium text-center">
						Acciones
					</div>
				</div>

				<div className="flex-1 h-full">
					{processes.length === 0 ? (
						<div className="flex items-center justify-center h-fit ">
							<div className="text-font-600 body-2">
								No se encontraron procesos con los filtros aplicados
							</div>
						</div>
					) : (
						<>
							{paginatedProcesses.map((process) => (
								<div
									key={process.id}
									className="flex hover:bg-font-50 border-b border-font-300 items-center h-[45px]"
								>
									<div className="body-3 text-font-1000 w-[10%] pl-5 truncate">
										{process.id}
									</div>
									<div className="body-3 text-font-1000 w-[20%] pl-3 truncate">
										{process.category}
									</div>
									<div className="body-3 text-font-1000 w-[15%] pl-3 truncate">
										<span
											className={`px-2 py-1 rounded-full text-xs ${getStateStyles(process.state)}`}
										>
											{process.state}
										</span>
									</div>
									<div className="body-3 text-font-1000 w-[15%] pl-3 truncate">
										{process.created_at}
									</div>
									<div className="body-3 text-font-1000 w-[15%] pl-3 truncate">
										{process.finished_at ?? 'N/A'}
									</div>
									<div className="w-[25%] pl-3 flex gap-2 justify-center">
										{(['APROBADO', 'RECHAZADA'].includes(process.state.toUpperCase())) && (
											<button
												type="button"
												onClick={(e) => handleObjectProcess(e, process.id)}
												className="px-2 py-1 text-xs bg-orange-100 active:bg-orange-100 text-orange-800 rounded hover:bg-orange-200 transition-colors cursor-pointer"
											>
												Objetar
											</button>
										)}
									</div>
								</div>
							))}

							{emptyRows.map((_, index) => (
								<div
									key={`empty-row-page-${currentPage}-processes-${paginatedProcesses.length}-slot-${index}`}
									className="flex border-b border-font-300 items-center h-[45px]"
								>
									<div className="w-[10%] pl-5" />
									<div className="w-[20%] pl-3" />
									<div className="w-[15%] pl-3" />
									<div className="w-[15%] pl-3" />
									<div className="w-[15%] pl-3" />
									<div className="w-[25%] pl-3" />
								</div>
							))}
						</>
					)}
				</div>

				{/* Footer */}
				<div className="flex justify-between items-center px-5 py-5 bg-font-50 shrink-0">
					<span className="body-2 italic text-font-800">
						Página {currentPage} de {totalPages} ({processes.length} procesos
						{showFilterInfo &&
							totalProcesses &&
							processes.length !== totalProcesses &&
							` de ${totalProcesses} total`}
						)
					</span>
					<div className="flex items-center gap-2">
						<button
							type="button"
							className="mx-1 px-3 py-1.5 rounded cursor-pointer body-2 bg-font-200 text-font-1000 disabled:opacity-50"
							onClick={() => handlePageClick(currentPage - 1)}
							disabled={currentPage === 1}
						>
							Anterior
						</button>
						<div className="flex flex-row">
							{[...Array(totalPages)].map((_, idx) => {
								const pageNumber = idx + 1;
								return (
									<button
										key={`page-btn-${pageNumber}`}
										type="button"
										className={`mx-1 px-3 py-1.5 rounded cursor-pointer body-2 ${
											currentPage === pageNumber
												? 'bg-primary-500 text-font-100'
												: 'bg-font-200 text-font-1000'
										}`}
										onClick={() => handlePageClick(pageNumber)}
									>
										{pageNumber}
									</button>
								);
							})}
						</div>
						<button
							type="button"
							className="mx-1 px-3 py-1.5 rounded cursor-pointer body-2 bg-font-200 text-font-1000 disabled:opacity-50"
							onClick={() => handlePageClick(currentPage + 1)}
							disabled={currentPage === totalPages}
						>
							Siguiente
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProcessTable;

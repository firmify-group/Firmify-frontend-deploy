import Header from 'src/components/ui/atoms/Header';
import ProcessTable from 'src/components/ui/molecules/ProcessTable';
import { useAllProcessByUser } from 'src/hook/useProcessData';
import FilterTable from 'src/components/ui/molecules/FilterProcess';
const HomeClientPage: React.FC = () => {
	const {
		processes,
		filteredProcesses,
		filters,
		handleObjectProcess,
		handleViewProcess,
		updateFilter,
		clearFilters,
		refetch,
		date,
	} = useAllProcessByUser();

	const handleProcessAction = (processId: number) => {
		console.log(`Acción en proceso: ${processId}`);
	};

	const handleObjectProcessAction = (processId: number) => {
		console.log(`Objetar proceso: ${processId}`);
		handleObjectProcess(processId);
	};

	const handleViewProcessAction = (processId: number) => {
		console.log(`Ver detalles del proceso: ${processId}`);
		handleViewProcess(processId);
	};

	return (
		<>
			<Header title="Mis Solicitudes" subtitle={date} />
			<main className="size-full container-base flex flex-col justify-between items-center gap-8">
				<section className="flex flex-row justify-between items-center w-full">
					<FilterTable
						onUpdateFilter={updateFilter}
						onClearFilters={clearFilters}
						filters={filters}
					/>
					<div className="h-full w-fit flex flex-row justify-end items-end">
						<button type="button" className="button button-primary-IDLE w-48">
							+ Nueva Solicitud
						</button>
					</div>
				</section>
				<section className="size-full">
					<ProcessTable
						processes={filteredProcesses}
						onProcessAction={handleProcessAction}
						onObjectProcess={handleObjectProcessAction}
						onViewProcess={handleViewProcessAction}
						onRefetch={refetch}
						showFilterInfo={true}
						totalProcesses={processes.length}
					/>
				</section>
			</main>
		</>
	);
};

export default HomeClientPage;

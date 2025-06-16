import Header from 'src/components/ui/atoms/Header';
import ProcessTable from 'src/components/ui/molecules/ProcessTable';
import { useAllProcessByUser } from 'src/hook/useProcessData';

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
			<main className="size-full container-base flex flex-col justify-between items-center gap-5">
				<section className="w-full flex justify-end">
					<button type="button" className="button button-primary-IDLE">
						+ Nueva Solicitud
					</button>
				</section>
				<section className="size-full">
					<ProcessTable
						processes={filteredProcesses}
						filters={filters}
						onProcessAction={handleProcessAction}
						onObjectProcess={handleObjectProcessAction}
						onViewProcess={handleViewProcessAction}
						onUpdateFilter={updateFilter}
						onClearFilters={clearFilters}
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

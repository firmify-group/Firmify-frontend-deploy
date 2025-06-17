import Header from 'src/components/ui/atoms/Header';
import ProcessTable from 'src/components/ui/molecules/ProcessTable';
import { useAllProcessByUser } from 'src/hook/useProcessData';
import FilterTable from 'src/components/ui/molecules/FilterProcess';
import ProcessModal from 'src/components/ui/molecules/ProcessModal';
import { useModal } from 'src/hook/useModal';

const HomeClientPage: React.FC = () => {
	const { isModalOpen, handleCloseModal, handleCardClick } = useModal();
	const {
		date,
		processes,
		filteredProcesses,
		filters,
		handleObjectProcess,
		handleViewProcess,
		updateFilter,
		clearFilters,
		refetch,
	} = useAllProcessByUser();

	const handleProcessAction = (processId: number) => {
		console.log(`Acción en proceso: ${processId}`);
	};

	const handleObjectProcessAction = (processId: number) => {
		console.log(`Objetar proceso: ${processId}`);
		// Aquí puedes agregar lógica específica para objetar o redirigir a otra página
		handleObjectProcess(processId);
	};

	const handleViewProcessAction = (processId: number) => {
		console.log(`Ver detalles del proceso: ${processId}`);
		// Aquí puedes agregar lógica específica para ver detalles o redirigir a otra página
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
						<button
							type="button"
							className="button button-primary-IDLE w-48"
							onClick={handleCardClick}
						>
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

			<ProcessModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</>
	);
};

export default HomeClientPage;

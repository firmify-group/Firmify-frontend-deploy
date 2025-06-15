import Header from 'src/components/ui/atoms/Header';
import Input from 'src/components/ui/atoms/Input';
import UserModal from 'src/components/ui/molecules/UserModal';
import UserTable from 'src/components/ui/molecules/UserTable';
import { useModal } from 'src/hook/useModal';
import { useAllUsers } from 'src/hook/useProcessData';

const RequestManagerPage: React.FC = () => {
	const { isModalOpen, handleCardClick, handleCloseModal } = useModal();
	const { users, clearFilters, filteredUsers, handleDeleteUser, updateFilter, filters } =
		useAllUsers();

	return (
		<>
			<Header
				title="Funcionarios registrados"
				subtitle="Ultima actualización hoy a las 12:00hrs"
			/>

			<main className="size-full container-base flex flex-col justify-between items-center gap-5 ">
				<section className="w-full h-16 flex flex-row justify-between items-center">
					<div className="flex flex-row gap-4 w-[30rem] items-center">
						<Input
							decoration="flex flex-col gap-1 w-1/2"
							id="name"
							name="name"
							placeholder='Ej: "Juan Perez"'
							type="text"
							value={filters.name}
							onChange={(e) => updateFilter('name', e.target.value)}
						/>
						<Input
							decoration="flex flex-col gap-1 w-1/2"
							id="rut"
							name="rut"
							placeholder='Ej: "11.111.111-1"'
							type="text"
							value={filters.rut}
							onChange={(e) => updateFilter('rut', e.target.value)}
						/>
					</div>
					<div className="flex items-center gap-3">
						{(filters.name || filters.rut) && (
							<button
								type="button"
								onClick={clearFilters}
								className="text-sm text-font-600 hover:text-font-800 underline"
							>
								Limpiar filtros
							</button>
						)}
						<button
							type="button"
							className="button button-primary-IDLE"
							onClick={handleCardClick}
						>
							+ Agregar
						</button>
					</div>
				</section>
				<section className="size-full">
					<UserTable
						users={filteredUsers}
						onDeleteUser={handleDeleteUser}
						showFilterInfo={true}
						totalUsers={users.length}
					/>
				</section>
			</main>
			<UserModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</>
	);
};

export default RequestManagerPage;

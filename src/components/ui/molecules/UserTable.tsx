import { useEffect, useState, useCallback } from 'react';
import type { UserTableProps } from 'src/utils/types/components.admin';

const PAGE_SIZE = 10;

// El tema de las tablas es una corta de diuca no lo voy a limpiar
function usePagination(users: UserTableProps['users'], pageSize = PAGE_SIZE) {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(users.length / pageSize);

	const paginatedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	const handlePageClick = useCallback((page: number) => {
		setCurrentPage(page);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setCurrentPage(1);
	}, [users]);

	return { currentPage, totalPages, paginatedUsers, handlePageClick };
}

const UserTable: React.FC<
	UserTableProps & {
		onDeleteUser?: (userId: number) => void;
		showFilterInfo?: boolean;
		totalUsers?: number;
	}
> = ({ users, onDeleteUser, showFilterInfo = false, totalUsers }) => {
	const { currentPage, totalPages, paginatedUsers, handlePageClick } = usePagination(
		users,
		PAGE_SIZE,
	);

	const handleDeleteUser = useCallback(
		(e: React.MouseEvent, userId: number) => {
			e.stopPropagation();
			if (
				onDeleteUser &&
				window.confirm('¿Estás seguro de que quieres eliminar este usuario?')
			) {
				onDeleteUser(userId);
			}
		},
		[onDeleteUser],
	);

	const emptyRowsCount = PAGE_SIZE - paginatedUsers.length;
	const emptyRows = Array(emptyRowsCount).fill(null);

	return (
		<div className="border-[1.5px] border-font-400 rounded-lg box-border overflow-hidden flex flex-col">
			<div className="flex bg-[#f7f7f7] border-b-[1.5px] border-font-400 shrink-0">
				<div className="body-3 text-font-800 w-1/12 pl-5 py-2.5 bg-transparent font-medium">
					ID
				</div>
				<div className="body-3 text-font-800 w-3/12 pl-3 py-2.5 bg-transparent font-medium">
					Nombre
				</div>
				<div className="body-3 text-font-800 w-3/12 pl-3 py-2.5  bg-transparent font-medium">
					RUT
				</div>
				<div className="body-3 text-font-800 w-3/12 pl-3 py-2.5  bg-transparent font-medium">
					Correo
				</div>
				<div className="body-3 text-font-800 w-2/12 pl-3 py-2.5  bg-transparent font-medium">
					Acciones
				</div>
			</div>

			<div className="flex-1 h-full">
				{users.length === 0 ? (
					<div className="flex items-center justify-center h-full">
						<div className="text-font-600 body-2">
							No se encontraron usuarios con los filtros aplicados
						</div>
					</div>
				) : (
					<>
						{paginatedUsers.map((user) => (
							<div
								key={user.id}
								className="flex hover:bg-font-50 border-b border-font-300 items-center h-[38px]"
							>
								<div className="body-3 text-font-1000 w-1/12 pl-5 truncate">
									{user.id}
								</div>
								<div className="body-3 text-font-1000 w-3/12 pl-3 truncate">
									{user.name}
								</div>
								<div className="body-3 text-font-1000 w-3/12 pl-3 truncate">
									{user.rut}
								</div>
								<div className="body-3 text-font-1000 w-3/12 pl-3 truncate">
									{user.email}
								</div>
								<div className="body-3 text-font-1000 w-2/12 pl-3">
									<div className="flex items-center gap-2">
										{onDeleteUser && (
											<button
												type="button"
												onClick={(e) =>
													handleDeleteUser(e, user.id as number)
												}
												className="text-feedback-error-100 hover:text-feedback-error-200 px-2 rounded-xl border-2 border-feedback-error-100 text-sm hover:border-feedback-error-200 hover:bg-[#fff1f2] cursor-pointer"
											>
												Eliminar
											</button>
										)}
									</div>
								</div>
							</div>
						))}

						{emptyRows.map((_, index) => (
							<div
								key={`empty-row-page-${currentPage}-users-${paginatedUsers.length}-slot-${index}`}
								className="flex border-b border-font-300 items-center h-[38px]"
							>
								<div className="w-1/12 pl-5" />
								<div className="w-3/12 pl-3" />
								<div className="w-3/12 pl-3" />
								<div className="w-3/12 pl-3" />
								<div className="w-2/12 pl-3" />
							</div>
						))}
					</>
				)}
			</div>

			{/* Footer */}
			<div className="flex justify-between items-center px-5 py-5  bg-font-50 shrink-0">
				<span className="body-2 italic text-font-800">
					Página {currentPage} de {totalPages} ({users.length} usuarios
					{showFilterInfo &&
						totalUsers &&
						users.length !== totalUsers &&
						` de ${totalUsers} total`}
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
	);
};

export default UserTable;

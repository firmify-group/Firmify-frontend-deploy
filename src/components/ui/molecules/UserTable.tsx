import { useEffect, useState, useCallback } from 'react';
import type { UserTableProps } from 'src/utils/types/components.admin';

const PAGE_SIZE = 10;

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

const UserTable: React.FC<UserTableProps> = ({
	users,
	onDeleteUser,
	showFilterInfo = false,
	totalUsers,
}) => {
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

	return (
		<div className="size-full border-[1.5px] border-font-400 rounded-lg box-border overflow-hidden">
			<table className="size-full table-auto text-left">
				<thead className="size-fit bg-font-300">
					<tr className="bg-font-300 py-2.5">
						<th colSpan={5} className="p-0">
							<div className="flex rounded-t-lg bg-[#f7f7f7] border-b-[1.5px] border-font-400 overflow-hidden ">
								<div className="body-3 text-font-800 w-1/12 pl-5 py-2 bg-transparent">
									ID
								</div>
								<div className="body-3 text-font-800 w-3/12 pl-3 py-2 bg-transparent">
									Nombre
								</div>
								<div className="body-3 text-font-800 w-3/12 pl-3 py-2 bg-transparent">
									Rut
								</div>
								<div className="body-3 text-font-800 w-3/12 pl-3 py-2 bg-transparent">
									Correo
								</div>
								<div className="body-3 text-font-800 w-2/12 pl-3 py-2 bg-transparent">
									Acciones
								</div>
							</div>
						</th>
					</tr>
				</thead>
				<tbody className="size-full border-box">
					{paginatedUsers.length === 0 ? (
						<tr>
							<td colSpan={5} className="p-8 text-center">
								<div className="text-font-600 body-2">
									{users.length === 0
										? 'No se encontraron usuarios con los filtros aplicados'
										: 'No hay usuarios para mostrar'}
								</div>
							</td>
						</tr>
					) : (
						paginatedUsers.map((user) => (
							<tr
								key={user.id}
								className="h-fit w-full hover:bg-font-50"
								tabIndex={0}
							>
								<td colSpan={5} className="p-0">
									<div className="flex rounded-t-lg border-b-[1.5px] border-font-400 overflow-hidden **:font-medium h-fit">
										<div className="body-3 text-font-1000 w-1/12 pl-5 text-left py-1 bg-transparent">
											{user.id}
										</div>
										<div className="body-3 text-font-1000 w-3/12 pl-3 text-left py-1.5 bg-transparent">
											{user.name}
										</div>
										<div className="body-3 text-font-1000 w-3/12 pl-3 text-left py-1.5 bg-transparent">
											{user.rut}
										</div>
										<div className="body-3 text-font-1000 w-3/12 pl-3 text-left py-1.5 bg-transparent">
											{user.email}
										</div>
										<div className="body-3 text-font-1000 w-2/12 pl-3 text-left py-1.5 bg-transparent">
											<div className="flex items-center gap-2">
												{onDeleteUser && (
													<button
														type="button"
														onClick={(e) =>
															handleDeleteUser(e, user.id as number)
														}
														className="text-feedback-error-100 border-feedback-error-100 px-2 rounded-xl hover:text-feedback-error-200 body-4 border-2 hover:bg-[#fff1f2] cursor-pointer"
													>
														Eliminar
													</button>
												)}
											</div>
										</div>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={5} className="size-full">
							<div className="flex flex-row justify-between items-center px-5 py-3.5">
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
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default UserTable;

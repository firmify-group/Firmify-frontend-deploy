import { useEffect, useState, useCallback } from 'react';
import type { UserTableProps } from 'src/utils/types/components.admin';

const PAGE_SIZE = 10;

function usePagination(products: UserTableProps['products'], pageSize = PAGE_SIZE) {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(products.length / pageSize);

	const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	const handlePageClick = useCallback((page: number) => {
		setCurrentPage(page);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setCurrentPage(1);
	}, [products]);

	return { currentPage, totalPages, paginatedProducts, handlePageClick };
}

const UserTable: React.FC<UserTableProps> = ({ products, selectCardHandler }) => {
	const { currentPage, totalPages, paginatedProducts, handlePageClick } = usePagination(
		products,
		PAGE_SIZE,
	);

	return (
		<div className="size-full border-[1.5px] border-font-400 rounded-lg box-border overflow-hidden">
			<table className="size-full table-auto text-left ">
				<thead className="size-fit bg-font-300">
					<tr className="bg-font-300 py-2.5">
						<th colSpan={5} className="p-0">
							<div className="flex rounded-t-lg bg-[#f7f7f7] border-b-[1.5px] border-font-400  overflow-hidden **:font-medium">
								<div className="body-3 text-font-800 w-2/12 pl-5 py-2 bg-transparent">
									ID
								</div>
								<div className="body-3 text-font-800 w-4/12 pl-3 py-2 bg-transparent">
									Categorias
								</div>
								<div className="body-3 text-font-800 w-4/12 pl-3 py-2 bg-transparent">
									Estado
								</div>

								<div className="body-3 text-font-800 w-2/12 pl-3 py-2 bg-transparent">
									Acción
								</div>
							</div>
						</th>
					</tr>
				</thead>
				<tbody className="size-full border-box">
					{paginatedProducts.map((product) => (
						<tr
							key={product.id}
							className="cursor-pointer h-fit w-full flex flex-col"
							tabIndex={0}
							onClick={() => selectCardHandler(product)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									selectCardHandler(product);
								}
							}}
						>
							<td colSpan={5} className="p-0">
								<div className="flex rounded-t-lg  border-b-[1.5px] border-font-400 overflow-hidden **:font-medium h-10">
									<td className="body-3 text-font-1000 w-2/12 pl-5 text-left py-2 bg-transparent">
										{product.id}
									</td>
									<td className="body-3 text-font-1000 w-4/12 pl-3 text-left py-2 bg-transparent">
										{product.category}
									</td>
									<td className="body-3 text-font-1000 w-4/12 pl-3 text-left py-2 bg-transparent">
										{product.state}
									</td>
									<td className="body-3 text-font-1000 w-2/12 pl-3 text-left py-2 bg-transparent">
										{product.action}
									</td>
								</div>
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={5} className="size-full">
							<div className="flex flex-row justify-between items-center px-5 pb-3.5 ">
								<span className="body-2 italic text-font-800">
									Página {currentPage} de {totalPages} ({products.length}{' '}
									productos)
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

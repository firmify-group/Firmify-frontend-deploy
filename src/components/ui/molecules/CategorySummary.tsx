import type { CategoryRequest } from 'src/utils/types/components.admin';
const CategorySummary: React.FC<CategoryRequest> = ({ totalProcesos, categorySumers }) => {
	return (
		<section
			className="container-base size-full flex flex-col gap-4"
			aria-labelledby="category-summary-title"
		>
			<header className="flex flex-col items-start justify-center gap-1">
				<h2 id="category-summary-title" className="header-6 font-semibold text-font-1000">
					Categorías de las solicitudes
				</h2>
				<p className="body-3 text-font-600">Categorías mas solicitadas</p>
			</header>

			<div className="flex-1 w-full overflow-auto">
				<table className="w-full h-full table-fixed text-left border-separate ">
					<thead>
						<tr>
							<th className="body-4 text-font-1000 w-[10%]">ID</th>
							<th className="body-4 text-font-1000 w-[20%]">Categoría</th>
							<th className="body-4 text-font-1000 w-[55%]">Progreso</th>
							<th className="body-4 text-font-1000 w-[15%]">Porcentaje</th>
						</tr>
					</thead>
					<tbody className="h-full">
						{categorySumers?.map((item, key) => (
							<tr key={item.name} className="body-3 text-font-700">
								<td className="w-[10%]">{key + 1}</td>
								<td className="w-[20%] ">Vacaciones</td>
								<td className="w-[50%]   pr-8">
									<progress
										value={item.total}
										max={totalProcesos}
										aria-valuenow={item.total}
										aria-valuemax={totalProcesos}
										aria-label="Progreso"
										className={'progress-bar'}
									/>
								</td>
								<td className="w-[15%] ">
									{totalProcesos
										? `${((item.total / totalProcesos) * 100).toFixed(2)}%`
										: 'N/A'}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default CategorySummary;

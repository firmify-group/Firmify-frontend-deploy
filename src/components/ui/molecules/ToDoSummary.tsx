import { NavLink } from 'react-router';

const rows = [
	{
		id: '01',
		funcionario: 'Carlos Peña',
		categoria: 'Vacaciones',
		estatus: 'Pendiente',
		plazo: '20/05/2025 - 25/05/2025',
	},
	{
		id: '02',
		funcionario: 'Ana Ruiz',
		categoria: 'Permiso',
		estatus: 'Aprobado',
		plazo: '10/06/2025 - 12/06/2025',
	},
	{
		id: '03',
		funcionario: 'Luis Gómez',
		categoria: 'Incapacidad',
		estatus: 'Rechazado',
		plazo: '01/07/2025 - 05/07/2025',
	},
	{
		id: '04',
		funcionario: 'María López',
		categoria: 'Vacaciones',
		estatus: 'Pendiente',
		plazo: '15/08/2025 - 20/08/2025',
	},
	{
		id: '05',
		funcionario: 'Carlos Ruiz',
		categoria: 'Permiso',
		estatus: 'Aprobado',
		plazo: '10/06/2025 - 12/06/2025',
	},
];

const ToDoSummary: React.FC = () => {
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
						{rows.map((row) => (
							<tr key={row.id}>
								<td colSpan={5} className="p-0">
									<div className="flex rounded-lg border-[1.5px] border-font-300  overflow-hidden cursor-pointer hover:bg-[#E5F7FE] active:bg-primary-500 active:*:text-font-100 active:border-primary-500">
										<div className="body-4 text-font-1000 w-1/12 text-center py-2 bg-transparent">
											{row.id}
										</div>
										<div className="body-4 text-font-1000 w-3/12 text-center py-2 bg-transparent">
											{row.funcionario}
										</div>
										<div className="body-4 text-font-1000 w-3/12 text-center py-2 bg-transparent">
											{row.categoria}
										</div>
										<div className="body-4 text-font-1000 w-2/12 text-center py-2 bg-transparent">
											{row.estatus}
										</div>
										<div className="body-4 text-font-1000 w-3/12 text-center py-2 bg-transparent">
											{row.plazo}
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</section>
	);
};

export default ToDoSummary;

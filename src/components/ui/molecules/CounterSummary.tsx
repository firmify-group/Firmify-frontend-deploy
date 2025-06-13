import type { CounterRequest } from 'src/utils/types/components.admin';
import docImg from '@shared/assets/icons/doc.png';

const CounterSummary: React.FC<CounterRequest> = (props) => {
	return (
		<section className="container-base size-full flex flex-col gap-4">
			<header className="flex flex-col items-start justify-center gap-1">
				<h3 className="header-6 font-semibold text-font-1000">Resumen de solicitudes</h3>
				<p className="body-3 text-font-600">Solicitudes activas dento del sistema</p>
			</header>

			<main className="size-full flex flex-row justify-between items-center gap-4 *:size-full *:rounded-md *:box-border *:p-3">
				<div className="flex flex-col justify-between  bg-[#E1F2F0]">
					<img
						className="size-6 p-1 rounded-4xl bg-[#6BD87D]"
						src={docImg}
						alt="doc icon"
					/>
					<strong className="font-bold text-xl text-font-1000">
						{props.total_resueltos}
					</strong>
					<div className="flex flex-col items-start h-fit">
						<p className="body-2 text-font-1000">Resueltos</p>
						<small className="text-[10px] text-font-800 italic">Actualizado</small>
					</div>
				</div>
				<div className="flex flex-col justify-between bg-[#FCE2CC]">
					<img
						className="size-6 p-1 rounded-4xl bg-[#F28D35]"
						src={docImg}
						alt="doc icon"
					/>
					<strong className="font-bold text-xl text-font-1000">
						{props.total_pendientes}
					</strong>
					<div className="flex flex-col items-start h-fit">
						<p className="body-2 text-font-1000">Pendientes</p>
						<small className="text-[10px] text-font-800 italic">Actualizado</small>
					</div>
				</div>
				<div className="flex flex-col justify-between bg-[#FFE2E5]">
					<img
						className="size-6 p-1 rounded-4xl bg-[#E37692]"
						src={docImg}
						alt="doc icon"
					/>
					<strong className="font-bold text-xl text-font-1000">
						{props.total_objeciones}
					</strong>
					<div className="flex flex-col items-start h-fit">
						<p className="body-2 text-font-1000">Objetados</p>
						<small className="text-[10px] text-font-800 italic">Actualizado</small>
					</div>
				</div>
				<div className="flex flex-col justify-between bg-[#F2E5EE] gap-2">
					<img
						className="size-6 p-1 rounded-4xl bg-[#E37692]"
						src={docImg}
						alt="doc icon"
					/>
					<strong className="font-bold text-xl text-font-1000">
						{props.total_procesos}
					</strong>
					<div className="flex flex-col items-start h-fit ">
						<p className="body-2 text-font-1000">Total procesos</p>
						<small className="text-[10px] text-font-800 italic">Actualizado</small>
					</div>
				</div>
			</main>
		</section>
	);
};

export default CounterSummary;

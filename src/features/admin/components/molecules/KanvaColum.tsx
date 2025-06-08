import KanvaCard from '@feature/admin/components/atoms/KanvaCard';

export type KanvaColumnProps = {
	id?: string;
	name?: string;
	low?: string;
	higt?: string;
};

const getBgClass = (color?: string) => {
	if (!color) return '';
	if (color.startsWith('#')) return '';
	return `bg-${color}`;
};

const getBorderClass = (color?: string) => {
	if (!color) return '';
	if (color.startsWith('#')) return '';
	return `border-${color}`;
};

const getTextClass = (color?: string) => {
	if (!color) return '';
	if (color.startsWith('#')) return '';
	return `text-${color}`;
};

const KanvaColumn: React.FC<KanvaColumnProps> = (props) => {
	const bgClass = getBgClass(props.low);
	const borderClass = getBorderClass(props.higt);
	const textClass = getTextClass(props.higt);

	const exampleCards = [
		{
			id: 'kanva-1',
			name: 'Luis Alberto Ubeda',
			dateStart: '20/05/2025',
			dateEnd: '25/05/2025',
			status: 'Pendiente',
		},
		{
			id: 'kanva-2',
			name: 'Ana María Torres',
			dateStart: '10/06/2025',
			dateEnd: '15/06/2025',
			status: 'En progreso',
		},
		{
			id: 'kanva-3',
			name: 'Carlos Pérez',
			dateStart: '01/07/2025',
			dateEnd: '05/07/2025',
			status: 'Completado',
		},
		{
			id: 'kanva-4',
			name: 'Lucía Gómez',
			dateStart: '12/08/2025',
			dateEnd: '18/08/2025',
			status: 'Pendiente',
		},
		{
			id: 'kanva-5',
			name: 'Miguel Ángel',
			dateStart: '22/09/2025',
			dateEnd: '28/09/2025',
			status: 'En progreso',
		},
		{
			id: 'kanva-6',
			name: 'Osama Ángel',
			dateStart: '22/09/2025',
			dateEnd: '28/09/2025',
			status: 'En progreso',
		},
		{
			id: 'kanva-7',
			name: 'Negreni Ángel',
			dateStart: '22/09/2025',
			dateEnd: '28/09/2025',
			status: 'En progreso',
		},
		{
			id: 'kanva-8',
			name: 'Carlos Ángel',
			dateStart: '22/09/2025',
			dateEnd: '28/09/2025',
			status: 'En progreso',
		},
	];

	return (
		<section className="flex flex-col size-full gap-3">
			<header
				className={`w-full py-2 text-center border-2 ${borderClass} ${bgClass} rounded-md gap-2 flex flex-row place-content-center`}
				style={{
					backgroundColor: props.low?.startsWith('#') ? props.low : undefined,
					borderColor: props.higt?.startsWith('#') ? props.higt : undefined,
				}}
			>
				<small
					className={` body-1 font-medium ${textClass}`}
					style={{
						color: props.higt?.startsWith('#') ? props.higt : undefined,
					}}
				>
					5
				</small>
				<small
					className={` body-1 font-medium  ${textClass}`}
					style={{
						color: props.higt?.startsWith('#') ? props.higt : undefined,
					}}
				>
					{props.name}
				</small>
			</header>
			<main className="flex flex-col h-[27.7rem] gap-2 justify-start items-center overflow-y-auto scroll-smooth kanva-scroll ">
				{exampleCards.map((card) => (
					<KanvaCard
						key={card.id}
						id={card.id}
						name={card.name}
						dateStart={card.dateStart}
						dateEnd={card.dateEnd}
						status={card.status}
					/>
				))}
			</main>
		</section>
	);
};

export default KanvaColumn;

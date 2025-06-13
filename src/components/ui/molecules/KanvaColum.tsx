import KanvaCard from '@feature/admin/components/atoms/KanvaCard';

export type KanvaColumnProps = {
	id?: string;
	name?: string;
	low?: string;
	higt?: string;
	cards: Array<{
		id: string;
		name: string;
		dateStart: string;
		dateEnd: string;
		status: string;
		category?: string;
	}>;
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
					{props.cards.length}
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
				{props.cards.map((card) => (
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

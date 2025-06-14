import KanvaCard from 'src/components/ui/atoms/KanvaCard';
import type { KanvaColumnProps } from 'src/utils/types/components.admin';
import { useSelectiónColors } from 'src/hook/useResource';

const KanvaColumn: React.FC<KanvaColumnProps> = (props) => {
	const { getBgClass, getBorderClass, getTextClass } = useSelectiónColors();

	const cardsCount = props.cards?.length ?? 0;
	const hasCards = cardsCount > 0;

	return (
		<section className="flex flex-col size-full gap-3">
			<header
				className={`w-full py-2 text-center border-[1.5px] ${getBorderClass(props.higt)} ${getBgClass(props.low)} rounded-md gap-2 flex flex-row place-content-center`}
				style={{
					backgroundColor: props.low?.startsWith('#') ? props.low : undefined,
					borderColor: props.higt?.startsWith('#') ? props.higt : undefined,
				}}
			>
				<small
					className={`body-1 font-medium ${getTextClass(props.higt)}`}
					style={{
						color: props.higt?.startsWith('#') ? props.higt : undefined,
					}}
				>
					{cardsCount}
				</small>
				<small
					className={`body-1 font-medium ${getTextClass(props.higt)}`}
					style={{
						color: props.higt?.startsWith('#') ? props.higt : undefined,
					}}
				>
					{props.name}
				</small>
			</header>
			<main className="flex flex-col h-[27.7rem] gap-2 justify-start items-center overflow-y-auto scroll-smooth kanva-scroll">
				{hasCards ? (
					props.cards
						?.filter((card) => typeof card.id === 'string')
						.map((card) => (
							<KanvaCard
								key={card.id}
								id={card.id as string}
								name={card.name as string}
								dateStart={card.start_date as string}
								dateEnd={card.end_date as string}
								status={card.status as string}
							/>
						))
				) : (
					<div className="flex flex-col items-center justify-start h-full text-gray-500 text-sm text-center px-4">
						<p>No hay solicitudes {props.name?.toLowerCase()}</p>
					</div>
				)}
			</main>
		</section>
	);
};

export default KanvaColumn;

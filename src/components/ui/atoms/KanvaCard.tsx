import { useMemo } from 'react';
import { useSelectiónColors } from 'src/hook/useResource';
import type { KanvaCardProps } from 'src/utils/types/components.admin';

const KanvaCard: React.FC<KanvaCardProps & { onClick?: () => void }> = (pros) => {
	const { getRandomColor } = useSelectiónColors();

	const bgColor = useMemo(() => getRandomColor(pros.name), [pros.name, getRandomColor]);
	const initials = useMemo(
		() =>
			pros.name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.substring(0, 2)
				.toUpperCase(),
		[pros.name],
	);

	return (
		<button
			id={pros.id}
			type="button"
			className="w-full flex flex-row justify-between items-center gap-4 p-2 border-2 px-3 border-font-300 rounded-md bg-font-100 cursor-pointer hover:bg-font-200 transition-colors"
			onClick={pros.onClick}
		>
			<div
				className="rounded-4xl py-1.5 px-2 text-font-100 font-bold"
				style={{ backgroundColor: bgColor }}
				aria-label={`Iniciales de ${pros.name}`}
			>
				{initials}
			</div>
			<div className="flex flex-col justify-start items-start w-full">
				<h4 className="body-2 text-font-1000">{pros.name}</h4>
				<p className="body-4 text-font-800">
					{pros.dateStart} - {pros.dateEnd}
				</p>
			</div>
			<small>{pros.status}</small>
		</button>
	);
};

export default KanvaCard;

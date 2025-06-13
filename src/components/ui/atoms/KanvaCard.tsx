import { useMemo } from 'react';
import { KanvaCardProps } from 'src/utils/types/components.admin';

const COLORS = [
	'#2563eb',
	'#16a34a',
	'#ea580c',
	'#db2777',
	'#7c3aed',
	'#f59e42',
	'#0ea5e9',
	'#f43f5e',
];

function getRandomColor(seed: string) {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = seed.charCodeAt(i) + ((hash << 5) - hash);
	}
	const idx = Math.abs(hash) % COLORS.length;
	return COLORS[idx];
}

const KanvaCard: React.FC<KanvaCardProps> = ({ id, name, dateStart, dateEnd, status }) => {
	const initials = useMemo(
		() =>
			name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.substring(0, 2)
				.toUpperCase(),
		[name],
	);

	const bgColor = useMemo(() => getRandomColor(name), [name]);

	return (
		<div
			id={id}
			className="w-full flex flex-row justify-between items-center gap-4 p-2 border-2 px-3 border-font-300 rounded-md bg-font-100"
		>
			<div
				className="rounded-4xl py-1.5 px-2 text-font-100 font-bold"
				style={{ backgroundColor: bgColor }}
				aria-label={`Iniciales de ${name}`}
			>
				{initials}
			</div>
			<div className="flex flex-col justify-start items-start w-full">
				<h4 className="body-2 text-font-1000">{name}</h4>
				<p className="body-4 text-font-800">
					{dateStart} - {dateEnd}
				</p>
			</div>
			<small>{status}</small>
		</div>
	);
};

export default KanvaCard;

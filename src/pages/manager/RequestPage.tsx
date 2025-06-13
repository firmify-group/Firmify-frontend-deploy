import { useState, useMemo } from 'react';
import Header from 'src/components/ui/atoms/Header';
import FilterBar from 'src/components/ui/molecules/FilterBar';
import KanvaColumn from 'src/components/ui/molecules/KanvaColum';

const allCards = [
	{
		id: 'kanva-1',
		name: 'Luis Alberto Ubeda',
		dateStart: '2025-05-20',
		dateEnd: '2025-05-25',
		status: 'Pendientes',
		category: 'Vacaciones1',
	},
	{
		id: 'kanva-2',
		name: 'Ana María Torres',
		dateStart: '2025-06-10',
		dateEnd: '2025-06-15',
		status: 'Objetados',
		category: 'Vacaciones2',
	},
	{
		id: 'kanva-3',
		name: 'Carlos Pérez',
		dateStart: '2025-07-01',
		dateEnd: '2025-07-05',
		status: 'Concluidos',
		category: 'Vacaciones3',
	},
	{
		id: 'kanva-4',
		name: 'María Fernanda Ruiz',
		dateStart: '2025-08-12',
		dateEnd: '2025-08-18',
		status: 'Pendientes',
		category: 'Vacaciones2',
	},
	{
		id: 'kanva-5',
		name: 'Jorge Luis Mendoza',
		dateStart: '2025-09-05',
		dateEnd: '2025-09-10',
		status: 'Concluidos',
		category: 'Vacaciones2',
	},
	{
		id: 'kanva-6',
		name: 'Sofía Ramírez',
		dateStart: '2025-10-01',
		dateEnd: '2025-10-07',
		status: 'Objetados',
		category: 'Vacaciones3',
	},
	{
		id: 'kanva-7',
		name: 'Pedro González',
		dateStart: '2025-11-15',
		dateEnd: '2025-11-20',
		status: 'Pendientes',
		category: 'Vacaciones3',
	},
	{
		id: 'kanva-8',
		name: 'Lucía Herrera',
		dateStart: '2025-12-01',
		dateEnd: '2025-12-06',
		status: 'Concluidos',
		category: 'Vacaciones3',
	},
];

const RequestManagerPage: React.FC = () => {
	const [filters, setFilters] = useState({
		name: '',
		category: '',
		startDate: '',
		endDate: '',
	});

	const handleFilterChange = (newFilters: Partial<typeof filters>) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	};

	const filteredCards = useMemo(() => {
		return allCards.filter((card) => {
			const nameMatch =
				filters.name === '' || card.name.toLowerCase().includes(filters.name.toLowerCase());
			const categoryMatch = filters.category === '' || card.category === filters.category;
			const startDateMatch = filters.startDate === '' || card.dateStart >= filters.startDate;
			const endDateMatch = filters.endDate === '' || card.dateEnd <= filters.endDate;
			return nameMatch && categoryMatch && startDateMatch && endDateMatch;
		});
	}, [filters]);

	return (
		<>
			<Header
				title="Solicitudes ingresadas"
				subtitle="Ultima actualización hoy a las 12:00hrs"
			/>

			<FilterBar filters={filters} onChange={handleFilterChange} />

			<article className="flex flex-row justify-between items-start gap-4 size-full">
				<KanvaColumn
					name="Pendientes"
					low="#FCE3CD"
					higt="#F28D35"
					id="Pendientes"
					cards={filteredCards.filter((card) => card.status === 'Pendientes')}
				/>
				<KanvaColumn
					name="Objetados"
					low="#F6D1DB"
					higt="#E37692"
					id="Objetados"
					cards={filteredCards.filter((card) => card.status === 'Objetados')}
				/>
				<KanvaColumn
					name="Concluidos"
					low="#BEF1D6"
					higt="#22BD6B"
					id="Concluidos"
					cards={filteredCards.filter((card) => card.status === 'Concluidos')}
				/>
			</article>
		</>
	);
};

export default RequestManagerPage;

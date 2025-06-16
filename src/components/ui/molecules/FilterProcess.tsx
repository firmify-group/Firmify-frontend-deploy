import Input from 'src/components/ui/atoms/Input';

export type FilterProcessProps = {
	onUpdateFilter: (field: keyof FilterProcess, value: string) => void;
	onClearFilters: () => void;
	openModal?: () => void;
	filters: FilterProcess;
};

type FilterProcess = {
	id: number | string;
	category: string;
	state: string;
	created_at: string;
	finished_at: string;
};

const FilterTable: React.FC<FilterProcessProps> = ({ onClearFilters, onUpdateFilter, filters }) => {
	const hasActiveFilters =
		filters.id ||
		filters.category ||
		filters.state ||
		filters.created_at ||
		filters.finished_at;

	return (
		<div className="flex flex-row gap-4 w-full max-w-md">
			<Input
				label="Categoría"
				decoration="flex flex-col gap-1"
				id="categoryFilter"
				name="categoryFilter"
				placeholder='Ej: "Vacaciones"'
				type="text"
				value={filters.category}
				onChange={(e) => onUpdateFilter('category', e.target.value)}
			/>

			<Input
				label="Estado"
				decoration="flex flex-col gap-1"
				id="stateFilter"
				name="stateFilter"
				placeholder='Ej: "Pendiente"'
				type="text"
				value={filters.state}
				onChange={(e) => onUpdateFilter('state', e.target.value)}
			/>

			<Input
				label="Fecha Creación"
				decoration="flex flex-col gap-1"
				id="createdAtFilter"
				name="createdAtFilter"
				placeholder='Ej: "2024-01-01"'
				type="text"
				value={filters.created_at}
				onChange={(e) => onUpdateFilter('created_at', e.target.value)}
			/>

			<Input
				label="Fecha Finalización"
				decoration="flex flex-col gap-1"
				id="finishedAtFilter"
				name="finishedAtFilter"
				placeholder='Ej: "2024-12-31"'
				type="text"
				value={filters.finished_at}
				onChange={(e) => onUpdateFilter('finished_at', e.target.value)}
			/>

			<div className="flex gap-2">
				{hasActiveFilters && (
					<button
						type="button"
						onClick={onClearFilters}
						className="text-sm text-font-600 hover:text-font-800 underline"
					>
						Limpiar filtros
					</button>
				)}
			</div>
		</div>
	);
};

export default FilterTable;

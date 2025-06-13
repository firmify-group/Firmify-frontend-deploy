import Input from 'src/components/ui/atoms/Input';

type FilterBarProps = {
	filters: {
		name: string;
		category: string;
		startDate: string;
		endDate: string;
	};
	onChange: (filters: Partial<FilterBarProps['filters']>) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange }) => {
	return (
		<aside className="container-base flex flex-row justify-between items-center gap-8">
			<Input
				label="Nombre de funcionario"
				decoration="flex flex-col gap-1 w-1/4"
				id="name"
				name="name"
				placeholder='Ej: "Juan Perez"'
				type="text"
				value={filters.name}
				onChange={(e) => onChange({ name: e.target.value })}
			/>

			<div className="flex flex-col gap-1 w-1/4">
				<label htmlFor="category" className="body-2 font-medium text-font-1000">
					Categoria de solicitud
				</label>
				<select
					name="category"
					id="category"
					className="body-2 text-font-900 base-input-slim py-2"
					value={filters.category}
					onChange={(e) => onChange({ category: e.target.value })}
				>
					<option value="">Todas</option>
					<option value="Vacaciones1">Vacaciones1</option>
					<option value="Vacaciones2">Vacaciones2</option>
					<option value="Vacaciones3">Vacaciones3</option>
					<option value="Vacaciones4">Vacaciones4</option>
				</select>
			</div>

			<Input
				label="Fecha de inicio"
				decoration="flex flex-col gap-1 w-1/4"
				id="startDate"
				name="startDate"
				type="date"
				value={filters.startDate}
				onChange={(e) => onChange({ startDate: e.target.value })}
			/>

			<Input
				label="Fecha de finalización"
				decoration="flex flex-col gap-1 w-1/4"
				id="endDate"
				name="endDate"
				type="date"
				value={filters.endDate}
				onChange={(e) => onChange({ endDate: e.target.value })}
			/>
		</aside>
	);
};

export default FilterBar;

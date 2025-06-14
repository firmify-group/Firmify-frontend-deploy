import Input from 'src/components/ui/atoms/Input';
import type { FilterBarProps } from 'src/utils/types/components.admin';

const FilterBar: React.FC<FilterBarProps> = ({ availableCategories, filters, onChange }) => {
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
					id="category"
					name="category"
					value={filters.category}
					onChange={(e) => onChange({ category: e.target.value })}
					className="body-2 text-font-900 base-input-slim py-2"
				>
					<option value="">Todas las categorías</option>
					{availableCategories?.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
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

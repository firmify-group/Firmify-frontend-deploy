import Input from '@feature/admin/components/atoms/Input';

const FilterBar: React.FC = () => {
	return (
		<aside className="container-base flex flex-row justify-between items-center gap-8">
			<Input
				decoration="flex flex-col gap-1 w-1/4"
				id="name"
				name="name"
				placeholder='Ej: "Juan Perez'
				type="text"
			/>

			<div className="flex flex-col gap-1 w-1/4  ">
				<label htmlFor="category" className="body-2  font-medium text-font-1000">
					Categoria de solicitud
				</label>
				<select
					name="category"
					id="category"
					className="body-2 text-font-900 base-input-slim py-2"
				>
					<option defaultChecked value="Vacaciones">
						Vacaciones1
					</option>
					<option value="Vacaciones">Vacaciones2</option>
					<option value="Vacaciones">Vacaciones3</option>
					<option value="Vacaciones">Vacaciones4</option>
				</select>
			</div>

			<Input
				decoration="flex flex-col gap-1 w-1/4"
				id="startDate"
				name="startDate"
				type="date"
			/>

			<Input decoration="flex flex-col gap-1 w-1/4" id="endDate" name="endDate" type="date" />
		</aside>
	);
};

export default FilterBar;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'src/components/ui/atoms/Input';
import type { FilterBarProps } from 'src/utils/types/components.admin';
import { fetchCategories } from 'src/store/categories';
import type { RootState, AppDispatch } from 'src/store';

const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: availableCategories, loading, loaded, error } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    const hasSaved = sessionStorage.getItem('categories');
    if (!hasSaved && !loaded && !loading) {
      dispatch(fetchCategories());
    }
  }, [dispatch, loaded, loading]);

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
        <label htmlFor="category" className="body-2 font-normal text-font-1000">
          Categoría de solicitud
        </label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="body-2 text-font-900 base-input-slim py-2"
        >
          <option value="">Todas las categorías</option>

          {loading ? (
            <option disabled>Cargando...</option>
          ) : error ? (
            <option disabled>Error al cargar</option>
          ) : availableCategories.length > 0 ? (
            availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))
          ) : (
            <option disabled>No hay categorías</option>
          )}
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

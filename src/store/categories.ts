import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from 'src/utils/constant/API';
import type { RootState } from '.';
import { useBaseUrl } from 'src/config/api/BaseUrl.API';

type Category = { category_name: string };

type CategoryResponse = {
  data: {
    categories: Category[];
  };
};

// Obtener categorías cacheadas desde sessionStorage
const cachedCategories = sessionStorage.getItem('categories');
const parsedCategories = cachedCategories ? JSON.parse(cachedCategories) as string[] : [];

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { getState }) => {
    console.log('Fetching from:', API_ENDPOINTS.CATEGORIES);

    if (cachedCategories) {
      console.log('Usando categorías cacheadas de sessionStorage');
      return parsedCategories;
    }

    const state = getState() as RootState;
    const token = state.auth.token;
    if (!token) {
      throw new Error('Token no disponible');
    }

    const API_BASE_URL = useBaseUrl();
    const url = API_ENDPOINTS.CATEGORIES.startsWith('http')
      ? API_ENDPOINTS.CATEGORIES
      : `${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (response.status === 304 && cachedCategories) {
      console.log('Respuesta 304: usando cache');
      return parsedCategories;
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Error del servidor: ${response.status} - ${text}`);
    }

    const json: CategoryResponse = await response.json();
    const categories = json.data.categories.map((c) => c.category_name);

    sessionStorage.setItem('categories', JSON.stringify(categories));
    return categories;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: parsedCategories,
    loading: false,
    loaded: parsedCategories.length > 0,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        console.log('fetchCategories: pendiente...');
        state.loading = true;
        state.error = null;
        state.loaded = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log('fetchCategories: éxito', action.payload);
        state.list = action.payload;
        state.loading = false;
        state.loaded = true;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.error('fetchCategories: error', action.error);
        state.loading = false;
        state.error = action.error.message ?? 'Error al cargar categorías';
        state.loaded = false;
      });
  },
});

export default categoriesSlice.reducer;

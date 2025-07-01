import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/store/auth';
import categoriesReducer from 'src/store/categories';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		categories: categoriesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

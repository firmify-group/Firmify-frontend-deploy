import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
	token: string | null;
	id: string | null;
	role: string | null;
};

type AuthPayload = {
	token: string;
	id: string;
	role: string;
};

const initialState: AuthState = {
	token: localStorage.getItem('token'),
	id: localStorage.getItem('id'),
	role: localStorage.getItem('role'),
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<AuthPayload>) {
			state.token = action.payload.token;
			state.id = action.payload.id;
			state.role = action.payload.role;
			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('id', action.payload.id);
			localStorage.setItem('role', action.payload.role);
		},
		removeAuth(state) {
			state.token = null;
			state.id = null;
			state.role = null;
			localStorage.removeItem('token');
			localStorage.removeItem('id');
			localStorage.removeItem('role');
		},
	},
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;

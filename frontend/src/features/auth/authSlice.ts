import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@src/store/store.ts";

export interface IAuthState {
	email: string | null;
	token: string | null;
}

const initialState: IAuthState = {
	email: null,
	token: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<IAuthState>) => {
			const { email, token } = action.payload;
			state.email = email;
			state.token = token;
		},
		logout: (state) => {
			state.email = null;
			state.token = null;
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.email;
export const selectCurrentToken = (state: RootState) => state.auth.token;

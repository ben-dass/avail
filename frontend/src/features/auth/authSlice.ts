import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@src/app/store.ts";

export interface IAuthState {
	email: string | null;
	access_token: string | null;
	refresh_token: string | null;
}

const initialState: IAuthState = {
	email: null,
	access_token: null,
	refresh_token: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<IAuthState>) => {
			const { email, access_token, refresh_token } = action.payload;
			state.email = email;
			state.access_token = access_token;
			state.refresh_token = refresh_token;
		},
	},
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.email;
export const selectCurrentAccessToken = (state: RootState) =>
	state.auth.access_token;
export const selectCurrentRefreshToken = (state: RootState) =>
	state.auth.refresh_token;

import { createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
	loggedIn: boolean;
	username: string;
}

const initialState: IAuthState = {
	loggedIn: false,
	username: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logIn: (state, action) => {
			state.loggedIn = true;
			state.username = action.payload;
		},
		logOut: (state) => {
			state.loggedIn = false;
			state.username = "";
		},
	},
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;

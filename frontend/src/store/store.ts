import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "@pages/auth/authSlice.ts";
import moviesReducer from "@pages/movies/moviesSlice.ts";
import { apiSlice } from "@src/store/apiSlice.ts";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		movies: moviesReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

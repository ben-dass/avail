import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "@/src/pages/Auth/authSlice.ts";
import moviesReducer from "@/src/pages/Movies/moviesSlice.ts";

export const store = configureStore({
	reducer: { auth: authReducer, movies: moviesReducer },
});

export type RootState = ReturnType<typeof store.dispatch>;
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

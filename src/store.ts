import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "@/src/pages/Auth/authSlice.ts";

export const store = configureStore({
	reducer: { auth: authReducer },
});

export type RootState = ReturnType<typeof store.dispatch>;
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

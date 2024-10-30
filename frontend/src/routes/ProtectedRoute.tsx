import { Navigate } from "react-router-dom";
import React from "react";
import { useAppSelector } from "@src/app/store.ts";
import { selectCurrentAccessToken } from "@src/features/auth/authSlice.ts";

interface IProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
	const accessToken = useAppSelector(selectCurrentAccessToken);
	return accessToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

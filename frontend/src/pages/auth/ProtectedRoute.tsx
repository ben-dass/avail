import { Navigate } from "react-router-dom";
import React from "react";
import { useAppSelector } from "@/lib/store.ts";

interface IProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
	const authState = useAppSelector((state) => state.auth);

	return authState.loggedIn ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;

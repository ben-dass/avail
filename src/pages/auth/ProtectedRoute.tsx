import { Navigate } from "react-router-dom";
import React from "react";

interface IProtectedRouteProps {
	children: React.ReactNode;
	isAuthenticated: boolean;
}

const ProtectedRoute = ({
	children,
	isAuthenticated,
}: IProtectedRouteProps) => {
	return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;

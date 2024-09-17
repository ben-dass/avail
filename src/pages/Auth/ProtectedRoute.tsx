import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
	children: React.ReactNode;
	isAuthenticated: boolean;
}

const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
	return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;

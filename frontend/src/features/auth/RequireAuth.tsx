import { selectCurrentToken } from "@src/features/auth/authSlice.ts";
import { useAppSelector } from "@src/app/store.ts";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
	const token = useAppSelector(selectCurrentToken);
	const location = useLocation();

	return token ? (
		<Outlet />
	) : (
		<Navigate
			to={`/login`}
			state={{ from: location }}
			replace
		/>
	);
};

export default RequireAuth;

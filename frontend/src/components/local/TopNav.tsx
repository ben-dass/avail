import { NavLink } from "react-router-dom";
import { useAppSelector } from "@src/app/store.ts";
import { selectCurrentUser } from "@src/features/auth/authSlice.ts";

const TopNav = () => {
	// const dispatch = useAppDispatch();
	const authState = useAppSelector((state) => state.auth);
	const email = useAppSelector(selectCurrentUser);

	return (
		<div className="mt-[1.5rem] flex items-center justify-between rounded-lg bg-black bg-opacity-20 pb-[0.5rem] pt-[0.5rem] outline outline-[0.11rem] outline-black drop-shadow-lg backdrop-blur-lg">
			<h1 className="z-10 ml-[1rem] text-2xl font-bold tracking-widest text-slate-100">
				AVAIL
			</h1>
			{authState.email ? (
				<p className="mr-[1rem] text-sm text-gray-400">
					<span>{email} </span>
					&nbsp; | &nbsp;
					<a className="cursor-pointer transition duration-300 ease-in-out hover:text-white hover:underline">
						Logout
					</a>
				</p>
			) : (
				<NavLink
					to="/login"
					className="mr-[1rem] text-sm text-gray-400 transition duration-300 ease-in-out hover:text-white hover:underline"
				>
					Login
				</NavLink>
			)}
		</div>
	);
};

export default TopNav;

import { NavLink } from "react-router-dom";

const TopNav = () => {
	return (
		<div className="mt-[1.5rem] flex items-center justify-between rounded-lg bg-black bg-opacity-20 pb-[0.5rem] pt-[0.5rem] outline outline-[0.11rem] outline-black drop-shadow-lg backdrop-blur-lg">
			<h1 className="z-10 ml-[1rem] text-2xl font-bold tracking-widest text-slate-100">
				AVAIL
			</h1>
			<NavLink
				to="/auth"
				className="mr-[1rem] text-sm text-gray-400 hover:text-white hover:underline"
			>
				Login
			</NavLink>
		</div>
	);
};

export default TopNav;

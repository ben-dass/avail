import { Outlet } from "react-router-dom";

const Content = () => {
	return (
		<div className="min-h-[20rem] w-full rounded-xl bg-black bg-opacity-20 pb-[0.5rem] pt-[0.5rem] text-white outline outline-[0.12rem] outline-black drop-shadow-lg backdrop-blur-lg">
			<div className="mb-1 ml-3 mr-3 mt-1">
				<Outlet />
			</div>
		</div>
	);
};

export default Content;

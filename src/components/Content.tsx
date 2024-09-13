import { Outlet } from "react-router-dom";

const Content = () => {
	return (
		<div className="w-full bg-gray-400">
			<Outlet />
		</div>
	);
};

export default Content;

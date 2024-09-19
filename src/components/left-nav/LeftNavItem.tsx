import React from "react";
import { NavLink } from "react-router-dom";
import { ILeftNavItem } from "@/src/components/left-nav/LeftNav.tsx";

interface ILeftNavItemProps {
	item: ILeftNavItem;
}

const LeftNavItem: React.FC<ILeftNavItemProps> = ({
	item,
}: ILeftNavItemProps) => {
	return (
		<li className="w-[10rem]">
			<NavLink
				to={item.url}
				className={({ isActive }) =>
					`transition duration-300 ease-in-out hover:text-white hover:underline ${isActive ? "text-white underline" : "text-gray-400"}`
				}
			>
				{item.name}
			</NavLink>
		</li>
	);
};

export default LeftNavItem;

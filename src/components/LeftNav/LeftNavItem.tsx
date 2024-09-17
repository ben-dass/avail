import React from "react";
import { NavLink } from "react-router-dom";
import { leftNavItem } from "@/src/components/LeftNav/LeftNav.tsx";

interface LeftNavItemProps {
	item: leftNavItem;
}

const LeftNavItem: React.FC<LeftNavItemProps> = ({
	item,
}: LeftNavItemProps) => {
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

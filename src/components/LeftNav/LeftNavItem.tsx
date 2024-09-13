import React from "react";
import { leftNavItem } from "@/src/components/LeftNav/LeftNav.tsx";

interface LeftNavItemProps {
	item: leftNavItem;
}

const LeftNavItem: React.FC<LeftNavItemProps> = ({
	item,
}: LeftNavItemProps) => {
	return (
		<li className="w-[10rem] hover:text-white hover:underline">
			<a
				href={item.url}
				className="transition duration-150 ease-in-out"
			>
				{item.name}
			</a>
		</li>
	);
};

export default LeftNavItem;

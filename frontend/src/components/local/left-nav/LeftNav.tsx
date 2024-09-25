import LeftNavItem from "./LeftNavItem.tsx";
import { useAppSelector } from "@src/store/store.ts";

export interface ILeftNavItem {
	name: string;
	url: string;
	isProtectedRoute: boolean;
}

const LeftNav = () => {
	const authState = useAppSelector((state) => state.auth);

	const leftNavItems: ILeftNavItem[] = [
		{ name: "Home", url: "/", isProtectedRoute: false },
		{ name: "Movies", url: "/movies", isProtectedRoute: false },
		{ name: "Genres", url: "/genres", isProtectedRoute: false },
	];

	if (authState.email) {
		leftNavItems.push(
			{
				name: "Add Movies",
				url: "/addMovies",
				isProtectedRoute: true,
			},
			{
				name: "Manage Catalogue",
				url: "/manageCatalogue",
				isProtectedRoute: true,
			},
			{ name: "GraphQL", url: "/graphql", isProtectedRoute: true },
		);
	}

	return (
		<div className="flex min-h-[10rem] w-[11rem] flex-1 items-start justify-between rounded-lg bg-black bg-opacity-20 outline outline-[0.11rem] outline-black drop-shadow-lg backdrop-blur-lg">
			<ul className="mb-3 ml-4 mr-4 mt-3 flex flex-col gap-[0.5rem] text-sm">
				{leftNavItems.map((item) => (
					<LeftNavItem
						item={item}
						key={item.name}
					/>
				))}
			</ul>
		</div>
	);
};

export default LeftNav;

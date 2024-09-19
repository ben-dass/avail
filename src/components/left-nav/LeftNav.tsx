import LeftNavItem from "./LeftNavItem.tsx";

export interface ILeftNavItem {
	name: string;
	url: string;
	isProtectedRoute: boolean;
}

const LeftNav = () => {
	const leftNavItems: ILeftNavItem[] = [
		{ name: "Home", url: "/", isProtectedRoute: false },
		{ name: "Movies", url: "/movies", isProtectedRoute: false },
		{ name: "Genres", url: "/genres", isProtectedRoute: false },
		{ name: "Add Movies", url: "/addMovies", isProtectedRoute: true },
		{
			name: "Manage Catalogue",
			url: "/manageCatalogue",
			isProtectedRoute: true,
		},
		{ name: "GraphQL", url: "/graphql", isProtectedRoute: true },
	];

	return (
		<div className="flex max-h-[11.5rem] w-[11rem] items-center justify-between rounded-lg bg-black bg-opacity-20 outline outline-[0.11rem] outline-black drop-shadow-lg backdrop-blur-lg">
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

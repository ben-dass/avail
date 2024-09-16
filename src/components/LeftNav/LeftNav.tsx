import LeftNavItem from "@/src/components/LeftNav/LeftNavItem.tsx";

export interface leftNavItem {
	name: string;
	url: string;
}

const leftNavItems: leftNavItem[] = [
	{ name: "Home", url: "/" },
	{ name: "Movies", url: "/movies" },
	{ name: "Genres", url: "/genres" },
	{ name: "Add Movies", url: "/addMovies" },
	{ name: "Manage Catalogue", url: "/manageCatalogue" },
	{ name: "GraphQL", url: "/graphql" },
];

const LeftNav = () => {
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

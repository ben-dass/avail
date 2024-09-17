import { createBrowserRouter } from "react-router-dom";
import App from "@/src/App.tsx";
import Home from "@/src/pages/Home.tsx";
import AddMovies from "@/src/pages/AddMovies.tsx";
import Genres from "@/src/pages/Genres.tsx";
import GraphQL from "@/src/pages/GraphQL.tsx";
import ManageCatalogue from "@/src/pages/ManageCatalogue.tsx";
import Movies from "@/src/pages/Movies/Movies.tsx";
import NotFound from "@/src/pages/NotFound.tsx";
import Auth from "@/src/pages/Auth/Auth.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: "/addMovies",
						element: <AddMovies />,
					},
					{
						path: "/genres",
						element: <Genres />,
					},
					{
						path: "/graphql",
						element: <GraphQL />,
					},
					{
						path: "/manageCatalogue",
						element: <ManageCatalogue />,
					},
					{
						path: "/movies",
						element: <Movies />,
					},
					{
						path: "/auth",
						element: <Auth />,
					},
				],
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

export default router;

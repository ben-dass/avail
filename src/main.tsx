import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/src/App.tsx";
import ErrorPage from "@/src/pages/ErrorPage.tsx";
import AddMovies from "@/src/pages/AddMoviesPage.tsx";
import GenresPage from "@/src/pages/GenresPage.tsx";
import GraphQLPage from "@/src/pages/GraphQLPage.tsx";
import ManageCataloguePage from "@/src/pages/ManageCataloguePage.tsx";
import MoviesPage from "@/src/pages/MoviesPage.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/addMovies",
				element: <AddMovies />,
			},
			{
				path: "/genres",
				element: <GenresPage />,
			},
			{
				path: "/graphql",
				element: <GraphQLPage />,
			},
			{
				path: "/manageCatalogue",
				element: <ManageCataloguePage />,
			},
			{
				path: "/movies",
				element: <MoviesPage />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);

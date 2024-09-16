import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/src/App.tsx";
import NotFound from "@/src/pages/NotFound.tsx";
import AddMovies from "@/src/pages/AddMovies.tsx";
import Genres from "@/src/pages/Genres.tsx";
import GraphQL from "@/src/pages/GraphQL.tsx";
import ManageCatalogue from "@/src/pages/ManageCatalogue.tsx";
import Movies from "@/src/pages/Movies/Movies.tsx";
import Home from "@/src/pages/Home.tsx";
import Login from "@/src/pages/Login.tsx";

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
						path: "/login",
						element: <Login />,
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

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);

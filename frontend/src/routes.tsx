import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "@pages/Home.tsx";
import AddMovies from "@pages/AddMovies.tsx";
import Genres from "@pages/Genres.tsx";
import GraphQL from "@pages/GraphQL.tsx";
import ManageCatalogue from "@pages/ManageCatalogue.tsx";
import Movies from "@pages/movies/Movies.tsx";
import NotFound from "@pages/NotFound.tsx";
import Auth from "@pages/auth/Auth.tsx";
import Movie from "@pages/movies/Movie.tsx";
import ProtectedRoute from "@pages/auth/ProtectedRoute.tsx";

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
						path: "/movies",
						element: <Movies />,
					},
					{
						path: "/movies/:id",
						element: <Movie />,
					},
					{
						path: "/genres",
						element: <Genres />,
					},
					{
						path: "/auth",
						element: <Auth />,
					},
					{
						path: "/addMovies",
						element: (
							<ProtectedRoute>
								<AddMovies />
							</ProtectedRoute>
						),
					},
					{
						path: "/graphql",
						element: (
							<ProtectedRoute>
								<GraphQL />
							</ProtectedRoute>
						),
					},
					{
						path: "/manageCatalogue",
						element: (
							<ProtectedRoute>
								<ManageCatalogue />
							</ProtectedRoute>
						),
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

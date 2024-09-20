import { createBrowserRouter } from "react-router-dom";
import App from "@/src/App.tsx";
import Home from "@/src/pages/Home.tsx";
import AddMovies from "@/src/pages/AddMovies.tsx";
import Genres from "@/src/pages/Genres.tsx";
import GraphQL from "@/src/pages/GraphQL.tsx";
import ManageCatalogue from "@/src/pages/ManageCatalogue.tsx";
import Movies from "@/src/pages/movies/Movies.tsx";
import NotFound from "@/src/pages/NotFound.tsx";
import Auth from "@/src/pages/auth/Auth.tsx";
import Movie from "@/src/pages/movies/Movie.tsx";
import ProtectedRoute from "@/src/pages/auth/ProtectedRoute.tsx";

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

import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Home from "@src/features/Home.tsx";
import AddMovies from "@src/features/AddMovies.tsx";
import Genres from "@src/features/Genres.tsx";
import GraphQL from "@src/features/GraphQL.tsx";
import ManageCatalogue from "@src/features/ManageCatalogue.tsx";
import Movies from "@src/features/movies/Movies.tsx";
import NotFound from "@src/features/NotFound.tsx";
import Login from "@src/features/auth/Login.tsx";
import Movie from "@src/features/movies/Movie.tsx";
import ProtectedRoute from "@src/routes/ProtectedRoute.tsx";

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
						path: "/login",
						element: <Login />,
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

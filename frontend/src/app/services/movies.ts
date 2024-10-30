import { IMovie } from "@src/features/movies/moviesSlice";
import { apiSlice } from "../apiSlice";

export const moviesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMovies: builder.query<IMovie[], void>({
			query: () => "/movies",
		}),
		getCurrentCatalog: builder.query( {
			query: () => (
				{
					url: "/admin/manage-catalog",
					method: "GET",
					credentials: "include",
				}
			),
		} ),
	}),
});

export const { useGetMoviesQuery, useGetCurrentCatalogQuery } = moviesApiSlice;

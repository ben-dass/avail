import { IMovie } from "@src/features/movies/moviesSlice";
import { apiSlice } from "../apiSlice";

export const moviesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMovies: builder.query<IMovie[], void>({
			query: () => "/movies",
		}),
	}),
});

export const { useGetMoviesQuery } = moviesApiSlice;

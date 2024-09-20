import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie } from "@pages/movies/moviesSlice.ts";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
	endpoints: (builder) => ({
		getMovies: builder.query<IMovie[], void>({
			query: () => "/movies",
		}),
	}),
});

export const { useGetMoviesQuery } = apiSlice;

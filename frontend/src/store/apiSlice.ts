import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie } from "@pages/movies/moviesSlice.ts";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080",
		credentials: "include",
	}),
	endpoints: (builder) => ({
		getMovies: builder.query<IMovie[], void>({
			query: () => "/movies",
		}),
		login: builder.mutation({
			query: (payload) => ({
				url: "/authenticate",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
	}),
});

export const { useGetMoviesQuery, useLoginMutation } = apiSlice;

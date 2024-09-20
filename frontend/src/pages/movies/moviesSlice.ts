import { createSlice } from "@reduxjs/toolkit";
// import { apiSlice } from "@src/store/apiSlice.ts";
// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IMovie {
	id: number | null;
	title: string;
	release_date: string;
	runtime: number | null;
	mpaa_rating: string;
	description: string;
}

export interface IMovies {
	loading: boolean;
	error: string;
	movies: IMovie[];
}

const initialState: IMovies = {
	loading: false,
	error: "",
	movies: [],
};

export const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		addMovie: () => {},
		removeMovie: () => {},
	},
});

// export const moviesAPISlice = apiSlice.injectEndpoints({
// 	endpoints: (builder) => ({
// 		getMovies: builder.query({
// 			query: () => ({
// 				url: "http://localhost:8080/movies",
// 			}),
// 		}),
// 	}),
// });

export const { addMovie, removeMovie } = moviesSlice.actions;
// export const { useGetMoviesQuery } = moviesAPISlice;
export default moviesSlice.reducer;

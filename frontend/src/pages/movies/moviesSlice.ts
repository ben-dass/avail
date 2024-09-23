import { createSlice } from "@reduxjs/toolkit";

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

export const { addMovie, removeMovie } = moviesSlice.actions;
export default moviesSlice.reducer;

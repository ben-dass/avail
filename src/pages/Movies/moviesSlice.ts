import { createSlice } from "@reduxjs/toolkit";

export interface MovieInterface {
	id: number;
	title: string;
	release_date: string;
	runtime: number;
	mpaa_rating: string;
	description: string;
}

export interface MoviesState {
	movies: MovieInterface[];
}

export const initialState: MoviesState = {
	movies: [
		{
			id: 1,
			title: "Highlander",
			release_date: "1986-03-07",
			runtime: 116,
			mpaa_rating: "R",
			description:
				'An immortal Scottish swordsman must confront the last of his immortal opponents, a murderously brutal barbarian who lusts for the fabled "Prize".',
		},
		{
			id: 2,
			title: "Raiders of the Lost Ark",
			release_date: "1981-06-12",
			runtime: 115,
			mpaa_rating: "PG-13",
			description:
				"In 1936, archaeologists and adventurers of the U.S. government hired Indiana Jones to find the Ark of the Covenant before the Nazis could obtain its extraordinary powers.",
		},
	],
};

export const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		addMovie: (state, action) => {},
		removeMovie: (state, action) => {},
	},
});

export const { addMovie, removeMovie } = moviesSlice.actions;
export default moviesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export interface IMovie {
	id: number | null;
	title: string;
	release_date: string;
	runtime: number | null;
	mpaa_rating: string;
	description: string;
}

export interface IMoviesState {
	movies: IMovie[];
}

export const initialState: IMoviesState = {
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
		addMovie: () => {},
		removeMovie: () => {},
	},
});

export const { addMovie, removeMovie } = moviesSlice.actions;
export default moviesSlice.reducer;

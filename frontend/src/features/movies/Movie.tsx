import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMovie } from "@src/features/movies/moviesSlice.ts";

const Movie = () => {
	const { id } = useParams();

	const [movie, setMovie] = useState<IMovie>({
		id: null,
		title: "",
		release_date: "",
		runtime: null,
		mpaa_rating: "",
		description: "",
	});
	const [runtime, setRuntime] = useState<string>("");

	useEffect(() => {
		const selectedMovie = {
			id: 1,
			title: "Highlander",
			release_date: "1986-03-07",
			runtime: 116,
			mpaa_rating: "R",
			description:
				'An immortal Scottish swordsman must confront the last of his immortal opponents, a murderously brutal barbarian who lusts for the fabled "Prize".',
		};
		setMovie(selectedMovie);
		breakdownRuntime(selectedMovie.runtime);
	}, [id]);

	const breakdownRuntime = (runtime: number) => {
		const hoursAmount = Math.floor(runtime / 60);
		let hoursString;
		if (hoursAmount < 2) {
			hoursString = `${hoursAmount} hour`;
		} else {
			hoursString = `${hoursAmount} hours`;
		}

		const minutesAmount = runtime % 60;
		let minutesString = "";
		if (minutesAmount < 2) {
			minutesString = `${minutesAmount} minute`;
		} else {
			minutesString = `${minutesAmount} minutes`;
		}

		setRuntime(`${hoursString} ${minutesString}`);
	};

	return (
		<div>
			<div className="m-2 flex justify-center text-xl font-bold">
				{movie.title}
			</div>
			<hr className="mx-auto max-w-[10rem] border-gray-600" />
			<div className="flex w-full flex-col items-center justify-center">
				<span className="m-2 text-xs text-gray-400">
					<span className="italic">{movie.release_date}</span>
					&nbsp;|&nbsp;
					<span className="italic">{runtime}</span>
					&nbsp;|&nbsp;
					<span className="font-bold">{movie.mpaa_rating}</span>
				</span>
				<p className="ml-10 mr-10 mt-4">{movie.description}</p>
			</div>
		</div>
	);
};

export default Movie;

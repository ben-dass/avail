import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table.tsx";
import { NavLink } from "react-router-dom";
import { IRootState, useAppSelector } from "@/src/store.ts";
import { IMovie, IMoviesState } from "@/src/pages/movies/moviesSlice.ts";

const Movies = () => {
	const [movies, setMovies] = useState<IMovie[]>([]);
	const moviesState = useAppSelector<IRootState, IMoviesState>(
		(state) => state.movies,
	);

	useEffect(() => {
		setMovies(moviesState.movies);
	}, [moviesState]);

	return (
		<Table>
			<TableHeader>
				<TableRow className="border-gray-600 hover:bg-black hover:bg-opacity-0">
					<TableHead className="text-slate-400">Title</TableHead>
					<TableHead className="text-slate-400">
						Release Date
					</TableHead>
					<TableHead className="text-slate-400">Runtime</TableHead>
					<TableHead className="text-slate-400">Rating</TableHead>
					<TableHead className="text-slate-400">
						Description
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{movies.map((movie) => (
					<TableRow
						key={movie.title}
						className="border-gray-600 hover:bg-gray-700"
					>
						<TableCell className="font-bold">
							<NavLink
								className="hover:underline"
								to={`/movies/${movie.id}`}
							>
								{movie.title}
							</NavLink>
						</TableCell>
						<TableCell className="text-gray-300">
							{movie.release_date}
						</TableCell>
						<TableCell className="text-gray-300">
							{movie.runtime}
						</TableCell>
						<TableCell className="text-gray-300">
							{movie.mpaa_rating}
						</TableCell>
						<TableCell className="text-gradient to-99% max-w-[20rem] truncate bg-gradient-to-r from-gray-300 from-85% to-transparent bg-clip-text text-transparent">
							{movie.description}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default Movies;

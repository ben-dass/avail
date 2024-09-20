import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table.tsx";
import { NavLink } from "react-router-dom";
import { IMovie } from "./moviesSlice.ts";
import { useGetMoviesQuery } from "@src/store/apiSlice.ts";
import React from "react";

const Movies = () => {
	const { data = [], isLoading, isSuccess, isError } = useGetMoviesQuery();

	let content: React.ReactNode;

	if (isLoading) {
		content = <div>Loading...</div>;
	} else if (isError) {
		content = <div>Something went wrong.</div>;
	} else if (isSuccess) {
		content = (
			<Table>
				<TableHeader>
					<TableRow className="border-gray-600 hover:bg-black hover:bg-opacity-0">
						<TableHead className="text-slate-400">Title</TableHead>
						<TableHead className="text-slate-400">
							Release Date
						</TableHead>
						<TableHead className="text-slate-400">
							Runtime
						</TableHead>
						<TableHead className="text-slate-400">Rating</TableHead>
						<TableHead className="text-slate-400">
							Description
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((movie: IMovie) => (
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
	}

	return <>{content}</>;
};

export default Movies;

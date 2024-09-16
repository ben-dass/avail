import { useEffect, useState } from "react";
import { columns, Movie, moviesList } from "@/src/pages/Movies/helpers.tsx";
import { DataTable } from "../../components/DataTable/DataTable.tsx";

const Movies = () => {
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		setMovies(moviesList);
	}, [movies]);

	return (
		<div className="mx-auto">
			<DataTable
				columns={columns}
				data={moviesList}
			/>
		</div>
	);
};

export default Movies;

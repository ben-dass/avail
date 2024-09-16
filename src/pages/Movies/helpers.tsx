import { ColumnDef } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

export interface Movie {
	id: number;
	title: string;
	release_date: string;
	runtime: number;
	mpaa_rating: string;
	description: string;
}

export const moviesList: Movie[] = [
	{
		id: 1,
		title: "Highlander",
		release_date: "1986-03-07",
		runtime: 116,
		mpaa_rating: "R",
		description: "Some long description",
	},
	{
		id: 2,
		title: "Raiders of the Lost Ark",
		release_date: "1981-06-12",
		runtime: 115,
		mpaa_rating: "PG-13",
		description: "Some long description",
	},
];

export const columns: ColumnDef<Movie>[] = [
	{
		accessorKey: "title",

		// Can use arrow function to manipulate the l&f of heading.
		// header: () => <></>,
		header: "Title",

		// Can use arrow function to manipulate the data & l&f.
		// cell: () => {}
	},
	{
		accessorKey: "release_date",
		header: "Release Date",
	},
	{
		accessorKey: "runtime",
		header: "Runtime",
	},
	{
		accessorKey: "mpaa_rating",
		header: "Rating",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			console.log(row);
			return (
				<div className="flex justify-end">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="h-8 w-8 p-0"
							>
								<span className="sr-only">Open menu</span>
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="border border-black bg-gray-800 text-white"
						>
							<DropdownMenuItem disabled={true}>
								Coming Soon..
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie } from "@src/features/movies/moviesSlice.ts";
import { logout, setCredentials } from "@src/features/auth/authSlice.ts";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:8080",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (!token) {
			headers.set("Authorization", `Bearer ${token}	`);
		}
		return headers;
	},
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status === 403) {
		console.log("sending refresh token");

		const refreshResult = await baseQuery(
			"/refresh-token",
			api,
			extraOptions,
		);

		console.log("refresh result: ", refreshResult);

		if (refreshResult?.data) {
			const email = api.getState().auth.email;
			api.dispatch(setCredentials({ ...refreshResult.data, email }));
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logout());
		}
	}

	return result;
};

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		getMovies: builder.query<IMovie[], void>({
			query: () => "/movies",
		}),
	}),
});

export const { useGetMoviesQuery } = apiSlice;

import { apiSlice } from "@src/app/apiSlice.js";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (payload) => ({
				url: "/authenticate",
				method: "POST",
				body: { ...payload },
			}),
		}),
	}),
});

export const { useLoginMutation } = authApiSlice;

import { apiSlice } from "@src/store/apiSlice.js";

export const authAPISlice = apiSlice.injectEndpoints({
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

export const { useLoginMutation } = authAPISlice;

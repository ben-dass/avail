import { apiSlice } from "@src/app/apiSlice.js";


export const authApiSlice = apiSlice.injectEndpoints( {
    endpoints: ( builder ) => (
        {
            login: builder.mutation( {
                query: ( payload ) => (
                    {
                        url: "/authenticate",
                        method: "POST",
                        body: { ...payload },
                    }
                ),
            } ),
            logout: builder.mutation<void, void>( {
                query: () => (
                    {
                        url: "/logout",
                        method: "POST",
                        credentials: "include",
                    }
                ),
            } ),
            refreshToken: builder.query( {
                query: () => (
                    {
                        url: "/refresh-token",
                        method: "GET",
                        credentials: "include",
                    }
                ),
            } ),
        }
    ),
} );

export const { useLoginMutation, useRefreshTokenQuery, useLogoutMutation } =
    authApiSlice;


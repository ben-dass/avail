import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";


export const apiSlice = createApi( {
    reducerPath: "api",
    baseQuery: fetchBaseQuery( {
        baseUrl: "http://localhost:8080",
        credentials: "include",
        prepareHeaders: ( headers, { getState } ) => {
            const token = (
                getState() as RootState
            ).auth.access_token;
            
            if ( token ) {
                headers.set( "authorization", `Bearer ${ token }` );
            }
            
            return headers;
        },
    } ),
    endpoints: () => (
        {}
    ),
} );

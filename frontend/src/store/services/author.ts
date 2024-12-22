import { api } from "./api";

export const authorApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchAuthors: builder.query({
            query: () => "/api/v1/authors",
            providesTags: ["authors"],
        }),
    }),
});

export const { useFetchAuthorsQuery, useLazyFetchAuthorsQuery } = authorApi;

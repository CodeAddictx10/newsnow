import { api } from "./api";

export const sourceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchSources: builder.query({
            query: () => "/api/v1/sources",
            providesTags: ["sources"],
        }),
    }),
});

export const { useLazyFetchSourcesQuery } = sourceApi;

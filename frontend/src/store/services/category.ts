import { api } from "./api";

export const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchCategories: builder.query({
            query: () => "/api/v1/categories",
            providesTags: ["categories"],
        }),
    }),
});

export const {useLazyFetchCategoriesQuery } = categoryApi;

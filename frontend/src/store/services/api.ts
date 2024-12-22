import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { getCsrfToken } from "@/lib/utils";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
        const csrf = getCsrfToken();
        if (csrf) {
            headers.set("X-XSRF-TOKEN", csrf);
        }

        headers.set("Referer", "http://127.0.0.1:5137");
        headers.set("Content-Type", "application/json");
        headers.set("X-Requested-With", "XMLHttpRequest");
        return headers;
    },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRetry,
    tagTypes: [
        "authors",
        "user",
        "categories",
        "sources",
        "breaking_news",
        "news",
        "feeds"
    ],
    endpoints: (builder) => ({
        getCookies: builder.mutation<void, void>({
            query: () => ({
                url: "/sanctum/csrf-cookie",
                method: "GET",
            }),
        }),
    }),
});

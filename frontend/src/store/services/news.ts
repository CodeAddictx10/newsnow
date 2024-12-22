import { TNews } from "@/types";
import { api } from "./api";

type TNewsResponse = {
    data: TNews[];
    meta: {
        next_cursor: string | null;
    };
};

export const newsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchBreakingNews: builder.query<{ data: TNews }, any>({
            query: () => "/api/v1/breaking-news",
            providesTags: ["breaking_news"],
        }),
        fetchNews: builder.query<
            TNewsResponse,
            { cursor?: string; query?: string }
        >({
            query: ({
                cursor,
                query,
            }: {
                cursor?: string;
                query?: string;
            }) => ({
                url: `/api/v1/news${query ? "?" + query : ""}`,
                params: { cursor },
            }),
            providesTags: (_, _err, { cursor, query }) => [
                { type: "news", id: query || "DEFAULT" },
                { type: "news", id: cursor || "DEFAULT" },
            ],
        }),
        fetchUserPersonalizedNew: builder.query<
            TNewsResponse,
            { cursor?: string; query?: string }
        >({
            query: ({
                cursor,
                query,
            }: {
                cursor?: string;
                query?: string;
            }) => ({
                url: `/api/v1/feeds${query ? "?" + query : ""}`,
                params: { cursor },
            }),
            providesTags: (_, _err, { cursor, query }) => [
                { type: "feeds", id: query || "DEFAULT" },
                { type: "feeds", id: cursor || "DEFAULT" },
            ],
        }),
    }),
});

export const { useFetchNewsQuery, useFetchBreakingNewsQuery, useFetchUserPersonalizedNewQuery } = newsApi;

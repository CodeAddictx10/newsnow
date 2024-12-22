import type { RootState } from "@/store";
import { authorApi } from "@/store/services/author";
import { Option } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "author",
    initialState: {authors: []} ,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            authorApi.endpoints.fetchAuthors.matchFulfilled,
            (state, { payload }) => {
                state.authors = payload.data.map(
                    (author: { id: number; name: string }) => {
                        return {
                            id: author.id,
                            name: author.name,
                            label: author.name,
                            value: author.name,
                        };
                    },
                );
            },
        );
    },
});

export default slice.reducer;

export const selectAuthors = (state: RootState): Option[] => state.author.authors;

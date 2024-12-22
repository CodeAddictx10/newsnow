import type { RootState } from "@/store";
import { sourceApi } from "@/store/services/source";
import { Option } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "source",
    initialState: {sources: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            sourceApi.endpoints.fetchSources.matchFulfilled,
            (state, { payload }) => {
                state.sources = payload.data.map(
                    (source: { id: number; name: string }) => {
                        return {
                            id: source.id,
                            name: source.name,
                            label: source.name,
                            value: source.name,
                        };
                    },
                );
            },
        );
    },
});

export default slice.reducer;

export const selectSources = (state: RootState):Option[] => state.source.sources;

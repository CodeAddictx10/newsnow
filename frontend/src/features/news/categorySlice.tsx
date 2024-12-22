import type { RootState } from "@/store";
import { categoryApi } from "@/store/services/category";
import { Option } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "category",
    initialState: { categories: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            categoryApi.endpoints.fetchCategories.matchFulfilled,
            (state, { payload }) => {
                state.categories = payload.data.map(
                    (category: { id: number; name: string }) => {
                        return {
                            id: category.id,
                            name: category.name,
                            label: category.name,
                            value: category.name,
                        };
                    },
                );
            },
        );
    },
});

export default slice.reducer;

export const selectCategories = (state: RootState): Option[] => state.category.categories;

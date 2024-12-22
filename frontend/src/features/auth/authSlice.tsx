import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "@/store/services/auth";
import type { RootState } from "@/store";
import { TUser } from "@/types";

type AuthState = {
    user: TUser | null;
    token: string | null;
    isAuthenticated: boolean;
    formType: "register" | "login";
};

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    formType: "login",
} as AuthState;

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
        },
        changeFormType: (state, action: { payload: "register" | "login" }) => {
            state.formType = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.register.matchFulfilled, (state) => {
                state.formType = "login";
            })
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    console.log(payload);
                    
                    state.isAuthenticated = true;
                    state.user = payload.data!
                },
            )
            .addMatcher(
                authApi.endpoints.fetchUser.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload.data;
                    state.isAuthenticated = true;
                },
            );
    },
});

export default slice.reducer;

export const { logout, changeFormType } = slice.actions;

export const selectCurrentUser = (state: RootState): TUser => state.auth.user;

export const selectIsAuthenticated = (state: RootState): boolean =>
    state.auth.isAuthenticated;

export const selectFormType = (state: RootState): "register" | "login" =>
    state.auth.formType;

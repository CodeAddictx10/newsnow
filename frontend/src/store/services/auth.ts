import { TLoginRequest, TRegisterRequest, UserResponse } from "@/types";
import { api } from "./api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, TLoginRequest>({
            onQueryStarted(_, { dispatch }) {
                dispatch(api.endpoints.getCookies.initiate());
            },
            query: (credentials) => ({
                url: "/api/v1/login",
                method: "POST",
                body: credentials,
                credentials: "include",
            }),
        }),
        register: builder.mutation<UserResponse, TRegisterRequest>({
            onQueryStarted(_, { dispatch }) {
                dispatch(api.endpoints.getCookies.initiate());
            },
            query: (credentials) => ({
                url: "/api/v1/register",
                method: "POST",
                body: credentials,
            }),
        }),
        fetchUser: builder.query({
            query: () => "/api/v1/auth",
            providesTags: ["user"],
        }),
        updateUser: builder.mutation<UserResponse, Partial<TRegisterRequest>>({
            onQueryStarted(_, { dispatch }) {
                dispatch(api.endpoints.getCookies.initiate());
            },
            query: (data) => ({
                url: "/api/v1/auth",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        updatePassword: builder.mutation<
            UserResponse,
            Partial<TRegisterRequest>
        >({
            onQueryStarted(_, { dispatch }) {
                dispatch(api.endpoints.getCookies.initiate());
            },
            query: (data) => ({
                url: "/api/v1/password",
                method: "PATCH",
                body: data,
            }),
        }),
        updatePreferences: builder.mutation({
            onQueryStarted(_, { dispatch }) {
                dispatch(api.endpoints.getCookies.initiate());
            },
            query: (data) => ({
                url: "/api/v1/preferences",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["user", "feeds"],
        }),
    }),
});

export const { useLoginMutation, useFetchUserQuery, useRegisterMutation, useUpdateUserMutation, useUpdatePasswordMutation, useUpdatePreferencesMutation } = authApi;

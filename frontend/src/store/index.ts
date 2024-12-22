import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/store/services/auth";
import authReducer from "@/features/auth/authSlice";
import authorReducer from "@/features/news/authorSlice";
import categoryReducer from "@/features/news/categorySlice";
import sourceReducer from "@/features/news/sourceSlice";
import { api } from "./services/api";
import { authorApi } from "./services/author";
import { categoryApi } from "./services/category";
import { sourceApi } from "./services/source";
import { newsApi } from "./services/news";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    authApi,
    auth: authReducer,
    author: authorReducer,
    category: categoryReducer,
    source: sourceReducer,
    authorApi,
    categoryApi,
    sourceApi,
    newsApi
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

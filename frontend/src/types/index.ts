type TRecord = {
    id: number;
    name: string;
    key?: string;
};
export type TUser = {
    id: number;
    name: string;
    email: string;
    preferences: {
        authors: TRecord[];
        categories: TRecord[];
        sources: TRecord[];
    };
    created_at: Date;
    updated_at: Date;
};

export type UserResponse = {
    message: string;
    data?: TUser;
};

export type TRegisterRequest = {
    name: string;
    email: string;
    password: string;
};
export type TLoginRequest = {
    email: string;
    password: string;
};

export type Option = {
    id: number;
    name: string;
    label: string;
    value: string;
};

export type TNews = {
    id: number;
    title: string;
    description?: string;
    url: string;
    thumbnail?: string;
    category?: TRecord;
    source?: TRecord;
    author?: TRecord;
    published_at: string;
};

export type TUseNews = {
    news: TNews[];
    isFetching: boolean;
    isLoading: boolean;
    loadMore: () => void;
    meta:
        | {
              next_cursor: string | null;
          }
        | undefined;
};

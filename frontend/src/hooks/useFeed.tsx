import { useFetchUserPersonalizedNewQuery } from "@/store/services/news";
import { TNews } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useFeed() {
    const [search] = useSearchParams();
    const [news, setNews] = useState<TNews[]>([]);
    const [cursor, setCursor] = useState<string | undefined>(undefined);
    const { data, isFetching, isLoading } = useFetchUserPersonalizedNewQuery({
        cursor,
        query: search.toString(),
    });

    const loadMore = () => {
        if (!data?.meta.next_cursor) return;
        setCursor(data?.meta.next_cursor);
    };

    useEffect(() => {
        if (data?.data) {
            setNews((prev: TNews[]) => [...prev, ...data.data]);
        }
    }, [data]);
    return { news, isFetching, isLoading, loadMore, meta: data?.meta };
}

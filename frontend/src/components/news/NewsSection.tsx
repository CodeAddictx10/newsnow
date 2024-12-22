import { TUseNews } from "@/types";
import { Button } from "../ui/button";
import NewsCard from "./NewsCard";

type TNewSectionProps = TUseNews & { title: string };
export default function NewsSection({
    title,
    news,
    isFetching,
    isLoading,
    loadMore,
    meta,
}: TNewSectionProps) {
    return (
        <section className="container px-0 pb-24 mx-auto text-gray-600 body-font">
            <div className="flex flex-wrap w-full lg:mb-20">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                        {title}
                    </h1>
                    <div className="h-1 w-20 bg-red-500"></div>
                </div>
            </div>
            <div className="flex flex-wrap">
                {news.map((item, index) => (
                    <NewsCard news={item} key={`news_card_${index}`} />
                ))}
            </div>
            <div className="flex justify-center mt-12">
                {meta?.next_cursor && !isFetching && (
                    <Button
                        onClick={loadMore}
                        className="px-10 py-6"
                        disabled={isLoading}>
                        Load More
                    </Button>
                )}

                {isFetching && !isLoading && (
                    <p className="text-center">Loading more posts...</p>
                )}
            </div>
        </section>
    );
}

import NewsSection from "@/components/news/NewsSection";
import useFeed from "@/hooks/useFeed";

export default function NewsFeed() {
    const data = useFeed();
    
    return (
        <section className="py-4">
            <NewsSection title="My Feed" {...data} />
        </section>
    );
}

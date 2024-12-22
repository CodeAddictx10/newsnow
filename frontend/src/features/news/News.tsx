import NewsSection from "@/components/news/NewsSection";
import useNews from "@/hooks/useNews";

export default function News() {
    const data = useNews();
    
    return <NewsSection title="Stories" {...data} />;
}

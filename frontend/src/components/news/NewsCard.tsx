import { TNews } from "@/types";
import { Badge } from "../ui/badge";
import { formatDistance } from "date-fns";

type TNewsCardProps = {
    news: TNews;
};
export default function NewsCard({ news }: TNewsCardProps) {
    return (
        <a
            href={news.url}
            target="_blank"
            className="xl:w-1/4 md:w-1/2 mb-8 px-4 min-h-[350px] flex">
            <div className="bg-gray-100 p-6 rounded-lg flex flex-col justify-between w-full">
                <img
                    className="h-40 w-full object-cover object-center mb-4"
                    src={
                        news.thumbnail ||
                        `https://dummyimage.com/1000x400/000/d3d4d6&text=${news.source?.name}`
                    }
                    alt={news.title}
                    onError={(e) => {
                        e.currentTarget.src = `https://dummyimage.com/1000x400/000/d3d4d6&text=${news.source?.name}`;
                    }}
                />
                <div className="flex justify-between items-center">
                    <Badge className="uppercase text-xs w-max mb-2">
                        {news.source?.name}
                    </Badge>
                    <p className="text-xs capitalize">{news.category?.name}</p>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2 line-clamp-3">
                    {news.title}
                </h2>
                <p
                    className="leading-relaxed text-sm line-clamp-5 mb-4"
                    dangerouslySetInnerHTML={{
                        __html: news.description || "",
                    }}></p>
                <p className="flex mt-auto justify-between">
                    <small className="capitalize text-xs">
                        {formatDistance(news.published_at, new Date(), {
                            addSuffix: true,
                        })}
                    </small>
                    <small className="text-xs">{news.author?.name}</small>
                </p>
            </div>
        </a>
    );
}

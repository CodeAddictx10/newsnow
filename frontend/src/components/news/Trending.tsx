import { cn } from "@/lib/utils";
import { useFetchBreakingNewsQuery } from "@/store/services/news";
import { buttonVariants } from "../ui/button";

export default function Trending() {
    const { data } = useFetchBreakingNewsQuery({});
    return (
        <section className="container mx-auto flex md:flex-row flex-col items-center   py-10">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 mb-10 md:mb-0">
                <img
                    className="object-cover object-center rounded"
                    alt={data?.data.title}
                    src={data?.data.thumbnail}
                />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <span className="text-primary font-bold gap-x-2 mb-4">
                    Latest news
                </span>
                <h1 className="title-font sm:text-4xl text-3xl mb-4 text-justify md:text-start font-medium text-gray-900">
                    {data?.data.title}
                </h1>
                <p className="mb-8 leading-relaxed text-start">{data?.data.description}</p>
                <a
                    className={cn(buttonVariants(), "flex justify-center px-10")}
                    target="_blank"
                    href={data?.data.url}>
                    Read
                </a>
            </div>
        </section>
    );
}

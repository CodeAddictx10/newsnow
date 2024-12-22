import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { selectAuthors } from "@/features/news/authorSlice";
import { selectCategories } from "@/features/news/categorySlice";
import { selectSources } from "@/features/news/sourceSlice";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import DatePicker from "../DatePicker";
import NewsAuthorSelector from "./NewsAuthorSelect";
import NewsCategorySelect from "./NewsCategorySelect";
import NewsSourceSelect from "./NewsSourceSelect";
import { format, parseISO } from "date-fns";

const formSchema = z.object({
    title: z.string().optional(),
    date: z.string().optional(),
    categories: z
        .array(
            z.object({
                id: z.number(),
                label: z.string(),
                value: z.string(),
            }),
        )
        .optional(),
    sources: z
        .array(
            z.object({
                id: z.number(),
                label: z.string(),
                value: z.string(),
            }),
        )
        .optional(),
    authors: z
        .array(
            z.object({
                id: z.number(),
                label: z.string(),
                value: z.string(),
            }),
        )
        .optional(),
});

type SearchNewsFormProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchNewsForm({ setOpen }: SearchNewsFormProps) {
    const [search, setSearchParams] = useSearchParams();
    const authors = useAppSelector(selectAuthors);
    const categories = useAppSelector(selectCategories);
    const sources = useAppSelector(selectSources);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            authors: [],
            sources: [],
            categories: [],
            date: undefined,
        },
    });

    useEffect(() => {
        if (search) {
            const parsedSearch = new URLSearchParams(search);
            form.setValue("title", parsedSearch.get("filter[title]") || "");
            form.setValue(
                "date",
                parsedSearch.get("filter[published_at]") != null
                    ? format(
                          parseISO(
                              parsedSearch.get("filter[published_at]")!,
                          ).toString(),
                          "yyyy-MM-dd HH:mm:ss",
                      )
                    : undefined,
            );
            form.setValue(
                "authors",
                authors.filter((item) =>
                    parsedSearch
                        .get("filter[author_id]")
                        ?.split(",")
                        .includes(`${item.id}`),
                ),
            );
            form.setValue(
                "categories",
                categories.filter((item) =>
                    parsedSearch
                        .get("filter[category_id]")
                        ?.split(",")
                        .includes(`${item.id}`),
                ),
            );
            form.setValue(
                "sources",
                sources.filter((item) =>
                    parsedSearch
                        .get("filter[source_id]")
                        ?.split(",")
                        .includes(`${item.id}`),
                ),
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, authors, categories, sources]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = {
            authors: (values.authors?.map((item) => item.id) || []).toString(),
            categories: (
                values.categories?.map((item) => item.id) || []
            ).toString(),
            sources: (values.sources?.map((item) => item.id) || []).toString(),
        };

        const queryParams = new URLSearchParams();

        if (values.title?.length) {
            queryParams.set("filter[title]", values.title);
        }
        if (data.authors?.length) {
            queryParams.set("filter[author_id]", data.authors);
        }
        if (data.categories?.length) {
            queryParams.set("filter[category_id]", data.categories);
        }
        if (data.sources?.length) {
            queryParams.set("filter[source_id]", data.sources);
        }
        if (values.date) {
            queryParams.set(
                "filter[published_at]",
                format(parseISO(values.date).toString(), "yyyy-MM-dd HH:mm:ss"),
            );
        }

        setOpen(false);
        setSearchParams(queryParams);
    }
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Search news by title..."
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <DatePicker field={field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <NewsCategorySelect field={field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sources"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <NewsSourceSelect field={field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="authors"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <NewsAuthorSelector field={field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full h-12"
                        disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <LoaderCircle />}
                        Search
                    </Button>
                </form>
            </Form>
        </>
    );
}

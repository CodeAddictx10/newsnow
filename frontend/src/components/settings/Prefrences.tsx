import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/store/hooks";
import { useUpdatePreferencesMutation } from "@/store/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NewsAuthorSelector from "../news/NewsAuthorSelect";
import NewsCategorySelect from "../news/NewsCategorySelect";
import NewsSourceSelect from "../news/NewsSourceSelect";
import { LoaderCircle } from "lucide-react";

const FormSchema = z.object({
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

export function Preferences() {
    const [updatePreference] = useUpdatePreferencesMutation();
    const currentUser = useAppSelector(selectCurrentUser);

    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            sources:
                currentUser?.preferences.sources.map((item) => ({
                    id: item.id,
                    label: item.name,
                    value: item.name,
                })) || [],
            categories:
                currentUser?.preferences.categories.map((item) => ({
                    id: item.id,
                    label: item.name,
                    value: item.name,
                })) || [],
            authors:
                currentUser?.preferences.authors.map((item) => ({
                    id: item.id,
                    label: item.name,
                    value: item.name,
                })) || [],
        },
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            const data = {
                authors: values.authors?.map((item) => item.id) || [],
                categories: values.categories?.map((item) => item.id) || [],
                sources: values.sources?.map((item) => item.id) || [],
            };

            await updatePreference(data);

            toast({
                title: "News preferences updated successfully",
            });
        } catch (error) {
            console.log("rejected", error);
            toast({
                variant: "destructive",
                title: "Unable to update your new preferences, please try again",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 lg:mb-20 gap-y-5 gap-x-10">
                    <FormField
                        control={form.control}
                        name="sources"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>News Source</FormLabel>
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
                                <FormLabel>News Author</FormLabel>
                                <FormControl>
                                    <NewsAuthorSelector field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>News Categories</FormLabel>
                                <FormControl>
                                    <NewsCategorySelect field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end my-10">
                    <Button
                        type="submit"
                        className="h-12 w-24"
                        disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <LoaderCircle />}
                        Update
                    </Button>
                </div>
            </form>
        </Form>
    );
}

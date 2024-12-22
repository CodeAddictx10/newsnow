import {
  FormControl,
  FormItem
} from "@/components/ui/form";
import { selectCategories } from "@/features/news/categorySlice";
import { useAppSelector } from "@/store/hooks";
import { useLazyFetchCategoriesQuery } from "@/store/services/category";
import { useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";
import MultipleSelector from "../ui/multi-select";

const NewsCategorySelect = ({
    field,
    placeholder = "Select news categories you want to read from...",
}: {
    //  eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, string>;
    placeholder?: string;
}) => {
    const categories = useAppSelector(selectCategories);
    const [fetchCategories] = useLazyFetchCategoriesQuery();

    useEffect(() => {
        if (!categories || categories.length === 0) {
            fetchCategories({});
        }
    }, [categories, fetchCategories]);

    return (
        <FormItem>
            <FormControl>
                <MultipleSelector
                    {...field}
                    defaultOptions={[]}
                    options={categories}
                    placeholder={placeholder}
                    emptyIndicator={
                        <p className="text-center text-xs leading-10">
                            No results found.
                        </p>
                    }
                />
            </FormControl>
        </FormItem>
    );
};

export default NewsCategorySelect;

import {
  FormControl,
  FormItem
} from "@/components/ui/form";
import { selectAuthors } from "@/features/news/authorSlice";
import { useAppSelector } from "@/store/hooks";
import { useLazyFetchAuthorsQuery } from "@/store/services/author";
import { useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";
import MultipleSelector from "../ui/multi-select";

const NewsAuthorSelector = ({
    field,
    placeholder = "Select news authors you want to read from...",
}: {
    //  eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, string>;
    placeholder?: string;
}) => {
  const authors = useAppSelector(selectAuthors);
  const [fetchAuthors] = useLazyFetchAuthorsQuery();
  
  useEffect(() => {
    if (!authors || authors.length === 0) {
      fetchAuthors({});
    }
  }, [authors, fetchAuthors]);

    return (
        <FormItem>
            <FormControl>
                <MultipleSelector
                    {...field}
                    defaultOptions={[]}
                    options={authors}
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

export default NewsAuthorSelector;

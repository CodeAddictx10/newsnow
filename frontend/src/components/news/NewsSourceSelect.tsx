import {
  FormControl,
  FormItem
} from "@/components/ui/form";
import { selectSources } from "@/features/news/sourceSlice";
import { useAppSelector } from "@/store/hooks";
import { useLazyFetchSourcesQuery } from "@/store/services/source";
import { useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";
import MultipleSelector from "../ui/multi-select";

const NewsSourceSelect = ({
    field,
    placeholder = "Select news provider you want to read from...",
}: {
    //  eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, string>;
    placeholder?: string;
}) => {
    const sources = useAppSelector(selectSources);
    const [fetchSources] = useLazyFetchSourcesQuery();

    useEffect(() => {
        if (!sources || sources.length === 0) {
            fetchSources({});
        }
    }, [sources, fetchSources]);

    return (
        <FormItem>
            <FormControl>
                <MultipleSelector
                    {...field}
                    defaultOptions={[]}
                    options={sources}
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

export default NewsSourceSelect;

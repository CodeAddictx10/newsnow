import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Search } from "lucide-react";
import SearchNewsForm from "./news/SearchNewsForm";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function SearchNews() {
    const [search] = useSearchParams();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    
    if (!["/user/feed", "/"].includes(location.pathname)) {
        return null;
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Search className={cn(search.size && "text-primary")} />
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]" side={"right"}>
                <SheetHeader>
                    <SheetTitle className="mb-3">
                        Search news by title
                    </SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <SearchNewsForm setOpen={setOpen} />
            </SheetContent>
        </Sheet>
    );
}

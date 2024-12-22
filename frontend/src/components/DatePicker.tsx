import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

type DatePickerProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, string>;
};
export default function DatePicker({ field }: DatePickerProps) {
    const [open, setOpen] = useState(false); 
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-between text-left font-normal h-12 hover:bg-transparent hover:border-foreground",
                        !field.value && "text-muted-foreground",
                    )}>
                    {field.value ? (
                        format(new Date(field.value), "PPP")
                    ) : (
                        <span className="text-xs">Select date</span>
                    )}
                    <CalendarIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                        field.onChange(date?.toISOString());
                        setOpen(false); 
                    }}
                    disabled={(date) =>
                        date > new Date() || date < new Date("2024-01-01")
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps } from "react-hook-form";

const PasswordField = ({
    field,
    label = "Password",
    placeholder = "Enter your password",
}: {
    //  eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, string>;
    label?: string;
    placeholder?: string;
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={placeholder}
                        {...field}
                    />
                    <div className="absolute right-2 bottom-2">
                        {showPassword ? (
                            <Eye
                                onClick={() => setShowPassword(false)}
                                className="cursor-pointer"
                            />
                        ) : (
                            <EyeClosed
                                onClick={() => setShowPassword(true)}
                                className="cursor-pointer"
                            />
                        )}
                    </div>
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};

export default PasswordField;

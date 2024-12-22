import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { changeFormType } from "@/features/auth/authSlice";
import { useRegisterMutation } from "@/store/services/auth";
import { useToast } from "@/hooks/use-toast";

type FormValues = {
    name: string;
    email: string;
    password: string;
};
const formSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6).max(50),
});

export default function RegisterForm() {
    const dispatch = useAppDispatch();
    const [register] = useRegisterMutation();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
             await register(values);
             
            toast({
                title: "Account created successfully",
            });
            form.reset();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Unable to create account, please try again",
            });
        }
    }
    return (
        <>
            <h2 className="text-center text-xl">
                Create a new account or{" "}
                <span
                    className="cursor-pointer text-primary"
                    onClick={() => dispatch(changeFormType("login"))}>
                    Login
                </span>{" "}
                to continue
            </h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your full name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email address"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => <PasswordField field={field} />}
                    />
                    <Button
                        type="submit"
                        className="w-full h-12"
                        disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <LoaderCircle />}
                        Create an Account
                    </Button>
                </form>
            </Form>
        </>
    );
}

const PasswordField = ({
    field,
}: {
    field: ControllerRenderProps<FormValues, "password">;
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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

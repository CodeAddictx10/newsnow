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
import { changeFormType } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useLoginMutation } from "@/store/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordField from "../PasswordField";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
});

export default function LoginForm() {
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await login(values).unwrap();
            toast({
                title: "Login successfully",
            });
             form.reset();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Unable to login, please try again",
            });
        }
    }
    return (
        <>
            <h2 className="text-center text-xl">
                Login or{" "}
                <span
                    className="cursor-pointer text-primary"
                    onClick={() => dispatch(changeFormType("register"))}>
                    register
                </span>{" "}
                to continue
            </h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
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
                        Login
                    </Button>
                </form>
            </Form>
        </>
    );
}

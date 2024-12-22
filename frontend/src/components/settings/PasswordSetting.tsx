import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import PasswordField from "../PasswordField";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUpdatePasswordMutation } from "@/store/services/auth";

const formSchema = z.object({
    old_password: z.string().min(6).max(50),
    password: z.string().min(6).max(50),
});

export default function PasswordSetting() {
    const [updatePassword] = useUpdatePasswordMutation();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            old_password: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updatePassword(values);

            toast({
                title: "Password updated successfully",
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
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <FormField
                        control={form.control}
                        name="old_password"
                        render={({ field }) => <PasswordField field={field} label="Old password" />}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => <PasswordField field={field} />}
                    />
                    <div className="flex justify-end">
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
        </>
    );
}

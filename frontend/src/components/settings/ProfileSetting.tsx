import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useUpdateUserMutation } from "@/store/services/auth";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    name: z.string().min(3),
    email: z.string().email().readonly(),
});

export default function ProfileSetting() {
    const user = useAppSelector(selectCurrentUser);
    const [updateUser] = useUpdateUserMutation();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
           await updateUser(values)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Unable to update user information, please try again",
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Olufemi Samuel"
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
                                        readOnly
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Your email can not be edited
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" className="h-12 w-24">
                            Update
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}

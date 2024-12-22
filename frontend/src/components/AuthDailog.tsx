import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import LoginForm from "./auth/LoginForm";
import { selectFormType } from "@/features/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import RegisterForm from "./auth/RegisterForm";

export default function AuthDailog() {
    const formType = useAppSelector(selectFormType);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="font-medium">Sign In</Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(_: Event) => _.preventDefault()}>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                {formType == "login" ? <LoginForm /> : <RegisterForm />}
            </DialogContent>
        </Dialog>
    );
}

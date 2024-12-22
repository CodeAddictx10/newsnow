import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { logout } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";

import { LogOut } from "lucide-react";

export default function LogoutDailog() {
    const dispatch = useAppDispatch();

    return (
        <AlertDialog>
            <AlertDialogTrigger className="flex gap-3">
                <LogOut size={16} className="text-primary" />
                <span>Log out</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => dispatch(logout())}>Yes</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

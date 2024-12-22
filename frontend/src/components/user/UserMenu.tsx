import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Newspaper, Settings } from "lucide-react";
import LogoutDailog from "./LogoutDailog";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/features/auth/authSlice";

export function UserMenu() {
  const navigate = useNavigate();
   const user = useAppSelector(selectCurrentUser);
   const initials =
       user?.name
           ?.split(" ")
           .slice(0, 2) 
           .map((n) => n.charAt(0))
           .join("") ?? "";
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-transparent">
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="h-8 w-8 rounded-full"
                        src={`https://dummyimage.com/400x400/000/d3d4d6&text=${initials}`}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer mb-3 py-3"
                        onClick={() => navigate("/user/feed")}>
                        <Newspaper size={16} />
                        <span>My feed</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer py-3"
                        onClick={() => navigate("/user/settings")}>
                        <Settings size={16} />
                        <span>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="py-3 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}>
                    <LogoutDailog />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

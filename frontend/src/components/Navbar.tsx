import { Link } from "react-router-dom";
import AuthDailog from "./AuthDailog";
import Logo from "./Logo";
import SearchDrawer from "./SearchNews";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { UserMenu } from "./user/UserMenu";

export default function Navbar() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    return (
        <nav className="container mx-auto flex h-16 items-center justify-between w-full">
            <div className="md:flex md:items-center md:gap-12">
                <Link to={"/"}>
                    <span className="sr-only">NewsNow</span>
                    <Logo />
                </Link>
            </div>
            <div className="flex items-center gap-8">
                <SearchDrawer />
                {isAuthenticated ? <UserMenu /> : <AuthDailog />}
            </div>
        </nav>
    );
}

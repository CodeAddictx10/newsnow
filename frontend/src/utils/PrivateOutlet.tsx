import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function PrivateOutlet() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const location = useLocation();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} />
    );
}

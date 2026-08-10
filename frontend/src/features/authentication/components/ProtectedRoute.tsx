import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export function ProtectedRoute() {

    const { user, isLoading } = useAuth();
    const location = useLocation();

    // if (isLoading) {
    //     return <LoadingPage message="Authenticating..." />;
    // }

    if (!user) {
        return <Navigate to="/auth/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
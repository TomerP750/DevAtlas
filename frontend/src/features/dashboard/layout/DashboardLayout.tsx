import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/Sidebar";


export function DashboardLayout() {
    return (
        <div className="flex min-h-screen dark:bg-dark-background">
            <Sidebar />

            {/* Main content */}
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    )
}
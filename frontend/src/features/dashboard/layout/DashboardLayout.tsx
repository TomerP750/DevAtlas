import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/Sidebar";


export function DashboardLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-200 dark:bg-dark-background">
            <Sidebar />

            {/* Main content */}
            <div className="min-h-0 flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}
import { CompassIcon, LogOut } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "./navItems";
import { Badge } from "../../../../shared/ui/Badge";


export function Sidebar() {


    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <aside className="h-screen hidden md:flex flex-col w-64 border border-black/10 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900 px-4 py-6">

            <div className="flex items-center border-b border-black/10 pb-5 dark:border-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm shadow-violet-500/25">
                    <CompassIcon size={24} strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Dev<span className="text-brand-primary dark:text-violet-400">Atlas</span>
                </h1>
            </div>

            <nav className="mt-4 flex flex-col gap-1 flex-1">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end
                            className={({ isActive }) => {
                                const matchesPrefix = item.activePathPrefix
                                    ? pathname.startsWith(item.activePathPrefix)
                                    : false;

                                return `group flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm font-medium ${isActive || matchesPrefix
                                    ? "bg-brand-primary/90 text-white dark:text-white"
                                    : "text-zinc-600 hover:bg-brand-primary/10 hover:text-zinc-950 dark:text-white/60 dark:hover:text-white"
                                }`;
                            }}
                        >
                            <Icon size={18} className="shrink-0" />
                            <span className="truncate">{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-zinc-200 pt-4 dark:border-white/10">
                
                {/* User row */}
                <div className="flex items-center justify-between">

                    {/* User badge */}
                    <div className="flex items-center gap-3 min-w-0">
                        <Badge
                            size="sm"
                        />

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                                {/* {user ? `${user?.firstName}` : "Guest"} */}
                                User One
                            </p>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        className="cursor-pointer rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
                        aria-label="Logout"
                        title="Logout"
                    // onClick={handleLogout}
                    onClick={() => navigate("/")}
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

        </aside>
    )
}
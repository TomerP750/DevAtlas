import { BookCheck, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";
import { Badge } from "../../../../shared/ui/Badge";


export function Sidebar() {
    return (
        <aside className="hidden md:flex flex-col w-64 border border-black/10 dark:border-white bg-neutral-100 dark:bg-gray-800 p-4">

            <h2 className="mb-8 inline-flex items-center gap-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                <BookCheck size={30} strokeWidth={1.2} />
                <span>DevAtlas</span>
            </h2>

            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end
                            className={({ isActive }) =>
                                `group flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm font-medium ${isActive
                                    ? "bg-brand-primary/90 text-white dark:text-white"
                                    : "text-zinc-600 hover:bg-brand-primary/10 hover:text-zinc-950 dark:text-white/60 dark:hover:text-white"
                                }`
                            }
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
                            </p>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        className="cursor-pointer rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
                        aria-label="Logout"
                    // onClick={handleLogout}
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

        </aside>
    )
}
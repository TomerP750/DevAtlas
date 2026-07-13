import type { LucideIcon } from "lucide-react";
import { HomeIcon, SettingsIcon } from "lucide-react";

type NavItem = {
    label: string;
    icon: LucideIcon;
    to: string;
}


export const navItems: NavItem[] = [
    {
        label: "Dashboard",
        icon: HomeIcon,
        to: "/dashboard",
    },
    {
        label: "Settings",
        icon: SettingsIcon,
        to: "/dashboard/settings",
    },
]
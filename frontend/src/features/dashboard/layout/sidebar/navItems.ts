import type { LucideIcon } from "lucide-react";
import { HomeIcon, SettingsIcon, WandSparklesIcon } from "lucide-react";

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
        label: "AI Path Creator",
        icon: WandSparklesIcon,
        to: "/dashboard/ai-path-creator",
    },
    {
        label: "Settings",
        icon: SettingsIcon,
        to: "/dashboard/settings",
    },
]
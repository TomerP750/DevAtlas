import type { LucideIcon } from "lucide-react";
import { HomeIcon, MessageSquare, SettingsIcon, WandSparklesIcon } from "lucide-react";

type NavItem = {
    label: string;
    icon: LucideIcon;
    to: string;
    activePathPrefix?: string;
}


export const navItems: NavItem[] = [
    {
        label: "Dashboard",
        icon: HomeIcon,
        to: "/dashboard",
        activePathPrefix: "/dashboard/learning-path",
    },
    {
        label: "AI Path Creator",
        icon: WandSparklesIcon,
        to: "/dashboard/ai-path-creator",
    },
    // {
    //     label: "Messages",
    //     icon: MessageSquare,
    //     to: "/dashboard/messages"
    // },
    {
        label: "Settings",
        icon: SettingsIcon,
        to: "/dashboard/settings",
    },
]
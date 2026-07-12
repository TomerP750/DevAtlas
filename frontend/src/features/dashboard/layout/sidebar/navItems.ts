import type { LucideIcon } from "lucide-react";
import { BookIcon, HomeIcon } from "lucide-react";

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
        label: "Learnings",
        icon: BookIcon,
        to: "/dashboard/learnings",
    },

]
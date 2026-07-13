import type { LucideIcon } from "lucide-react";

interface DashboardHeaderProps {
    title: string;
    description: string;
    Icon?: LucideIcon;
}

export function DashboardHeader({ title, description, Icon }: DashboardHeaderProps) {
    return (
        <header className="p-5 min-h-25 bg-brand-primary text-white dark:bg-gray-800">
            <div className="flex items-center gap-2">
                {Icon && <Icon className="h-5 w-5" />}
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <p className="text-sm text-white dark:text-zinc-400">{description}</p>
        </header>
    )
}
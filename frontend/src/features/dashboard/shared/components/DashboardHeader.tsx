import type { LucideIcon } from "lucide-react";

interface DashboardHeaderProps {
    title: string;
    description: string;
    Icon?: LucideIcon;
}

export function DashboardHeader({ title, description, Icon }: DashboardHeaderProps) {
    return (
        <header className="flex flex-col justify-center h-20 border-b border-black/10 dark:border-white/10 bg-brand-primary p-5 text-white dark:bg-transparent dark:text-dark-text">
            <div className="flex items-center gap-3">
                {Icon && <Icon className="h-10 w-10 shrink-0 text-white dark:text-violet-400" strokeWidth={1.5} />}
                <div className="flex flex-col">
                    <h1 className="text-base font-semibold uppercase tracking-wide text-white dark:text-violet-400">{title}</h1>
                    <p className="text-sm text-violet-100 dark:text-dark-text-muted">{description}</p>
                </div>
            </div>
        </header>
    )
}
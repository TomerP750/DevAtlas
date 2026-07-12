interface DashboardHeaderProps {
    title: string;
    description: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
    return (
        <header className="p-5 min-h-25 bg-brand-primary text-white dark:bg-gray-800">
            <div className="">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-sm">{description}</p>
            </div>
        </header>
    )
}
interface DashboardHeaderProps {
    title: string;
    description: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
    return (
        <header className="h-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </header>
    )
}
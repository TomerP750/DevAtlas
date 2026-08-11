

interface ProgressBarProps {
    completedTopicsCount: number;
    totalTopicsCount: number;
    className?: string;
    square?: boolean;
}

export function ProgressBar({ completedTopicsCount, totalTopicsCount, className = "", square = false }: ProgressBarProps) {
    

    const progress = Math.round((completedTopicsCount / totalTopicsCount) * 100);

    if (totalTopicsCount === 0) {
        return 0;
    }

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className="flex items-center justify-between mb-1 text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-neutral-500 dark:text-dark-text-muted">
                        Progress
                    </span>
                </div>

                <span className="font-medium text-neutral-700 dark:text-dark-text">
                    {progress}%
                </span>
            </div>

            <div className={`h-2 w-full overflow-hidden bg-neutral-200 dark:bg-dark-input-hover ${square ? "" : "rounded-full"}`}>
                <div
                    className={`h-full bg-brand-primary transition-all duration-300 ${square ? "" : "rounded-full"}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
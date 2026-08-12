

interface ProgressBarProps {
    completedCount: number;
    totalCount: number;
    className?: string;
    square?: boolean;
    showCount?: boolean;
}

export function ProgressBar({ completedCount, totalCount, className = "", square = false, showCount = false }: ProgressBarProps) {
    const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className="flex items-center justify-between mb-1 text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-neutral-500 dark:text-dark-text-muted">
                        Progress
                    </span>
                </div>

                <span className="flex items-center gap-2">
                    {showCount && (
                        <span className="font-normal tabular-nums text-neutral-500 dark:text-dark-text-muted">
                            {completedCount}/{totalCount} completed
                        </span>
                    )}
                    <span className="font-medium text-neutral-700 dark:text-dark-text">
                        {progress}%
                    </span>
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
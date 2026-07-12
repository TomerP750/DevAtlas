

interface ProgressBarProps {
    completedTopics: number;
    topicsLength: number;
    className?: string;
}

export function ProgressBar({ completedTopics, topicsLength, className = "" }: ProgressBarProps) {
    const progress = Math.round((completedTopics / topicsLength) * 100);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className="flex items-center justify-between mb-1 text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-neutral-500">
                        Progress
                    </span>
                </div>

                <span className="font-medium text-neutral-700">
                    {progress}%
                </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                    className="h-full rounded-full bg-brand-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
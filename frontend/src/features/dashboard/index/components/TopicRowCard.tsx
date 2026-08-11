import type { TopicDto } from "../models/learningPath/TopicDto";
import { ConfidenceLevel } from "../models/learningPath/enums/ConfidenceLevel";

interface TopicRowCardProps {
    topic: TopicDto;
}

function getConfidenceLineClass(confidenceLevel: ConfidenceLevel) {
    const lineClasses: Record<ConfidenceLevel, string> = {
        [ConfidenceLevel.LOW]: "bg-red-500",
        [ConfidenceLevel.MEDIUM]: "bg-amber-400",
        [ConfidenceLevel.HIGH]: "bg-emerald-500",
    };

    return lineClasses[confidenceLevel];
}

export function TopicRowCard({ topic }: TopicRowCardProps) {
    const { name, description, order, confidenceLevel } = topic;

    return (
        <article className="relative flex min-h-20 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-dark-border dark:bg-dark-card dark:shadow-black/20 dark:hover:border-dark-border-hover dark:hover:bg-dark-card-hover">
            <span
                className={`absolute inset-y-0 left-0 w-1 ${getConfidenceLineClass(confidenceLevel)}`}
                aria-hidden="true"
            />

            <div className="flex w-16 shrink-0 items-center justify-center border-r border-neutral-200 dark:border-dark-border">
                <span className="text-sm font-semibold tabular-nums text-neutral-400 dark:text-neutral-500">
                    {String(order).padStart(2, "0")}
                </span>
            </div>

            <div className="min-w-0 flex-1 px-5 py-4">
                <h3 className="truncate font-semibold text-neutral-950 dark:text-dark-text">
                    {name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm leading-5 text-neutral-500 dark:text-dark-text-muted">
                    {description}
                </p>
            </div>
        </article>
    );
}

 
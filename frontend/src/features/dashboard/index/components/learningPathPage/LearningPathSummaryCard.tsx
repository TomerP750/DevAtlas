import { BookOpen, CircleCheck, Layers, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../../../../shared/ui/Button";
import { ProgressBar } from "../../../../../shared/ui/ProgressBar";
import type { LearningPathDto } from "../../models/learningPath/LearningPathDto";
import { Difficulty } from "../../models/learningPath/Difficulty";

interface LearningPathSummaryCardProps {
    learningPath: LearningPathDto;
    onEdit: () => void;
    onDelete: () => void;
}

function getDifficultyStyles(difficulty: Difficulty) {
    const styles: Record<Difficulty, { accent: string; badge: string }> = {
        [Difficulty.BEGINNER]: {
            accent: "border-t-emerald-500 dark:border-t-emerald-400",
            badge: "border-emerald-300 text-emerald-700 dark:border-emerald-500 dark:text-emerald-300",
        },
        [Difficulty.INTERMEDIATE]: {
            accent: "border-t-amber-500 dark:border-t-amber-400",
            badge: "border-amber-300 text-amber-700 dark:border-amber-500 dark:text-amber-300",
        },
        [Difficulty.ADVANCED]: {
            accent: "border-t-red-500 dark:border-t-red-400",
            badge: "border-red-300 text-red-700 dark:border-red-500 dark:text-red-300",
        },
    };

    return styles[difficulty];
}

export function LearningPathSummaryCard({
    learningPath,
    onEdit,
    onDelete,
}: LearningPathSummaryCardProps) {
    const difficultyStyles = getDifficultyStyles(learningPath.difficulty);

    return (
        <aside className={`h-fit overflow-hidden border border-t-4 border-neutral-200 bg-white shadow-sm dark:border-dark-border dark:bg-dark-card dark:shadow-black/20 ${difficultyStyles.accent}`}>
            <div className="border-b border-neutral-200 px-6 py-5 dark:border-dark-border">
                <div className="flex flex-wrap gap-2">
                    <span className="border border-neutral-200 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
                        {learningPath.category.replaceAll("_", " ")}
                    </span>
                    <span className={`border px-2 py-1 text-[11px] font-semibold uppercase tracking-wider ${difficultyStyles.badge}`}>
                        {learningPath.difficulty}
                    </span>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                    <h1 className="min-w-0 text-2xl font-bold tracking-tight text-neutral-950 dark:text-dark-text">
                        {learningPath.name}
                    </h1>
                    <div className="flex shrink-0 gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0!"
                            leftIcon={<Pencil size={16} aria-hidden="true" />}
                            onClick={onEdit}
                            aria-label={`Edit ${learningPath.name}`}
                            title="Edit learning path"
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0! text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/40"
                            leftIcon={<Trash2 size={16} aria-hidden="true" />}
                            onClick={onDelete}
                            aria-label={`Delete ${learningPath.name}`}
                            title="Delete learning path"
                        />
                    </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-dark-text-muted">
                    {learningPath.description}
                </p>
            </div>

            <div className="p-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Learning stats
                </h2>

                <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="border border-t-2 border-neutral-200 border-t-blue-500 bg-neutral-50 p-3 dark:border-neutral-700 dark:border-t-blue-400 dark:bg-dark-input">
                        <BookOpen className="text-blue-500 dark:text-blue-300" size={17} aria-hidden="true" />
                        <div className="mt-3 text-2xl font-bold tabular-nums text-neutral-950 dark:text-dark-text">
                            {learningPath.totalTopicsCount}
                        </div>
                        <div className="mt-0.5 text-xs text-neutral-500 dark:text-dark-text-muted">
                            Topics
                        </div>
                    </div>
                    <div className="border border-t-2 border-neutral-200 border-t-violet-500 bg-neutral-50 p-3 dark:border-neutral-700 dark:border-t-violet-400 dark:bg-dark-input">
                        <Layers className="text-violet-500 dark:text-violet-300" size={17} aria-hidden="true" />
                        <div className="mt-3 text-2xl font-bold tabular-nums text-neutral-950 dark:text-dark-text">
                            {learningPath.totalSectionsCount}
                        </div>
                        <div className="mt-0.5 text-xs text-neutral-500 dark:text-dark-text-muted">
                            Sections
                        </div>
                    </div>
                    <div className="border border-t-2 border-neutral-200 border-t-emerald-500 bg-neutral-50 p-3 dark:border-neutral-700 dark:border-t-emerald-400 dark:bg-dark-input">
                        <CircleCheck className="text-emerald-500 dark:text-emerald-300" size={17} aria-hidden="true" />
                        <div className="mt-3 text-2xl font-bold tabular-nums text-neutral-950 dark:text-dark-text">
                            {learningPath.completedSectionsCount}
                        </div>
                        <div className="mt-0.5 text-xs text-neutral-500 dark:text-dark-text-muted">
                            Completed
                        </div>
                    </div>
                </div>

                <div className="mt-5 border border-neutral-200 p-4 dark:border-neutral-700">
                    <ProgressBar
                        completedCount={learningPath.completedSectionsCount}
                        totalCount={learningPath.totalSectionsCount}
                        square
                    />
                </div>
            </div>
        </aside>
    );
}

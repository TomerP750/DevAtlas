import { Map, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../shared/ui/Button";
import { ProgressBar } from "../../../../shared/ui/ProgressBar";
import type { LearningPathDto } from "../models/LearningPathDto";
import { CrudMenu } from "./CrudMenu";

interface LearningPathCardProps {
    learningPath: LearningPathDto;
}

export function LearningPathCard({ learningPath }: LearningPathCardProps) {

    const [crudMenuOpen, setCrudMenuOpen] = useState<boolean>(false);

    const { id, title, description, createdAt, topicsLength, completedTopicsCount } = learningPath;

    return (
        <article className="group rounded-xl border border-neutral-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 p-5 
        shadow-sm dark:shadow-zinc-800 transition hover:shadow-md hover:translate-y-[-2px]">
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/10 dark:text-zinc-100">
                            <Map size={30} strokeWidth={1.2} />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-zinc-100">
                                {title}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-zinc-400">
                                Created {createdAt.toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <Button
                            onClick={() => setCrudMenuOpen(prev => !prev)}
                            leftIcon={<MoreVertical size={18} />}
                            variant="ghost"
                            size="sm"
                            className="p-2! text-neutral-500 hover:text-neutral-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                        />

                        <CrudMenu
                            isOpen={crudMenuOpen}
                            learningPathId={id}
                            learningPathTitle={title}
                        />

                    </div>


                </div>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-neutral-600 dark:text-zinc-400">
                    {description}
                </p>

                {/* Progress */}

                <ProgressBar completedTopics={completedTopicsCount} topicsLength={topicsLength} />


                {/* Footer */}
                <div className="flex items-center justify-between border-t border-neutral-100 dark:border-zinc-700 pt-4">
                    <div className="flex gap-4 text-sm text-neutral-500 dark:text-zinc-400">
                        <span>{topicsLength} Topics</span>
                        <span>4 Sections</span>
                    </div>

                    <button className="text-sm font-medium text-primary hover:underline dark:text-zinc-400 dark:hover:text-zinc-200">
                        Continue →
                    </button>
                </div>
            </div>
        </article>
    );
}
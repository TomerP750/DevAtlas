import { BookOpen, CircleCheck, Layers, Map, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../shared/ui/Button";
import { ProgressBar } from "../../../../shared/ui/ProgressBar";
import type { LearningPathDto } from "../models/learningPath/LearningPathDto";
import { CrudMenu } from "./CrudMenu";
import { NavLink } from "react-router-dom";

interface LearningPathCardProps {
    learningPath: LearningPathDto;
}

export function LearningPathCard({ learningPath }: LearningPathCardProps) {

    const [crudMenuOpen, setCrudMenuOpen] = useState<boolean>(false);

    const { id, title, description, createdAt, totalSectionsCount, totalTopicsCount, completedTopicsCount } = learningPath;

    return (
        <article className="group rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-dark-border dark:bg-dark-card dark:shadow-black/20 dark:hover:border-dark-border-hover dark:hover:bg-dark-card-hover">
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-brand-primary dark:bg-violet-500/10 dark:text-violet-300">
                            <Map size={30} strokeWidth={1.2} />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-text">
                                {title}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-dark-text-muted">
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
                            className="p-2! text-neutral-500 hover:text-neutral-700 dark:text-dark-text-muted dark:hover:bg-dark-input-hover dark:hover:text-dark-text"
                        />

                        <CrudMenu
                            isOpen={crudMenuOpen}
                            learningPathId={id}
                            learningPathTitle={title}
                        />

                    </div>


                </div>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-neutral-600 dark:text-dark-text-muted">
                    {description}
                </p>

                {/* Progress */}

                <ProgressBar completedTopicsCount={completedTopicsCount} totalTopicsCount={totalTopicsCount} />


                {/* Footer */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-dark-border">
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-dark-text-muted">
                        <span className="flex items-center gap-1.5">
                            <Layers className="text-violet-500 dark:text-violet-300" size={16} aria-hidden="true" />
                            {totalSectionsCount} Sections
                        </span>
                        <span className="flex items-center gap-1.5">
                            <BookOpen className="text-blue-500 dark:text-blue-300" size={16} aria-hidden="true" />
                            {totalTopicsCount} Topics
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CircleCheck className="text-emerald-500 dark:text-emerald-300" size={16} aria-hidden="true" />
                            {completedTopicsCount} Completed
                        </span>
                    </div>

                    <NavLink className="text-sm font-medium text-brand-primary hover:underline dark:text-white dark:hover:text-violet-200" to={`/dashboard/learning-paths/${id}`}>
                        Continue
                    </NavLink>
                </div>
            </div>
        </article>
    );
}
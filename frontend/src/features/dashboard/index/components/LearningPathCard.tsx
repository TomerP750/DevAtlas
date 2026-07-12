import { Map, MoreVertical, Pencil, Trash, Trash2 } from "lucide-react";
import type { LearningPath } from "../models/LearningPath";
import { ProgressBar } from "../../../../shared/ui/ProgressBar";
import { Button } from "../../../../shared/ui/Button";
import { useState } from "react";
import { CrudMenu } from "./CrudMenu";

interface LearningPathCardProps {
    learningPath: LearningPath;
}

export function LearningPathCard({ learningPath }: LearningPathCardProps) {

    const [crudMenuOpen, setCrudMenuOpen] = useState<boolean>(false);

    const { id, title, description, createdAt, topicsLength, completedTopicsCount } = learningPath;

    return (
        <article className="group rounded-xl border border-neutral-200 bg-white p-5 
        shadow-sm transition hover:shadow-md hover:translate-y-[-2px]">
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Map size={30} strokeWidth={1.2} />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-neutral-900">
                                {title}
                            </h3>
                            <p className="text-sm text-neutral-500">
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
                            className="p-2! text-neutral-500 hover:text-neutral-700"
                        />

                        <CrudMenu isOpen={crudMenuOpen} learningPathId={id} />

                    </div>


                </div>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-neutral-600">
                    {description}
                </p>

                {/* Progress */}

                <ProgressBar completedTopics={completedTopicsCount} topicsLength={topicsLength} />


                {/* Footer */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                    <div className="flex gap-4 text-sm text-neutral-500">
                        <span>{topicsLength} Topics</span>
                        <span>4 Sections</span>
                    </div>

                    <button className="text-sm font-medium text-primary hover:underline">
                        Continue →
                    </button>
                </div>
            </div>
        </article>
    );
}
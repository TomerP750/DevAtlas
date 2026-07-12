import { Map } from "lucide-react";
import type { LearningPath } from "../models/LearningPath";

interface LearningPathCardProps {
    learningPath: LearningPath;
}

export function LearningPathCard({ learningPath }: LearningPathCardProps) {
    const { title, description, createdAt } = learningPath;

    return (
        <article className="group rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md">
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

                    <button className="text-neutral-400 hover:text-neutral-700">
                        ⋮
                    </button>
                </div>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-neutral-600">
                    {description}
                </p>

                {/* Progress */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">
                            Progress
                        </span>
                        <span className="font-medium">
                            65%
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                        <div className="h-full w-[65%] rounded-full bg-primary" />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                    <div className="flex gap-4 text-sm text-neutral-500">
                        <span>12 Topics</span>
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
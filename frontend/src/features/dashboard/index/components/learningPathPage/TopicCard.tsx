import { MenuIcon, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../../../shared/ui/Button";
import { ConfidenceLevel } from "../../models/shared/ConfidenceLevel";
import type { TopicDto } from "../../models/topic/TopicDto";
import { useState } from "react";
import { UpdateTopicModal } from "./UpdateTopicModal";
import { DeleteTopicModal } from "./DeleteTopicModal";
import { ProgressBar } from "../../../../../shared/ui/ProgressBar";

interface TopicCardProps {
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

export function TopicCard({ topic }: TopicCardProps) {

    const [isUpdateTopicModalOpen, setIsUpdateTopicModalOpen] = useState(false);
    const [isDeleteTopicModalOpen, setIsDeleteTopicModalOpen] = useState(false);

    const { name, description, order, confidenceLevel, completedSectionsCount, totalSectionsCount } = topic;

    return (
        <article className="group relative flex min-h-22 overflow-hidden rounded-r-lg rounded-l-none border border-neutral-200 bg-white shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-dark-border dark:bg-dark-card dark:shadow-black/20 dark:hover:border-dark-border-hover dark:hover:bg-dark-card-hover">
            <span
                className={`absolute inset-y-0 left-0 w-1 ${getConfidenceLineClass(confidenceLevel)}`}
                aria-hidden="true"
            />

            <Link
                to={`topic/${topic.id}`}
                className="flex w-16 shrink-0 items-center justify-center border-r border-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary dark:border-dark-border"
            >
                <span className="text-sm font-semibold tabular-nums text-neutral-400 dark:text-neutral-500">
                    {String(order).padStart(2, "0")}
                </span>
            </Link>

            <div className="min-w-0 flex-1 px-5 py-4">
                <div className="flex items-start gap-3">
                    <Link
                        to={`topic/${topic.id}`}
                        className="min-w-0 flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                    >
                    <h3 className="truncate font-semibold text-neutral-950 dark:text-dark-text">
                        {name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-neutral-500 dark:text-dark-text-muted">
                        {description}
                    </p>
                    </Link>

                    <div className="flex shrink-0 items-center gap-2 opacity-100 transition-opacity sm:pointer-events-none sm:opacity-0 sm:group-hover:pointer-events-auto sm:group-hover:opacity-100 sm:group-focus-within:pointer-events-auto sm:group-focus-within:opacity-100">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsUpdateTopicModalOpen(true)}
                            leftIcon={<Pencil size={16} aria-hidden="true" />}
                            className="h-9 w-9 bg-neutral-100 p-0! dark:bg-white/5"
                            aria-label={`Update ${name}`}
                            title="Update topic"
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsDeleteTopicModalOpen(true)}
                            leftIcon={<Trash2 size={16} aria-hidden="true" />}
                            className="h-9 w-9 bg-neutral-100 p-0! dark:bg-white/5"
                            aria-label={`Delete ${name}`}
                            title="Delete topic"
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<MenuIcon size={16} aria-hidden="true" />}
                            className="h-9 w-9 bg-neutral-100 p-0! dark:bg-white/5"
                            aria-label={`View ${name}`}
                            title="View topic"
                        />
                    </div>
                </div>

                <Link
                    to={`topic/${topic.id}`}
                    className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                    <ProgressBar
                        completedCount={completedSectionsCount}
                        totalCount={totalSectionsCount}
                        showCount
                        className="mt-3 w-full"
                    />
                </Link>
            </div>
            <UpdateTopicModal
                isOpen={isUpdateTopicModalOpen}
                onClose={() => setIsUpdateTopicModalOpen(false)}
                topic={topic}
            />
            <DeleteTopicModal
                isOpen={isDeleteTopicModalOpen}
                onClose={() => setIsDeleteTopicModalOpen(false)}
                topicId={topic.id}
                topicName={topic.name}
                learningPathId={topic.learningPathId}
            />
        </article>
    );
}

import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { ProgressBar } from "../../../../shared/ui/ProgressBar";
import { SectionCard } from "../components/topicPage/SectionCard";
import type { LearningPathDto } from "../models/learningPath/LearningPathDto";
import type { SectionDto } from "../models/section/SectionDto";
import type { TopicDto } from "../models/topic/TopicDto";

export default function TopicPage() {
    const { learningPathId, topicId } = useParams();
    const { data: learningPath } = useQuery<LearningPathDto | null>({
        queryKey: ["learningPath", learningPathId],
        queryFn: () => Promise.resolve(null),
        // enabled: Boolean(learningPathId),
        enabled: false
    });
    const { data: topic } = useQuery<TopicDto | null>({
        queryKey: ["topic", topicId],
        queryFn: () => Promise.resolve(null),
        // enabled: Boolean(topicId),
        enabled: false
    });
    const { data: sections = [] } = useQuery<SectionDto[]>({
        queryKey: ["sections", topicId],
        queryFn: () => Promise.resolve([]),
        // enabled: Boolean(topicId),
        enabled: false
    });

    return (
        <div className="mx-auto w-full max-w-7xl px-4 pb-4 pt-8 md:pt-10">
            <header className="mb-6 border-b border-neutral-300 px-1 pb-4 dark:border-dark-border">
                <Link
                    to={`/dashboard/learning-path/${learningPathId}`}
                    className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-dark-text-muted dark:hover:text-violet-300"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to topics
                </Link>

                <div className="flex items-end justify-between gap-6">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary dark:text-violet-300">
                            Learning path
                        </p>
                        <h1 className="mt-1 truncate text-2xl font-bold tracking-tight text-neutral-950 dark:text-dark-text">
                            {learningPath?.name ?? "Learning Path"}
                        </h1>
                    </div>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500 dark:text-dark-text-muted">
                    Continue through the sections below and track your progress as you learn.
                </p>
                {topic && (
                    <ProgressBar
                        completedCount={topic.completedSectionsCount}
                        totalCount={topic.totalSectionsCount}
                        className="mt-4"
                        showCount
                    />
                )}
            </header>

            <ul className="flex flex-col gap-3">
                {sections.map((section) => (
                    <li key={section.id}>
                        <SectionCard section={section} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
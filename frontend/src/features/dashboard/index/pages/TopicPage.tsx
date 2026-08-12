import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { ProgressBar } from "../../../../shared/ui/ProgressBar";
import { SectionCard } from "../components/topicPage/SectionCard";
import type { LearningPathDto } from "../models/learningPath/LearningPathDto";
import type { SectionDto } from "../models/section/SectionDto";
import type { TopicDto } from "../models/topic/TopicDto";
import topicService from "../api/topicService";
import sectionService from "../api/sectionService";
import learningPathService from "../api/learningPathService";

export default function TopicPage() {
    
    const { learningPathId, topicId } = useParams();
    
    const { data: learningPath } = useQuery<LearningPathDto | null>({
        queryKey: ["learningPath", learningPathId],
        queryFn: () => learningPathService.oneLearningPath(learningPathId!),
        enabled: Boolean(learningPathId),
    });

    const { data: topic } = useQuery<TopicDto | null>({
        queryKey: ["topic", topicId],
        queryFn: () => topicService.oneTopic(topicId!),
        enabled: Boolean(topicId),
    });

    const { data: sections = [] } = useQuery<SectionDto[]>({
        queryKey: ["sections", topicId],
        queryFn: () => sectionService.allSections(topicId!),
        enabled: Boolean(topicId),
    });

    if (!topic) return <div className="text-white mx-auto w-full max-w-7xl px-4 pb-4 pt-8 md:pt-10">Topic not found</div>;

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

            {sections.length === 0 ? <div>No sections found</div> : <ul className="flex flex-col gap-3">
                {sections.map((section) => (
                    <li key={section.id}>
                        <SectionCard section={section} />
                    </li>
                ))}
            </ul>}
        </div>
    );
}
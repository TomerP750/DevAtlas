import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ProgressBar } from "../../../../shared/ui/ProgressBar";
import { Button } from "../../../../shared/ui/Button";
import { SectionCard } from "../components/topicPage/SectionCard";
import type { LearningPathDto } from "../models/learningPath/LearningPathDto";
import type { SectionDto } from "../models/section/SectionDto";
import type { TopicDto } from "../models/topic/TopicDto";
import topicService from "../api/topicService";
import sectionService from "../api/sectionService";
import learningPathService from "../api/learningPathService";
import { UpdateTopicModal } from "../components/learningPathPage/UpdateTopicModal";
import { DeleteTopicModal } from "../components/learningPathPage/DeleteTopicModal";
import { CreateSectionModal } from "../components/learningPathPage/CreateSectionModal";

export default function TopicPage() {
    const { learningPathId, topicId } = useParams();
    const navigate = useNavigate();
    const [isUpdateTopicOpen, setIsUpdateTopicOpen] = useState(false);
    const [isDeleteTopicOpen, setIsDeleteTopicOpen] = useState(false);
    const [isCreateSectionOpen, setIsCreateSectionOpen] = useState(false);

    const { data: learningPath } = useQuery<LearningPathDto | null>({
        queryKey: ["learningPath", learningPathId],
        queryFn: () => learningPathService.oneLearningPath(learningPathId!),
        enabled: Boolean(learningPathId),
        staleTime: 5 * 60 * 1000, 
    });

    const { data: topic } = useQuery<TopicDto | null>({
        queryKey: ["topic", topicId],
        queryFn: () => topicService.oneTopic(topicId!),
        enabled: Boolean(topicId),
        staleTime: 5 * 60 * 1000, 
    });

    const { data: sections = [] } = useQuery<SectionDto[]>({
        queryKey: ["sections", topicId],
        queryFn: () => sectionService.allSections(topicId!),
        enabled: Boolean(topicId),
        staleTime: 5 * 60 * 1000, 
    });

    if (!topic) return <div className="text-white mx-auto w-full max-w-7xl px-4 pb-4 pt-8 md:pt-10">Topic not found</div>;

    return (
        <div className="mx-auto w-full max-w-7xl px-4 pb-4 pt-8 md:pt-10">
            <header className="mb-6 border-b border-neutral-300 px-1 pb-4 dark:border-dark-border">
                <Link
                    to={`/dashboard/learning-path/${learningPathId}`}
                    className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-dark-text-muted dark:hover:text-brand-primary-dark"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to topics
                </Link>

                <div className="flex items-end justify-between gap-6">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary dark:text-brand-primary-dark">
                            Learning path
                        </p>
                        <h1 className="mt-1 truncate text-2xl font-bold tracking-tight text-neutral-950 dark:text-dark-text">
                            {learningPath?.name ?? "Learning Path"}
                        </h1>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<Pencil size={16} aria-hidden="true" />}
                            className="border border-neutral-200 bg-white dark:border-dark-border dark:bg-dark-card"
                            onClick={() => setIsUpdateTopicOpen(true)}
                        >
                            <span className="hidden sm:inline">Edit topic</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<Trash2 size={16} aria-hidden="true" />}
                            className="border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/60 dark:bg-dark-card dark:text-red-400 dark:hover:bg-red-950/40"
                            onClick={() => setIsDeleteTopicOpen(true)}
                        >
                            <span className="hidden sm:inline">Delete topic</span>
                        </Button>
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

            <Button
                variant="ghost"
                leftIcon={<Plus size={16} aria-hidden="true" />}
                className="mb-7 w-full shrink-0 rounded-lg border border-dashed border-neutral-300 text-sm text-neutral-600 hover:border-brand-primary hover:bg-violet-50 hover:text-brand-primary dark:border-dark-border dark:text-dark-text-muted dark:hover:border-brand-primary-dark dark:hover:bg-brand-primary-dark/10 dark:hover:text-brand-primary-dark"
                onClick={() => setIsCreateSectionOpen(true)}
            >
                Add Section
            </Button>

            {sections.length === 0 ? <div>No sections found</div> : <ul className="flex flex-col gap-3">
                {sections.map((section) => (
                    <li key={section.id}>
                        <SectionCard section={section} />
                    </li>
                ))}
            </ul>}

            <CreateSectionModal
                isOpen={isCreateSectionOpen}
                onClose={() => setIsCreateSectionOpen(false)}
                topicId={topic.id}
            />
            <UpdateTopicModal
                isOpen={isUpdateTopicOpen}
                onClose={() => setIsUpdateTopicOpen(false)}
                topic={topic}
            />
            <DeleteTopicModal
                isOpen={isDeleteTopicOpen}
                onClose={() => setIsDeleteTopicOpen(false)}
                onDeleted={() => navigate(`/dashboard/learning-path/${learningPathId}`)}
                topicId={topic.id}
                topicName={topic.name}
                learningPathId={topic.learningPathId}
            />
        </div>
    );
}
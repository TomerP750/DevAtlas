import { useParams } from "react-router-dom";
import { LearningPathSummaryCard } from "./LearningPathSummaryCard";
import { TopicCard } from "../topic/TopicCard";
import { useQuery } from "@tanstack/react-query";
import type { TopicDto } from "../../../models/topic/TopicDto";
import type { LearningPathDto } from "../../../models/learningPath/LearningPathDto";
import learningPathService from "../../../api/learningPathService";
import topicService from "../../../api/topicService";
import { Button } from "../../../../../../shared/ui/Button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateTopicModal } from "../topic/CreateTopicModal";
import { UpdateLearningPathModal } from "./UpdateLearningPathModal";
import { DeleteLearningPathModal } from "./DeleteLearningPathModal";

export default function LearningPathPage() {
    const { id } = useParams();
    const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
    const [isUpdateLearningPathOpen, setIsUpdateLearningPathOpen] = useState(false);
    const [isDeleteLearningPathOpen, setIsDeleteLearningPathOpen] = useState(false);

    const { data: learningPath } = useQuery<LearningPathDto>({
        queryKey: ["learningPath", id],
        queryFn: () => learningPathService.oneLearningPath(id!),
        enabled: Boolean(id),
    });

    const { data: topics = [] } = useQuery<TopicDto[]>({
        queryKey: ["topics", id],
        queryFn: () => topicService.allTopics(id!),
        enabled: Boolean(id),
    });

    return (
        <div className="mx-auto h-dvh w-full max-w-7xl overflow-hidden px-6 pt-8 md:pt-10">
            <div className="grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-6 lg:grid-cols-[3fr_2fr] lg:grid-rows-1">
                <div className="flex min-h-0 flex-col gap-3">
                    <Button
                        variant="ghost"
                        leftIcon={<Plus size={16} aria-hidden="true" />}
                        className="mb-4 w-full shrink-0 rounded-lg border border-dashed border-neutral-300 text-sm text-neutral-600 hover:border-brand-primary hover:bg-violet-50 hover:text-brand-primary dark:border-dark-border dark:text-dark-text-muted dark:hover:border-brand-primary-dark dark:hover:bg-brand-primary-dark/10 dark:hover:text-brand-primary-dark"
                        onClick={() => setIsCreateTopicOpen(true)}
                    >
                        Add Topic
                    </Button>

                    <div className="grid min-h-0 flex-1 auto-rows-max content-start grid-cols-1 gap-3 overflow-y-auto pr-2">
                        {topics.length === 0 ? (
                            <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-zinc-300 px-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                                No topics yet. Add the first topic to start building this path.
                            </div>
                        ) : (
                            topics.map((topic) => (
                                <TopicCard
                                    key={topic.id}
                                    topic={topic}
                                />
                            ))
                        )}
                    </div>
                </div>

                {learningPath && (
                    <LearningPathSummaryCard
                        learningPath={learningPath}
                        onEdit={() => setIsUpdateLearningPathOpen(true)}
                        onDelete={() => setIsDeleteLearningPathOpen(true)}
                    />
                )}
            </div>

            {id && (
                <CreateTopicModal
                    isOpen={isCreateTopicOpen}
                    onClose={() => setIsCreateTopicOpen(false)}
                    learningPathId={id}
                />
            )}
            {id && (
                <UpdateLearningPathModal
                    isOpen={isUpdateLearningPathOpen}
                    onClose={() => setIsUpdateLearningPathOpen(false)}
                    learningPathId={id}
                />
            )}
            {id && learningPath && (
                <DeleteLearningPathModal
                    isOpen={isDeleteLearningPathOpen}
                    onClose={() => setIsDeleteLearningPathOpen(false)}
                    learningPathId={id}
                    learningPathName={learningPath.name}
                />
            )}
        </div>
    );
}
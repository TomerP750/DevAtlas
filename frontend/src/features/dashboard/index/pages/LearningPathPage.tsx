import { useParams } from "react-router-dom";
import { LearningPathSummaryCard } from "../components/learningPathPage/LearningPathSummaryCard";
import { TopicRowCard } from "../components/learningPathPage/TopicRowCard";
import { useQuery } from "@tanstack/react-query";
import type { TopicDto } from "../models/topic/TopicDto";
import type { LearningPathDto } from "../models/learningPath/LearningPathDto";
import learningPathService from "../api/learningPathService";
import topicService from "../api/topicService";
import { Button } from "../../../../shared/ui/Button";
import { Plus } from "lucide-react";


export default function LearningPathPage() {
    
    const { id } = useParams();
    
    const { data: learningPath } = useQuery<LearningPathDto>({
        queryKey: ["learningPath", id],
        queryFn: () => learningPathService.oneLearningPath(id!),
    });

    const { data: topics } = useQuery<TopicDto[]>({
        queryKey: ["topics", id],
        queryFn: () => topicService.allTopics(id!),
    });

    return (
        <div className="mx-auto h-dvh w-full max-w-7xl overflow-hidden px-6 pt-8 md:pt-10">
            <div className="grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-6 lg:grid-cols-[3fr_2fr] lg:grid-rows-1">
                <div className="flex min-h-0 flex-col gap-3">
                    <Button
                        variant="ghost"
                        leftIcon={<Plus size={16} aria-hidden="true" />}
                        className="mb-4 w-full shrink-0 rounded-lg border border-dashed border-neutral-300 text-sm text-neutral-600 hover:border-brand-primary hover:bg-violet-50 hover:text-brand-primary dark:border-dark-border dark:text-dark-text-muted dark:hover:border-violet-400 dark:hover:bg-violet-500/10 dark:hover:text-violet-300"
                    >
                        Add Topic
                    </Button>

                    <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto pr-2">
                        {topics?.map((topic) => (
                            <TopicRowCard
                                key={topic.id}
                                topic={topic}
                            />
                        ))}
                    </div>
                </div>

                {learningPath && (
                    <LearningPathSummaryCard learningPath={learningPath} />
                )}
            </div>
        </div>
    );
}
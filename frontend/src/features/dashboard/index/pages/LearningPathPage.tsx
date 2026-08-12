import { useParams } from "react-router-dom";
import { LearningPathSummaryCard } from "../components/learningPathPage/LearningPathSummaryCard";
import { TopicRowCard } from "../components/learningPathPage/TopicRowCard";
import { useQuery } from "@tanstack/react-query";
import type { TopicDto } from "../models/topic/TopicDto";
import type { LearningPathDto } from "../models/learningPath/LearningPathDto";
import learningPathService from "../api/learningPathService";
import topicService from "../api/topicService";


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
        <div className="mx-auto h-dvh w-full max-w-7xl overflow-hidden p-4">
            <div className="grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-6 lg:grid-cols-[3fr_2fr] lg:grid-rows-1">
                <div className="grid min-h-0 grid-cols-1 gap-3 overflow-y-auto pr-2">
                    {topics?.map((topic) => (
                        <TopicRowCard
                            key={topic.id}
                            topic={topic}
                        />
                    ))}
                </div>

                {learningPath && (
                    <LearningPathSummaryCard learningPath={learningPath} />
                )}
            </div>
        </div>
    );
}
import { useParams } from "react-router-dom";
import { dummyData } from "../components/dummies/dummyData";
import { dummyTopics } from "../components/dummies/dummyTopics";
import { LearningPathSummaryCard } from "../components/learningPathPage/LearningPathSummaryCard";
import { TopicRowCard } from "../components/learningPathPage/TopicRowCard";

export function LearningPathPage() {
    const { id } = useParams();
    // const { data: learningPath } = useQuery({
    //     queryKey: ["learningPath", id],
    //     queryFn: () => getLearningPath(id),
    // });

    const topics = dummyTopics.filter((topic) => topic.learningPathId === id);
    const learningPath = dummyData.find((item) => item.id === id);

    return (
        <div className="mx-auto h-dvh w-full max-w-7xl overflow-hidden p-4">
            <div className="grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-6 lg:grid-cols-[3fr_2fr] lg:grid-rows-1">
                <div className="grid min-h-0 grid-cols-1 gap-3 overflow-y-auto pr-2">
                    {topics.map((topic) => (
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
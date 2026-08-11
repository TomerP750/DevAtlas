import { useParams } from "react-router-dom";
import { dummyTopics } from "../components/dummies/dummyTopics";
import { TopicRowCard } from "../components/TopicRowCard";

export function LearningPathPage() {
    const { id } = useParams();
    // const { data: learningPath } = useQuery({
    //     queryKey: ["learningPath", id],
    //     queryFn: () => getLearningPath(id),
    // });

    const topics = dummyTopics.filter((topic) => topic.learningPathId === id);

    return (
        <div className="mx-auto w-full max-w-7xl p-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
                <div className="grid grid-cols-1 gap-3">
                    {topics.map((topic) => (
                        <TopicRowCard
                            key={topic.id}
                            topic={topic}
                        />
                    ))}
                </div>

                <div />
            </div>
        </div>
    );
}
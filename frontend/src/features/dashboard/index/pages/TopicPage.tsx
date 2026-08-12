import { useParams } from "react-router-dom";
import { SectionCard } from "../components/topicPage/SectionCard";
import { dummySections } from "../components/dummies/dummySections";

export function TopicPage() {
    const { id } = useParams();
    const sections = dummySections.filter((section) => section.topicId === id);

    return (
        <div className="mx-auto w-full max-w-7xl p-4">
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
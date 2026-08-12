import { BookOpen } from "lucide-react";
import { useParams } from "react-router-dom";
import { SectionCard } from "../components/topicPage/SectionCard";
import { dummyData } from "../components/dummies/dummyData";
import { dummySections } from "../components/dummies/dummySections";

export default function TopicPage() {
    const { learningPathId, topicId } = useParams();
    const learningPath = dummyData.find((item) => item.id === learningPathId);
    const sections = dummySections.filter((section) => section.topicId === topicId);

    return (
        <div className="mx-auto w-full max-w-7xl p-4">
            <header className="relative mb-5 flex items-center gap-4 overflow-hidden rounded-r-lg rounded-l-none border border-neutral-200 bg-white px-5 py-4 shadow-sm dark:border-dark-border dark:bg-dark-card dark:shadow-black/20">
                <span
                    className="absolute inset-y-0 left-0 w-1 bg-brand-primary"
                    aria-hidden="true"
                />
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-brand-primary dark:bg-violet-500/10 dark:text-violet-300">
                    <BookOpen size={22} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-dark-text-muted">
                        Learning path
                    </p>
                    <h1 className="mt-0.5 truncate text-xl font-bold tracking-tight text-neutral-950 dark:text-dark-text">
                        {learningPath?.title ?? "Learning Path"}
                    </h1>
                </div>
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
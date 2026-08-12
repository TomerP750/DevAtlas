import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    ArrowLeft,
    CheckCircle2,
    Circle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../../../shared/ui/Button";
import sectionService from "../api/sectionService";
import { SectionAside } from "../components/sectionPage/SectionAside";
import { SectionContent } from "../components/sectionPage/SectionContent";
import type { SectionDto } from "../models/section/SectionDto";

export default function SectionPage() {
    
    const { learningPathId, topicId, sectionId } = useParams();
    const queryClient = useQueryClient();

    const { data: section, isLoading, isError } = useQuery<SectionDto>({
        queryKey: ["section", sectionId],
        queryFn: () => sectionService.oneSection(sectionId!),
        enabled: Boolean(sectionId),
        staleTime: 5 * 60 * 1000,
    });

    const { mutate: toggleCompletion, isPending } = useMutation({
        mutationFn: () => sectionService.toggleCompletion(sectionId!),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["section", sectionId] }),
                queryClient.invalidateQueries({ queryKey: ["sections", topicId] }),
                queryClient.invalidateQueries({ queryKey: ["topic", topicId] }),
            ]);
            console.log("Section completed toggled");
            console.log(section);
        },
    });

    if (isLoading) {
        return (
            <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-8 md:pt-10">
                <div className="animate-pulse space-y-6">
                    <div className="h-5 w-32 rounded bg-neutral-200 dark:bg-white/10" />
                    <div className="h-24 rounded-xl bg-neutral-200 dark:bg-white/10" />
                    <div className="h-72 rounded-xl bg-neutral-200 dark:bg-white/10" />
                </div>
            </div>
        );
    }

    if (isError || !section) {
        return (
            <div className="mx-auto flex w-full max-w-7xl flex-col items-start px-4 pb-8 pt-8 md:pt-10">
                <Link
                    to={`/dashboard/learning-path/${learningPathId}/topic/${topicId}`}
                    className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-brand-primary dark:text-dark-text-muted dark:hover:text-violet-300"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to sections
                </Link>
                <div className="w-full rounded-xl border border-dashed border-neutral-300 px-6 py-16 text-center dark:border-dark-border">
                    <h1 className="font-semibold text-neutral-950 dark:text-dark-text">Section not found</h1>
                    <p className="mt-2 text-sm text-neutral-500 dark:text-dark-text-muted">
                        This section may have been removed or is no longer available.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-8 md:pt-10">
            <header className="mb-7 border-b border-neutral-300 px-1 pb-5 dark:border-dark-border">
                <Link
                    to={`/dashboard/learning-path/${learningPathId}/topic/${topicId}`}
                    className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-dark-text-muted dark:hover:text-violet-300"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to sections
                </Link>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary dark:text-violet-300">
                            Section
                        </p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-950 dark:text-dark-text sm:text-3xl">
                            {section.name}
                        </h1>
                    </div>
                    <Button
                        variant={section.completed ? "secondary" : "primary"}
                        size="sm"
                        leftIcon={
                            section.completed
                                ? <CheckCircle2 size={17} className="text-emerald-500" aria-hidden="true" />
                                : <Circle size={17} aria-hidden="true" />
                        }
                        loading={isPending}
                        onClick={() => toggleCompletion()}
                        aria-pressed={section.completed}
                        className={`shrink-0 ${section.completed
                            ? "border-emerald-300! bg-white! text-neutral-700! shadow-sm hover:border-emerald-400! hover:bg-neutral-50! dark:border-emerald-500/40! dark:bg-dark-card! dark:text-dark-text! dark:hover:bg-dark-card-hover!"
                            : ""
                        }`}
                    >
                        {section.completed ? "Completed" : "Mark as complete"}
                    </Button>
                </div>
            </header>

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                <SectionContent section={section} />
                <SectionAside section={section} />
            </div>
        </main>
    );
}
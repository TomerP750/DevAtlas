import { CheckCircle2, Circle, Gauge } from "lucide-react";
import type { SectionDto } from "../../models/section/SectionDto";
import { ConfidenceLevel } from "../../models/shared/ConfidenceLevel";

interface SectionAsideProps {
    section: SectionDto;
}

const confidenceStyles: Record<ConfidenceLevel, string> = {
    [ConfidenceLevel.LOW]: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300",
    [ConfidenceLevel.MEDIUM]: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300",
    [ConfidenceLevel.HIGH]: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300",
};

const confidenceLineStyles: Record<ConfidenceLevel, string> = {
    [ConfidenceLevel.LOW]: "bg-red-500",
    [ConfidenceLevel.MEDIUM]: "bg-amber-400",
    [ConfidenceLevel.HIGH]: "bg-emerald-500",
};

export function SectionAside({ section }: SectionAsideProps) {
    return (
        <aside className="space-y-4 lg:sticky lg:top-6">
            <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-dark-border dark:bg-dark-card dark:shadow-black/20">
                <h2 className="text-sm font-semibold text-neutral-950 dark:text-dark-text">Learning status</h2>

                <div className="mt-5 space-y-5">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-white/80">
                            <Gauge size={15} aria-hidden="true" />
                            Confidence
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`h-6 w-1 rounded-full ${confidenceLineStyles[section.confidenceLevel]}`}
                                aria-hidden="true"
                            />
                            <span className={`text-xs font-semibold dark:text-white`}>
                                {section.confidenceLevel}
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-neutral-200 pt-4 dark:border-dark-border">
                        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-white/80">
                            Progress
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-dark-text">
                            {section.completed ? (
                                <>
                                    <CheckCircle2 size={18} className="text-emerald-500" aria-hidden="true" />
                                    Complete
                                </>
                            ) : (
                                <>
                                    <Circle size={18} className="text-neutral-400" aria-hidden="true" />
                                    In progress
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="rounded-xl border border-violet-100 bg-violet-50/70 p-5 dark:border-violet-500/20 dark:bg-violet-500/10">
                <p className="text-sm font-semibold text-violet-950 dark:text-violet-200">Ready to move on?</p>
                <p className="mt-1.5 text-sm leading-5 text-violet-700/80 dark:text-violet-300/70">
                    Mark this section complete when you feel comfortable with the material.
                </p>
            </div>
        </aside>
    );
}

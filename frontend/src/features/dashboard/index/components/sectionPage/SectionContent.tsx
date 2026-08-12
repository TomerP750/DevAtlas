import { BookOpen, Check, Code2, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../../shared/ui/Button";
import type { SectionDto } from "../../models/section/SectionDto";

interface SectionContentProps {
    section: SectionDto;
}

export function SectionContent({ section }: SectionContentProps) {
    const [copied, setCopied] = useState(false);

    const copyCode = async () => {
        if (!section.codeSnippet) return;

        await navigator.clipboard.writeText(section.codeSnippet);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    };

    return (
        <div className="min-w-0 space-y-6">
            <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-dark-border dark:bg-dark-card dark:shadow-black/20">
                <div className="flex items-center gap-2 border-b border-neutral-200 px-5 py-4 dark:border-dark-border">
                    <BookOpen size={18} className="text-brand-primary dark:text-violet-300" aria-hidden="true" />
                    <h2 className="font-semibold text-neutral-950 dark:text-dark-text">Overview</h2>
                </div>
                <div className="px-5 py-6 sm:px-7">
                    <p className="whitespace-pre-line text-[15px] leading-7 text-neutral-600 dark:text-dark-text-muted">
                        {section.description}
                    </p>
                </div>
            </section>

            {section.codeSnippet && (
                <section className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-950 shadow-sm dark:border-dark-border dark:bg-black/30 dark:shadow-black/20">
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                        <div className="flex items-center gap-2">
                            <Code2 size={17} className="text-violet-300" aria-hidden="true" />
                            <h2 className="text-sm font-semibold text-neutral-100">Code example</h2>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyCode}
                            leftIcon={copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                            className="text-neutral-300 hover:bg-white/10 hover:text-white dark:text-neutral-300 dark:hover:bg-white/10"
                            aria-label="Copy code example"
                        >
                            {copied ? "Copied" : "Copy"}
                        </Button>
                    </div>
                    <pre className="overflow-x-auto p-5 text-sm leading-6 text-neutral-200 sm:p-6">
                        <code>{section.codeSnippet}</code>
                    </pre>
                </section>
            )}
        </div>
    );
}

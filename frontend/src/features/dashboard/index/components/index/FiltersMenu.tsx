import { ChevronDown, RotateCcw } from "lucide-react";
import { Category } from "../../models/learningPath/enums/Category";
import { Difficulty } from "../../models/learningPath/enums/Difficulty";

interface FiltersMenuProps {
    isOpen: boolean;
}

const categoryOptions = Object.values(Category);
const difficultyOptions = Object.values(Difficulty);
const formatCategory = (category: Category) =>
    category
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

export function FiltersMenu({ isOpen }: FiltersMenuProps) {
    if (!isOpen) return null;

    return (
        <aside
            aria-label="Filter learning paths"
            className="absolute right-0 top-12 z-30 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40"
        >
            <form>
                <header className="flex items-start justify-between border-b border-zinc-200 px-5 py-4 dark:border-white/10">
                    <div>
                        <h2 className="font-semibold text-zinc-950 dark:text-white">
                            Filter paths
                        </h2>
                        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                            Refine your learning workspace
                        </p>
                    </div>
                </header>

                <div className="space-y-6 p-5">
                    <label className="block">
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Category
                        </span>
                        <span className="relative block">
                            <select
                                defaultValue=""
                                className="h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 pr-9 text-sm text-zinc-800 outline-none transition hover:border-zinc-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-600"
                            >
                                <option value="">All categories</option>
                                {categoryOptions.map((category) => (
                                    <option key={category} value={category}>
                                        {formatCategory(category)}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                aria-hidden="true"
                                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                            />
                        </span>
                    </label>

                    <fieldset>
                        <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Difficulty
                        </legend>
                        <div className="grid grid-cols-3 gap-2">
                            {difficultyOptions.map((difficulty) => (
                                <button
                                    key={difficulty}
                                    type="button"
                                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-2 text-xs font-medium text-zinc-600 transition hover:border-brand-primary hover:text-brand-primary dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-violet-400 dark:hover:text-violet-400"
                                >
                                    {difficulty}
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    <label className="block">
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Sort by
                        </span>
                        <span className="relative block">
                            <select
                                defaultValue="newest"
                                className="h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 pr-9 text-sm text-zinc-800 outline-none transition hover:border-zinc-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-600"
                            >
                                <option value="newest">Newest - Oldest</option>
                                <option value="oldest">Oldest - Newest</option>
                                <option value="title">Title: A to Z</option>
                                <option value="title">Title: Z to A</option>
                            </select>
                            <ChevronDown
                                aria-hidden="true"
                                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                            />
                        </span>
                    </label>
                </div>

                <footer className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50/70 px-5 py-3 dark:border-white/10 dark:bg-white/[0.025]">
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                    >
                        <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                        Reset
                    </button>
                    <button
                        type="button"
                        className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                    >
                        Apply filters
                    </button>
                </footer>
            </form>
        </aside>
    );
}

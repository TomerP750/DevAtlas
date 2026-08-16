import { ChevronDown, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { Category } from "../../models/learningPath/Category";
import { Difficulty } from "../../models/learningPath/Difficulty";
import { useSearchParams } from "react-router-dom";

interface FiltersMenuProps {
    isOpen: boolean;
    onApply: () => void;
}

type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

interface FilterFormValues {
    category: Category | "";
    difficulty?: Difficulty;
    sortOption: SortOption;
}

const categoryOptions = Object.values(Category);
const difficultyOptions = Object.values(Difficulty);
const formatCategory = (category: Category) =>
    category
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

export function FiltersMenu({ isOpen, onApply }: FiltersMenuProps) {

    const { register, handleSubmit, reset, setValue, watch } = useForm<FilterFormValues>({
        defaultValues: {
            category: "",
            difficulty: undefined,
            sortOption: "newest",
        },
    });
    const selectedDifficulty = watch("difficulty");

    const [searchParams, setSearchParams] = useSearchParams();

    const applyFilters = ({ category, difficulty, sortOption }: FilterFormValues) => {
        category ? searchParams.set("category", category) : searchParams.delete("category");
        difficulty ? searchParams.set("difficulty", difficulty) : searchParams.delete("difficulty");
        sortOption ? searchParams.set("sortOption", sortOption) : searchParams.delete("sortOption");

        setSearchParams(searchParams);
        onApply();
    };

    const resetFilters = () => {
        searchParams.delete("category");
        searchParams.delete("difficulty");
        searchParams.delete("sortOption");
        setSearchParams(searchParams);
        reset();
        onApply();
    };

    if (!isOpen) return null;

    return (
        <aside
            aria-label="Filter learning paths"
            className="absolute right-0 top-12 z-30 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40"
        >
            <form onSubmit={handleSubmit(applyFilters)}>
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
                                {...register("category")}
                                className="h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 pr-9 text-sm text-zinc-800 outline-none transition hover:border-zinc-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-600 dark:focus:border-brand-primary-dark dark:focus:ring-brand-primary-dark/15"
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
                                    aria-pressed={selectedDifficulty === difficulty}
                                    onClick={() => setValue(
                                        "difficulty",
                                        selectedDifficulty === difficulty ? undefined : difficulty,
                                        { shouldDirty: true },
                                    )}
                                    className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${selectedDifficulty === difficulty
                                            ? "border-brand-primary bg-brand-primary/10 text-brand-primary dark:border-brand-primary-dark dark:bg-brand-primary-dark/10 dark:text-brand-primary-dark"
                                            : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-brand-primary hover:text-brand-primary dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-brand-primary-dark dark:hover:text-brand-primary-dark"
                                        }`}
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
                                {...register("sortOption")}
                                className="h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 pr-9 text-sm text-zinc-800 outline-none transition hover:border-zinc-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-600 dark:focus:border-brand-primary-dark dark:focus:ring-brand-primary-dark/15"
                            >
                                <option value="newest">Newest - Oldest</option>
                                <option value="oldest">Oldest - Newest</option>
                                <option value="title-asc">Title: A to Z</option>
                                <option value="title-desc">Title: Z to A</option>
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
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                    >
                        <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:bg-brand-primary-dark dark:text-cyan-950 dark:hover:bg-brand-primary-dark-hover dark:focus:ring-brand-primary-dark/40"
                    >
                        Apply filters
                    </button>
                </footer>
            </form>
        </aside>
    );
}

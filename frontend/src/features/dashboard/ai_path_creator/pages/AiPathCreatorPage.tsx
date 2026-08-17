import { ArrowRight, Check } from "lucide-react";
import { Button } from "../../../../shared/ui/Button";
import { Input } from "../../../../shared/ui/Input";
import { Select } from "../../../../shared/ui/Select";
import { Category } from "../../index/models/learningPath/Category";
import { Difficulty } from "../../index/models/learningPath/Difficulty";
import type { CreateAIGeneratedLearningPathDto } from "../models/CreateAIGeneratedLearningPathDto";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoadingPage } from "../../../../shared/ui/LoadingPage";
import { toast } from "react-toastify";

function formatEnumLabel(value: string) {
    return value
        .split("_")
        .map((word) => word === "AI"
            ? word
            : word.charAt(0) + word.slice(1).toLowerCase())
        .join(" ");
}

const categoryOptions = Object.values(Category).map((category) => ({
    value: category,
    label: formatEnumLabel(category),
}));

const difficultyDescriptions: Record<Difficulty, string> = {
    [Difficulty.BEGINNER]: "Start with the foundations",
    [Difficulty.INTERMEDIATE]: "Build on existing knowledge",
    [Difficulty.ADVANCED]: "Go deep into complex topics",
};

const levels = Object.values(Difficulty).map((difficulty) => ({
    value: difficulty,
    label: difficulty,
    description: difficultyDescriptions[difficulty],
}));

export default function AiPathCreatorPage() {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, watch } = useForm<CreateAIGeneratedLearningPathDto>({
        defaultValues: {
            difficulty: Difficulty.BEGINNER,
        },
    });
    const selectedDifficulty = watch("difficulty");

    function handleCreateAIGeneratedLearningPath(dto: CreateAIGeneratedLearningPathDto) {
        setIsLoading(true);
        const timeout = setTimeout(() => {
            setIsLoading(false);
            toast.success(`${dto.learningGoal} generated successfully`);
        }, 3000);
        return () => clearTimeout(timeout);
    }

    return (
        <section className="min-h-screen overflow-x-hidden bg-light-background text-light-text md:h-screen md:min-h-0 md:overflow-y-hidden dark:bg-dark-background dark:text-dark-text">

            <div className="relative isolate min-h-full px-4 py-6 sm:px-6 md:h-full md:py-5 lg:px-8 lg:py-6">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-40"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(124,58,237,.16) 1px, transparent 0)",
                        backgroundSize: "26px 26px",
                        maskImage: "linear-gradient(to bottom, black, transparent 85%)",
                    }}
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-40 top-0 -z-10 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10"
                />

                <div className="mx-auto max-w-5xl">
                    <div className="mb-5 max-w-2xl">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary dark:text-brand-primary-dark">
                            Plan your learning
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
                            Build a path you can follow
                        </h2>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            Tell us what you want to learn. We will organize it into topics and sections
                            so you can complete each step and track your progress.
                        </p>
                    </div>

                    <div>
                        <form
                            onSubmit={handleSubmit(handleCreateAIGeneratedLearningPath)}
                            className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 p-5 shadow-[0_20px_70px_-35px_rgba(24,24,27,0.45)] backdrop-blur sm:p-6 dark:border-zinc-800 dark:bg-zinc-950/90 dark:shadow-black/40"
                        >
                            <div
                                aria-hidden="true"
                                className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-violet-500/70 to-transparent dark:via-cyan-400/70"
                            />
                            <div className="grid gap-5 sm:grid-cols-[minmax(0,1.5fr)_minmax(220px,1fr)]">
                                <div className="sm:col-span-2">
                                    <Input
                                        label="Path name"
                                        placeholder="e.g. Production-ready React"
                                        helperText="Give your learning path a clear, recognizable title."
                                        required
                                        className="h-11 rounded-xl!"
                                        {...register("learningGoal")}
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <Select
                                        label="Category"
                                        placeholder="Choose a category"
                                        options={categoryOptions}
                                        required
                                        className="h-11 rounded-xl!"
                                        {...register("category")}
                                    />
                                </div>

                                <fieldset className="sm:col-span-2">
                                    <legend className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Starting level
                                    </legend>
                                    <div className="grid gap-3 sm:grid-cols-3">
                                        {levels.map((item) => {
                                            const isSelected = selectedDifficulty === item.value;

                                            return (
                                                <label
                                                    key={item.value}
                                                    className={`relative cursor-pointer rounded-xl border p-4 transition-all ${isSelected
                                                        ? "border-brand-primary bg-linear-to-br from-violet-50 to-cyan-50/60 ring-1 ring-brand-primary/20 hover:from-violet-50 hover:to-cyan-50/60 dark:border-brand-primary-dark dark:from-cyan-950/60 dark:to-violet-950/40 dark:ring-brand-primary-dark/20 dark:hover:from-cyan-950/70 dark:hover:to-violet-950/50"
                                                        : "border-zinc-200 bg-zinc-50/70 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        value={item.value}
                                                        className="sr-only"
                                                        {...register("difficulty")}
                                                    />
                                                    <span className="flex items-center justify-between gap-2">
                                                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                            {item.label}
                                                        </span>
                                                        {isSelected && (
                                                            <span className="grid h-5 w-5 place-items-center rounded-full bg-linear-to-br from-violet-600 to-cyan-500 text-white shadow-sm dark:from-cyan-300 dark:to-violet-400 dark:text-zinc-950">
                                                                <Check className="h-3 w-3" strokeWidth={3} />
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span className="mt-1.5 block text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                                                        {item.description}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </fieldset>

                            </div>

                            <div className="mt-5 flex flex-col-reverse gap-3 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
                                <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                                    You can edit the generated topics and sections afterward.
                                </p>
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isLoading}
                                    rightIcon={<ArrowRight className="h-4 w-4" />}
                                    className="w-full rounded-xl! bg-linear-to-r! from-violet-600! via-purple-600! to-cyan-500! text-white! shadow-lg shadow-violet-500/20 hover:from-violet-700! hover:via-purple-700! hover:to-cyan-600! sm:w-auto dark:from-cyan-400! dark:via-cyan-400! dark:to-violet-400! dark:text-zinc-950! dark:shadow-cyan-500/15 dark:hover:from-cyan-300! dark:hover:via-cyan-300! dark:hover:to-violet-300!"
                                >
                                    Generate learning path
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {isLoading && <LoadingPage
                message="Generating learning path..."
                className="absolute inset-0 bg-black/50!" />
            }
        </section>
    );
}
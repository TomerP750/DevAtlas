import { WandSparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../shared/ui/Button";
import { Input } from "../../../../shared/ui/Input";
import type { CreateAIGeneratedLearningPathDto } from "../models/CreateAIGeneratedLearningPathDto";
import { Difficulty } from "../../index/models/learningPath/Difficulty";
import { Select } from "../../../../shared/ui/Select";

const levelOptions = Object.values(Difficulty).map((level) => ({
    value: level,
    label: level,
}));

export default function AiPathCreatorPage() {

    const { register, handleSubmit, formState: { errors } } = useForm<CreateAIGeneratedLearningPathDto>();

    function handleCreateAIGeneratedLearningPath(dto: CreateAIGeneratedLearningPathDto) {
        toast.success(dto.learningGoal);
    }

    return (
        <section className="min-h-screen overflow-hidden bg-[#f8f7ff] text-light-text md:h-screen md:min-h-0 dark:bg-[#07070a] dark:text-dark-text">

            <div className="relative isolate min-h-full px-4 py-6 sm:px-6 md:flex md:h-full md:items-center md:py-5 lg:px-8 lg:py-6">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-br from-violet-100/80 via-[#f8f7ff] to-cyan-100/70 dark:from-violet-950/25 dark:via-[#07070a] dark:to-cyan-950/25"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-600/15"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-40 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-500/15"
                />

                <div className="mx-auto w-full max-w-3xl">
                    <div className="mx-auto mb-7 max-w-2xl text-center">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary dark:text-brand-primary-dark">
                            Plan your learning
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
                            Build a path you can follow
                        </h2>
                        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            Tell us what you want to learn. We will organize it into topics and sections
                            so you can complete each step and track your progress.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(handleCreateAIGeneratedLearningPath)}
                        className="mx-auto flex w-full max-w-xl flex-col gap-3"
                    >
                        <Input
                            label="Learning goal"
                            placeholder="e.g. Learn AWS basics"
                            error={errors.learningGoal?.message}
                            required
                            className="h-14 border-zinc-300/80! bg-white/80! px-5! text-base! shadow-[0_12px_40px_-20px_rgba(76,29,149,0.45)] backdrop-blur dark:border-white/10! dark:bg-zinc-900/80!"
                            {...register("learningGoal", {
                                required: {
                                    value: true,
                                    message: "Learning goal is required",
                                    
                                },
                            })}
                        />

                        <Select
                            label="Level"
                            placeholder="Choose a level"
                            options={levelOptions}
                            error={errors.level?.message}
                            required
                            className="h-14 border-zinc-300/80! bg-white/80! px-5! text-base! shadow-[0_12px_40px_-20px_rgba(76,29,149,0.45)] backdrop-blur dark:border-white/10! dark:bg-zinc-900/80!"
                            {...register("level", {
                                required: {
                                    value: true,
                                    message: "Level is required",
                                },
                            })}
                        />

                        <Button
                            type="submit"
                            size="lg"
                            rightIcon={<WandSparkles className="h-4 w-4" />}
                            className="self-center w-fit! rounded-full! bg-linear-to-r! from-violet-600! via-purple-600! to-cyan-500! text-white! shadow-lg shadow-violet-500/25 hover:from-violet-700! hover:via-purple-700! hover:to-cyan-600! dark:from-cyan-400! dark:via-cyan-400! dark:to-violet-400! dark:text-zinc-950! dark:shadow-cyan-500/15 dark:hover:from-cyan-300! dark:hover:via-cyan-300! dark:hover:to-violet-300!"
                        >
                            Generate
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
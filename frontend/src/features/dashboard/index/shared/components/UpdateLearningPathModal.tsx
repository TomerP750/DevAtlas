import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../../shared/ui/Button";
import { Input } from "../../../../../shared/ui/Input";
import { Modal } from "../../../../../shared/ui/Modal";
import { Select } from "../../../../../shared/ui/Select";
import { TextArea } from "../../../../../shared/ui/TextArea";
import learningPathService from "../../api/learningPathService";
import { Category } from "../../models/learningPath/Category";
import { Difficulty } from "../../models/learningPath/Difficulty";
import type { UpdateLearningPathDto } from "../../models/learningPath/UpdateLearningPathDto";

interface UpdateLearningPathModalProps {
    isOpen: boolean;
    onClose: () => void;
    learningPathId: string;
}

const difficultyOptions = Object.values(Difficulty).map((difficulty) => ({
    value: difficulty,
    label: difficulty,
}));

const categoryOptions = Object.values(Category).map((category) => ({
    value: category,
    label: category.replaceAll("_", " "),
}));

export function UpdateLearningPathModal({
    isOpen,
    onClose,
    learningPathId,
}: UpdateLearningPathModalProps) {
    
    const queryClient = useQueryClient();
    const { data: learningPath, isLoading } = useQuery({
        queryKey: ["learningPath", learningPathId],
        queryFn: () => learningPathService.findOne(learningPathId),
        enabled: isOpen && Boolean(learningPathId),
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateLearningPathDto>();

    useEffect(() => {
        if (learningPath && isOpen) {
            reset({
                name: learningPath.name,
                description: learningPath.description,
                difficulty: learningPath.difficulty,
                category: learningPath.category,
                avatarUrl: learningPath.avatarUrl,
            });
        }
    }, [isOpen, learningPath, reset]);

    const { mutate: updateLearningPath, isPending } = useMutation({
        mutationFn: (data: UpdateLearningPathDto) =>
            learningPathService.update(learningPathId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["learningPath", learningPathId] });
            queryClient.invalidateQueries({ queryKey: ["learningPaths"] });
            onClose();
            toast.success("Learning path updated successfully");
        },
        onError: () => toast.error("Failed to update learning path"),
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit learning path"
            description="Update how this path appears in your dashboard."
            closeOnBackdropClick={!isPending}
        >
            {isLoading ? (
                <div className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    Loading learning path…
                </div>
            ) : (
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit((data) => updateLearningPath(data))}
                >
                    <Input
                        label="Title"
                        required
                        autoFocus
                        disabled={isPending}
                        error={errors.name?.message}
                        {...register("name", {
                            required: "Title is required",
                            minLength: { value: 3, message: "Use at least 3 characters" },
                            maxLength: { value: 60, message: "Use no more than 60 characters" },
                        })}
                    />

                    <TextArea
                        label="Description"
                        rows={4}
                        required
                        disabled={isPending}
                        error={errors.description?.message}
                        {...register("description", {
                            required: "Description is required",
                            maxLength: { value: 400, message: "Use no more than 400 characters" },
                        })}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Select
                            label="Difficulty"
                            options={difficultyOptions}
                            required
                            disabled={isPending}
                            error={errors.difficulty?.message}
                            {...register("difficulty", { required: "Difficulty is required" })}
                        />
                        <Select
                            label="Category"
                            options={categoryOptions}
                            required
                            disabled={isPending}
                            error={errors.category?.message}
                            {...register("category", { required: "Category is required" })}
                        />
                    </div>

                    <Input
                        label="Cover image URL"
                        type="url"
                        disabled={isPending}
                        error={errors.avatarUrl?.message}
                        {...register("avatarUrl")}
                    />

                    <div className="mt-2 flex flex-col-reverse gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800 sm:flex-row sm:justify-end">
                        <Button type="button" variant="ghost" onClick={onClose} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" loading={isPending}>
                            Save changes
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
}

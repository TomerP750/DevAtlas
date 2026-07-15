import { useForm } from "react-hook-form";
import { Input } from "../../../../../shared/ui/Input";
import { Modal } from "../../../../../shared/ui/Modal";
import { Select } from "../../../../../shared/ui/Select";
import { TextArea } from "../../../../../shared/ui/TextArea";
import { Category } from "../../models/learningPath/enums/Category";
import { Difficulty } from "../../models/learningPath/enums/Difficulty";
import type { UpdateLearningPathDto } from "../../models/crud_requests/UpdateLearningPathDto";
import learningPathService from "../../api/learningPathService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "../../../../../shared/ui/Button";


interface EditModalProps {
    learningPathId: string;
    learningPathTitle: string;
    isOpen: boolean;
    onClose: () => void;
}

export function EditModal({ learningPathId, learningPathTitle, isOpen, onClose }: EditModalProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateLearningPathDto>();

    const { mutate: updateLearningPath, isPending } = useMutation({
        mutationFn: (data: UpdateLearningPathDto) => learningPathService.updateLearningPath(learningPathId, data),
        onSuccess: () => {
            onClose();
            toast.success("Learning path updated successfully");
        },
        onError: (error) => {
            toast.error("Failed to update learning path");
        },
    });

    const handleUpdateLearningPath = (data: UpdateLearningPathDto) => {
        updateLearningPath(data);
    }

    const difficultyOptions = Object.values(Difficulty).map((difficulty) => ({
        value: difficulty,
        label: difficulty,
    }));

    const categoryOptions = Object.values(Category).map((category) => ({
        value: category,
        label: category.replace(/_/g, " "),
    }));

    return (
        <Modal title={`Editing ${learningPathTitle}`} isOpen={isOpen} onClose={onClose}>
            <form className="flex flex-col gap-4"
                onSubmit={handleSubmit(handleUpdateLearningPath)}>
                <Input
                    label="Title"
                    required
                    error={errors.title?.message}
                    {...register("title", {
                        required: "Title is required",
                        minLength: { value: 3, message: "Title must be at least 3 characters long" },
                        maxLength: { value: 40, message: "Title must be less than 40 characters long" },
                    })}
                />
                <Select
                    label="Difficulty"
                    required
                    placeholder="Select Difficulty"
                    options={difficultyOptions}
                    error={errors.difficulty?.message}
                    {...register("difficulty", {
                        required: "Difficulty is required",
                    })}
                />
                <Select
                    label="Category"
                    required
                    placeholder="Select Category"
                    options={categoryOptions}
                    error={errors.category?.message}
                    {...register("category", {
                        required: "Category is required",
                    })}
                />
                <TextArea
                    rows={4}
                    label="Description"
                    error={errors.description?.message}
                    {...register("description")}
                />

                <div className="flex justify-end">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        loading={isPending}
                        variant="primary"
                        disabled={isPending}>
                        Update
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
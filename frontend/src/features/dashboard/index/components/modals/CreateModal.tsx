import { Modal } from "../../../../../shared/ui/Modal";
import { Input } from "../../../../../shared/ui/Input";
import { Button } from "../../../../../shared/ui/Button";
import { Select } from "../../../../../shared/ui/Select";
import { useForm } from "react-hook-form";
import { type CreateLearningPathDto } from "../../models/CreateLearningPathDto";
import { Difficulty } from "../../models/Difficulty";
import { TextArea } from "../../../../../shared/ui/TextArea";
import { Category } from "../../models/Category";

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const difficultyOptions = Object.values(Difficulty).map((difficulty) => ({
    value: difficulty,
    label: difficulty,
}));

const categoryOptions = Object.values(Category).map((category) => ({
    value: category,
    label: category.replace(/_/g, " "),
}));

export function CreateModal({ isOpen, onClose }: CreateModalProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<CreateLearningPathDto>();

    const onSubmit = (data: CreateLearningPathDto) => {
        console.log(data);
    }

    return (
        <Modal title={"Create a new learning path"} isOpen={isOpen} onClose={onClose}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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

                <div className="flex justify-end gap-2">
                    <Button type="submit">Create</Button>
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                </div>
            </form>
        </Modal>
    )
}
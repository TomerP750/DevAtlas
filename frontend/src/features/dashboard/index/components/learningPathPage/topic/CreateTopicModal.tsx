import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../../../shared/ui/Button";
import { Input } from "../../../../../../shared/ui/Input";
import { Modal } from "../../../../../../shared/ui/Modal";
import { Select } from "../../../../../../shared/ui/Select";
import { TextArea } from "../../../../../../shared/ui/TextArea";
import topicService from "../../../api/topicService";
import type { CreateTopicDto } from "../../../models/topic/CreateTopicDto";
import { ConfidenceLevel } from "../../../models/shared/ConfidenceLevel";

interface CreateTopicModalProps {
    isOpen: boolean;
    onClose: () => void;
    learningPathId: string;
}

const confidenceOptions = Object.values(ConfidenceLevel).map((level) => ({
    value: level,
    label: level,
}));

export function CreateTopicModal({
    isOpen,
    onClose,
    learningPathId,
}: CreateTopicModalProps) {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateTopicDto>({
        defaultValues: {
            confidenceLevel: ConfidenceLevel.MEDIUM,
        },
    });

    const { mutate: createTopic, isPending } = useMutation({
        mutationFn: (data: CreateTopicDto) => topicService.createTopic(learningPathId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["topics", learningPathId] });
            queryClient.invalidateQueries({ queryKey: ["learningPath", learningPathId] });
            reset();
            onClose();
            toast.success("Topic created successfully");
        },
        onError: () => toast.error("Failed to create topic"),
    });

    const handleClose = () => {
        if (isPending) return;
        reset();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Add a topic"
            description="Create the next step in this learning path."
            closeOnBackdropClick={!isPending}
        >
            <form className="flex flex-col gap-4" onSubmit={handleSubmit((data) => createTopic(data))}>
                <Input
                    label="Topic name"
                    placeholder="e.g. React fundamentals"
                    autoFocus
                    required
                    disabled={isPending}
                    error={errors.name?.message}
                    {...register("name", {
                        required: "Topic name is required",
                        minLength: { value: 3, message: "Use at least 3 characters" },
                        maxLength: { value: 60, message: "Use no more than 60 characters" },
                    })}
                />

                <TextArea
                    label="Description"
                    placeholder="What will you learn in this topic?"
                    rows={4}
                    required
                    disabled={isPending}
                    error={errors.description?.message}
                    {...register("description", {
                        required: "Description is required",
                        maxLength: { value: 300, message: "Use no more than 300 characters" },
                    })}
                />

                <div>
                    <Select
                        label="Confidence"
                        options={confidenceOptions}
                        required
                        disabled={isPending}
                        error={errors.confidenceLevel?.message}
                        {...register("confidenceLevel", {
                            required: "Confidence level is required",
                        })}
                    />
                </div>

                <div className="mt-2 flex flex-col-reverse gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800 sm:flex-row sm:justify-end">
                    <Button type="button" variant="ghost" onClick={handleClose} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" loading={isPending}>
                        Create topic
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

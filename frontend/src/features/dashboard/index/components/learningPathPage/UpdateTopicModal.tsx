import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../../shared/ui/Button";
import { Input } from "../../../../../shared/ui/Input";
import { Modal } from "../../../../../shared/ui/Modal";
import { Select } from "../../../../../shared/ui/Select";
import { TextArea } from "../../../../../shared/ui/TextArea";
import topicService from "../../api/topicService";
import { ConfidenceLevel } from "../../models/shared/ConfidenceLevel";
import type { TopicDto } from "../../models/topic/TopicDto";
import type { UpdateTopicDto } from "../../models/topic/UpdateTopicDto";

interface UpdateTopicModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: TopicDto;
}

export function UpdateTopicModal({ isOpen, onClose, topic }: UpdateTopicModalProps) {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateTopicDto>();

    useEffect(() => {
        if (isOpen) {
            reset({
                name: topic.name,
                description: topic.description,
                order: topic.order,
                confidenceLevel: topic.confidenceLevel,
            });
        }
    }, [isOpen, reset, topic]);

    const { mutate: updateTopic, isPending } = useMutation({
        mutationFn: (data: UpdateTopicDto) => topicService.updateTopic(topic.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["topics", topic.learningPathId] });
            queryClient.invalidateQueries({ queryKey: ["topic", topic.id] });
            queryClient.invalidateQueries({ queryKey: ["learningPath", topic.learningPathId] });
            onClose();
            toast.success("Topic updated successfully");
        },
        onError: () => toast.error("Failed to update topic"),
    });

    const confidenceOptions = Object.values(ConfidenceLevel).map((level) => ({
        value: level,
        label: level,
    }));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Edit ${topic.name}`}
            description="Keep this topic clear, focused, and easy to find."
            closeOnBackdropClick={!isPending}
        >
            <form className="flex flex-col gap-4" onSubmit={handleSubmit((data) => updateTopic(data))}>
                <Input
                    label="Topic name"
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
                    rows={4}
                    required
                    disabled={isPending}
                    error={errors.description?.message}
                    {...register("description", {
                        required: "Description is required",
                        maxLength: { value: 300, message: "Use no more than 300 characters" },
                    })}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                        type="number"
                        min={1}
                        label="Position"
                        required
                        disabled={isPending}
                        error={errors.order?.message}
                        {...register("order", {
                            required: "Position is required",
                            valueAsNumber: true,
                            min: { value: 1, message: "Position must be 1 or greater" },
                        })}
                    />
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
                    <Button type="button" variant="ghost" onClick={onClose} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" loading={isPending}>
                        Save changes
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
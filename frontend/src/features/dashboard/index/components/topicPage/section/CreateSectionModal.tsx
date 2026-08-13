import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../../../shared/ui/Button";
import { Input } from "../../../../../../shared/ui/Input";
import { Modal } from "../../../../../../shared/ui/Modal";
import { Select } from "../../../../../../shared/ui/Select";
import { TextArea } from "../../../../../../shared/ui/TextArea";
import sectionService from "../../../api/sectionService";
import type { CreateSectionDto } from "../../../models/section/CreateSectionDto";
import { ConfidenceLevel } from "../../../models/shared/ConfidenceLevel";

interface CreateSectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    topicId: string;
}

const confidenceOptions = Object.values(ConfidenceLevel).map((level) => ({
    value: level,
    label: level,
}));

export function CreateSectionModal({
    isOpen,
    onClose,
    topicId,
}: CreateSectionModalProps) {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateSectionDto>({
        defaultValues: {
            confidenceLevel: ConfidenceLevel.MEDIUM,
        },
    });

    const { mutate: createSection, isPending } = useMutation({
        mutationFn: (data: CreateSectionDto) => sectionService.createSection(topicId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sections", topicId] });
            queryClient.invalidateQueries({ queryKey: ["topic", topicId] });
            reset();
            onClose();
            toast.success("Section created successfully");
        },
        onError: () => toast.error("Failed to create section"),
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
            size="lg"
            title="Add a section"
            description="Add a focused lesson or resource to this topic."
            closeOnBackdropClick={!isPending}
        >
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit((data) => createSection(data))}
            >
                <Input
                    label="Section name"
                    placeholder="e.g. Components and props"
                    autoFocus
                    required
                    disabled={isPending}
                    error={errors.name?.message}
                    {...register("name", {
                        required: "Section name is required",
                        minLength: { value: 3, message: "Use at least 3 characters" },
                        maxLength: { value: 80, message: "Use no more than 80 characters" },
                    })}
                />

                <TextArea
                    label="Description"
                    placeholder="What should the learner understand after this section?"
                    rows={4}
                    required
                    disabled={isPending}
                    error={errors.description?.message}
                    {...register("description", {
                        required: "Description is required",
                        maxLength: { value: 500, message: "Use no more than 500 characters" },
                    })}
                />

                <TextArea
                    label="Code snippet"
                    helperText="Optional example code or notes"
                    placeholder="Paste an optional code example"
                    rows={5}
                    disabled={isPending}
                    error={errors.codeSnippet?.message}
                    className="font-mono text-sm"
                    {...register("codeSnippet")}
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

                <div className="mt-2 flex flex-col-reverse gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800 sm:flex-row sm:justify-end">
                    <Button type="button" variant="ghost" onClick={handleClose} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" loading={isPending}>
                        Create section
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

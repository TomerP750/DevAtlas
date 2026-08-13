import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../../../shared/ui/Button";
import { Input } from "../../../../../../shared/ui/Input";
import { Modal } from "../../../../../../shared/ui/Modal";
import { Select } from "../../../../../../shared/ui/Select";
import { TextArea } from "../../../../../../shared/ui/TextArea";
import sectionService from "../../../api/sectionService";
import type { SectionDto } from "../../../models/section/SectionDto";
import type { UpdateSectionDto } from "../../../models/section/UpdateSectionDto";
import { ConfidenceLevel } from "../../../models/shared/ConfidenceLevel";

interface UpdateSectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    section: SectionDto;
    topicId: string;
}

const confidenceOptions = Object.values(ConfidenceLevel).map((level) => ({
    value: level,
    label: level,
}));

export function UpdateSectionModal({
    isOpen,
    onClose,
    section,
    topicId,
}: UpdateSectionModalProps) {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateSectionDto>();

    useEffect(() => {
        if (isOpen) {
            reset({
                name: section.name,
                description: section.description,
                codeSnippet: section.codeSnippet ?? "",
                confidenceLevel: section.confidenceLevel,
            });
        }
    }, [isOpen, reset, section]);

    const { mutate: updateSection, isPending } = useMutation({
        mutationFn: (data: UpdateSectionDto) =>
            sectionService.updateSection(section.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sections", topicId] });
            queryClient.invalidateQueries({ queryKey: ["section", section.id] });
            onClose();
            toast.success("Section updated successfully");
        },
        onError: () => toast.error("Failed to update section"),
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
            title={`Edit ${section.name}`}
            description="Keep this section concise and useful for the learner."
            closeOnBackdropClick={!isPending}
        >
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit((data) => updateSection(data))}
            >
                <Input
                    label="Section name"
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

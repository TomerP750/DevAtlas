import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../../../../../shared/ui/Button";
import { Modal } from "../../../../../shared/ui/Modal";
import sectionService from "../../api/sectionService";

interface DeleteSectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDeleted?: () => void;
    sectionId: string;
    sectionName: string;
    topicId: string;
}

export function DeleteSectionModal({
    isOpen,
    onClose,
    onDeleted,
    sectionId,
    sectionName,
    topicId,
}: DeleteSectionModalProps) {
    const queryClient = useQueryClient();
    const { mutate: deleteSection, isPending } = useMutation({
        mutationFn: () => sectionService.deleteSection(sectionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sections", topicId] });
            queryClient.invalidateQueries({ queryKey: ["topic", topicId] });
            onClose();
            onDeleted?.();
            toast.success("Section deleted");
        },
        onError: () => toast.error("Failed to delete section"),
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete section?"
            description="This action cannot be undone."
            size="sm"
            closeOnBackdropClick={!isPending}
        >
            <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/30">
                <AlertTriangle
                    className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
                    size={20}
                    aria-hidden="true"
                />
                <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        You are about to delete “{sectionName}”.
                    </p>
                    <p className="mt-1 text-sm leading-5 text-zinc-600 dark:text-zinc-400">
                        Its content, code snippet, and saved progress will be permanently removed.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="ghost" onClick={onClose} disabled={isPending}>
                    Keep section
                </Button>
                <Button
                    type="button"
                    variant="danger"
                    loading={isPending}
                    onClick={() => deleteSection()}
                >
                    Delete section
                </Button>
            </div>
        </Modal>
    );
}

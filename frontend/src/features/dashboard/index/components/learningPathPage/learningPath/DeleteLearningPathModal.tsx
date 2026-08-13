import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../../../../shared/ui/Button";
import { Modal } from "../../../../../../shared/ui/Modal";
import learningPathService from "../../../api/learningPathService";

interface DeleteLearningPathModalProps {
    isOpen: boolean;
    onClose: () => void;
    learningPathId: string;
    learningPathName: string;
}

export function DeleteLearningPathModal({
    isOpen,
    onClose,
    learningPathId,
    learningPathName,
}: DeleteLearningPathModalProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: deleteLearningPath, isPending } = useMutation({
        mutationFn: () => learningPathService.deleteLearningPath(learningPathId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["learningPaths"] });
            toast.success("Learning path deleted");
            navigate("/dashboard");
        },
        onError: () => toast.error("Failed to delete learning path"),
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete learning path?"
            description="This action cannot be undone."
            size="sm"
            closeOnBackdropClick={!isPending}
        >
            <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/30">
                <AlertTriangle className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" size={20} aria-hidden="true" />
                <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        You are about to delete “{learningPathName}”.
                    </p>
                    <p className="mt-1 text-sm leading-5 text-zinc-600 dark:text-zinc-400">
                        Every topic, section, and saved progress in this path will be permanently removed.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="ghost" onClick={onClose} disabled={isPending}>
                    Keep learning path
                </Button>
                <Button
                    type="button"
                    variant="danger"
                    loading={isPending}
                    onClick={() => deleteLearningPath()}
                >
                    Delete learning path
                </Button>
            </div>
        </Modal>
    );
}

import { Button } from "../../../../../../shared/ui/Button";
import { Modal } from "../../../../../../shared/ui/Modal";
import learningPathService from "../../../api/learningPathService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface DeleteModalProps {
    learningPathId: string;
    learningPathName: string;
    isOpen: boolean;
    onClose: () => void;
}
export function DeleteModal({ learningPathId, learningPathName, isOpen, onClose }: DeleteModalProps) {

    const queryClient = useQueryClient();

    const { mutate: deleteLearningPath, isPending } = useMutation({
        mutationFn: (learningPathId: string) => learningPathService.deleteLearningPath(learningPathId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["learningPaths"] });
            onClose();
            toast.success("Learning path deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete learning path");
        },
    });
    
    const handleDeleteLearningPath = () => {
        deleteLearningPath(learningPathId);
    }

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${learningPathName}`} description="Are you sure you want to delete this learning path?">
            <div className="flex flex-col gap-4">
                <p className="text-sm text-neutral-500">
                    This action cannot be undone.
                </p>
                <div className="flex justify-end">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteLearningPath} disabled={isPending}>Delete</Button>
                </div>
            </div>
        </Modal>
    );
}
import { Button } from "../../../../../shared/ui/Button";
import { Modal } from "../../../../../shared/ui/Modal";

interface DeleteModalProps {
    learningPathId: string;
    isOpen: boolean;
    onClose: () => void;
}
export function DeleteModal({ learningPathId, isOpen, onClose }: DeleteModalProps) {
    
    const handleDelete = () => {
        onClose();
    }
    
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Learning Path" description="Are you sure you want to delete this learning path?">
            <div className="flex flex-col gap-4">
                <p className="text-sm text-neutral-500">
                    This action cannot be undone.
                </p>
                <div className="flex justify-end">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </div>
            </div>
        </Modal>
    );
}
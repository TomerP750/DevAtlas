import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteLearningPathModal } from "../../shared/components/DeleteLearningPathModal";
import { UpdateLearningPathModal } from "../../shared/components/UpdateLearningPathModal";
import { Button } from "../../../../../shared/ui/Button";

interface CrudMenuProps {
    isOpen: boolean;
    learningPathId: string;
    learningPathName: string;
}

export function CrudMenu({ isOpen, learningPathId, learningPathName }: CrudMenuProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-8 z-10 w-40 rounded-lg border border-neutral-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 p-1 shadow-lg">
            <Button
                onClick={() => setEditModalOpen(true)}
                leftIcon={<Pencil className="h-4 w-4" />}
                variant="ghost"
                className="flex! w-full! items-center gap-2! rounded-md! text-sm! text-neutral-700! dark:text-zinc-400! transition! hover:bg-neutral-100! dark:hover:bg-zinc-800!"
            >
                Edit
            </Button>

            <Button
                leftIcon={<Trash2 className="h-4 w-4" />}
                variant="ghost"
                className="flex! w-full! items-center gap-2! rounded-md! text-sm! text-red-600! transition! hover:bg-red-50! dark:hover:bg-zinc-800!"
                onClick={() => setDeleteModalOpen(true)}
            >
                Delete
            </Button>

            <DeleteLearningPathModal
                learningPathId={learningPathId}
                learningPathName={learningPathName}
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
            />
            <UpdateLearningPathModal
                learningPathId={learningPathId}
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
            />
        </div>
    );
}

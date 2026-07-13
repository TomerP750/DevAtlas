import { Trash2Icon } from "lucide-react";
import { Button } from "../../../../shared/ui/Button";
import { Modal } from "../../../../shared/ui/Modal";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            className="overflow-hidden border-rose-200 p-0 shadow-2xl shadow-rose-950/10 dark:border-rose-950/60 dark:shadow-black/40"
        >
            <div className="relative px-6 pb-6">

                <Trash2Icon
                    className="text-rose-600 mx-auto "
                    size={26}
                    aria-hidden="true" />

                <div className="mt-5 text-center">
                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                        Delete account?
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        This will permanently delete your account and all related data. You will not be able to recover it later.
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="w-full border-zinc-300 bg-white/90 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200"
                    >
                        Cancel
                    </Button>
                    <Button
                        // onClick={handleAccountDeletion}
                        // disabled={isPending}
                        leftIcon={<Trash2Icon size={17} />}
                        className="w-full bg-rose-600 text-white shadow-lg shadow-rose-600/20 hover:bg-rose-700 focus:ring-rose-500/40 dark:bg-rose-500 dark:hover:bg-rose-400"
                    >
                        Delete Account
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
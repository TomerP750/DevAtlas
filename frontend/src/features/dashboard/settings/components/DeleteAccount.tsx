import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../shared/ui/Button";
import { DeleteAccountModal } from "./DeleteAccountModal";

export function DeleteAccount() {

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm dark:border-red-900/60 dark:bg-red-950/20 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-red-700 dark:text-red-400">
                        <TrashIcon className="h-5 w-5" />
                        <span>Delete Account</span>
                    </h2>
                    <p className="mt-1 text-sm text-red-600/80 dark:text-red-300/80">
                        Permanently delete your account and all related data.
                    </p>
                </div>

                <Button
                    type="button"
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                    onClick={() => setModalOpen(true)}
                >
                    Delete Account
                </Button>
            </div>
            <DeleteAccountModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    )

}

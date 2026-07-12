import { useEffect, useId, type HTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";
import { Button } from "./Button";

type ModalSize = "sm" | "md" | "lg";

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
    onClose: () => void;
    title?: ReactNode;
    description?: ReactNode;
    footer?: ReactNode;
    size?: ModalSize;
    closeOnBackdropClick?: boolean;
};

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    footer,
    size = "md",
    closeOnBackdropClick = true,
    className = "",
    children,
    ...props
}: ModalProps) {
    const titleId = useId();
    const descriptionId = useId();

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const sizeClasses: Record<ModalSize, string> = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
    };

    const modalClasses = [
        "relative w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl",
        "dark:border-zinc-800 dark:bg-zinc-900",
        sizeClasses[size],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onMouseDown={handleBackdropMouseDown}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={description ? descriptionId : undefined}
                className={modalClasses}
                {...props}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        {title ? (
                            <h2 id={titleId} className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {title}
                            </h2>
                        ) : null}

                        {description ? (
                            <p id={descriptionId} className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                {description}
                            </p>
                        ) : null}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        leftIcon={<XIcon size={18} />}
                        aria-label="Close modal"
                        className="-mr-2 -mt-2 h-9 w-9 rounded-full p-0 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    />
                </div>

                <div className={title || description ? "mt-5" : ""}>{children}</div>

                {footer ? (
                    <div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                        {footer}
                    </div>
                ) : null}
            </div>
        </div>,
        document.body,
    );
}

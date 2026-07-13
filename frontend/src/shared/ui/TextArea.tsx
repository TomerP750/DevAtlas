import { forwardRef, useId, type TextareaHTMLAttributes } from "react";


type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    rows?: number;
    label?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
    { label, error, helperText, required, id, rows, ...props },
    ref,
) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const describedBy =
        [error ? `${inputId}-error` : null, helperText && !error ? `${inputId}-helper` : null]
            .filter(Boolean)
            .join(" ") || undefined;

    const textAreaElement = (
        <textarea
            ref={ref}
            id={inputId}
            rows={rows ?? 3}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={`p-2 border border-black/10 dark:border-white/10 
            rounded-none! w-full resize-none ${props.className}`} {...props}
        />
    )

    if (!label && !error && !helperText) {
        return textAreaElement;
    }

    return (
        <div className="flex flex-col gap-1.5">
            {label && <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {label} 
                {required ? <span className="text-red-500"> *</span> : null}
            </label>}
            {textAreaElement}
            {error && <p id={`${inputId}-error`} className="text-sm text-red-500">{error}</p>}
            {helperText && <p id={`${inputId}-helper`} className="text-sm text-zinc-500 dark:text-zinc-400">{helperText}</p>}
        </div>
    )
})
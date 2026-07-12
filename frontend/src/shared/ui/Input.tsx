import { forwardRef, useId, type InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    helperText?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        label,
        error,
        helperText,
        id,
        className = "",
        disabled,
        ...props
    },
    ref,
) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const describedBy =
        [error ? `${inputId}-error` : null, helperText && !error ? `${inputId}-helper` : null]
            .filter(Boolean)
            .join(" ") || undefined;

    const inputClasses = [
        "w-full rounded-lg border px-3 py-2 text-sm transition-colors",
        "bg-white text-zinc-900 placeholder:text-zinc-400",
        "dark:bg-stone-950 dark:text-zinc-100 dark:placeholder:text-zinc-500",
        "focus:outline-none focus:ring-1 focus:ring-brand-primary/10 focus:border-brand-primary/70",
        error
            ? "border-red-500 dark:border-red-500"
            : "border-zinc-200 dark:border-zinc-800",
        disabled && "cursor-not-allowed opacity-60",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const inputElement = (
        <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={inputClasses}
            {...props}
        />
    );

    if (!label && !error && !helperText) {
        return inputElement;
    }

    return (
        <div className="flex flex-col gap-1.5">
            {label ? (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                    {label}
                </label>
            ) : null}

            {inputElement}

            {error ? (
                <p
                    id={`${inputId}-error`}
                    role="alert"
                    className="text-sm text-red-600 dark:text-red-400"
                >
                    {error}
                </p>
            ) : helperText ? (
                <p
                    id={`${inputId}-helper`}
                    className="text-sm text-zinc-500 dark:text-zinc-400"
                >
                    {helperText}
                </p>
            ) : null}
        </div>
    );
});

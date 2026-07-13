import { forwardRef, useId, type SelectHTMLAttributes } from "react";

export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    placeholder?: string;
    options?: readonly SelectOption[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
    {
        label,
        error,
        helperText,
        id,
        className = "",
        disabled,
        required,
        placeholder,
        options,
        children,
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

    const selectClasses = [
        "w-full rounded-lg border px-3 py-2 text-sm transition-colors",
        "bg-white text-zinc-900",
        "dark:bg-stone-950 dark:text-zinc-100",
        "focus:outline-none focus:ring-1 focus:ring-brand-primary/10 focus:border-brand-primary/70",
        error
            ? "border-red-500 dark:border-red-500"
            : "border-zinc-200 dark:border-zinc-800",
        disabled && "cursor-not-allowed opacity-60",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const selectElement = (
        <select
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={selectClasses}
            {...props}
        >
            {placeholder ? <option value="">{placeholder}</option> : null}
            {options?.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                >
                    {option.label}
                </option>
            ))}
            {children}
        </select>
    );

    if (!label && !error && !helperText) {
        return selectElement;
    }

    return (
        <div className="flex flex-col gap-1.5">
            {label ? (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                    {label}
                    {required ? <span className="text-red-500"> *</span> : null}
                </label>
            ) : null}

            {selectElement}

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
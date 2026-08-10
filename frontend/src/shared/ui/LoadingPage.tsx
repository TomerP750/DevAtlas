import type { HTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

export type LoadingPageProps = HTMLAttributes<HTMLDivElement> & {
    message?: string;
    fullScreen?: boolean;
};

export function LoadingPage({
    message = "Loading...",
    fullScreen = true,
    className = "",
    ...props
}: LoadingPageProps) {
    const containerClasses = [
        "flex flex-col items-center justify-center gap-4",
        fullScreen ? "min-h-screen" : "h-full w-full py-16",
        "bg-dark-background text-white",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={containerClasses} role="status" aria-live="polite" {...props}>
            <Loader2
                className="h-10 w-10 animate-spin text-brand-primary"
                aria-hidden="true"
            />
            {message && (
                <p className="text-sm font-medium text-white/80">{message}</p>
            )}
            <span className="sr-only">{message}</span>
        </div>
    );
}

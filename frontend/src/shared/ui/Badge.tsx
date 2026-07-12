import type { HTMLAttributes } from "react";

type BadgeSize = "xs" | "sm" | "md" | "lg";

export type BadgeProps = HTMLAttributes<HTMLDivElement> & {
    avatarUrl?: string;
    firstName?: string;
    lastName?: string;
    size?: BadgeSize;
    alt?: string;
};

export function Badge({
    avatarUrl,
    firstName,
    lastName,
    size = "sm",
    alt = "User avatar",
    className = "",
    ...props
}: BadgeProps) {
    const sizeClasses: Record<BadgeSize, string> = {
        xs: "h-6 w-6 text-xs",
        sm: "h-9 w-9 text-sm",
        md: "h-12 w-12 text-base",
        lg: "h-16 w-16 text-lg",
    };

    const badgeClasses = [
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
        avatarUrl
            ? "bg-zinc-100 dark:bg-zinc-800"
            : "bg-indigo-500 text-white",
        sizeClasses[size],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    
    const badgeText = getBadgeText(firstName, lastName);

    return (
        <div className={badgeClasses} {...props}>
            {avatarUrl ? (
                <img src={avatarUrl} alt={alt} className="h-full w-full object-cover" />
            ) : (
                <span aria-hidden="true">{badgeText}</span>
            )}
        </div>
    );
}

function getBadgeText(firstName?: string, lastName?: string) {
    if (firstName && lastName) {
        return `${firstName.trim().charAt(0)}${lastName.trim().charAt(0)}`.toUpperCase();
    }
    if (firstName) {
        return firstName.trim().charAt(0).toUpperCase();
    }
    if (lastName) {
        return lastName.trim().charAt(0).toUpperCase();
    }
    return "G";
}
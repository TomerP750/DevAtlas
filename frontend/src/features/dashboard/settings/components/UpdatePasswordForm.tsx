import { useForm } from "react-hook-form";
import type { ChangePasswordDto } from "../models/ChangePasswordDto";
import { Button } from "../../../../shared/ui/Button";
import { Input } from "../../../../shared/ui/Input";
import { LockIcon } from "lucide-react";
import userService from "../api/UserService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";


export function UpdatePasswordForm() {

    const { register, handleSubmit, formState: { errors }, } = useForm<ChangePasswordDto>();

    const { mutate: changePassword, isPending } = useMutation({
        mutationFn: (data: ChangePasswordDto) => userService.changePassword(data),
        onSuccess: () => {
            toast.success("Password changed successfully");
        },
        onError: (error) => {
            toast.error("Failed to change password");
        },
    });

    const handleChangePassword = (data: ChangePasswordDto) => {
        changePassword(data);
    }

    return (
        <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900 sm:p-6">
            <div className="mb-6">
                <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    <LockIcon className="h-5 w-5" />
                    <span>Change Password</span>
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Choose a strong password to keep your account secure.
                </p>
            </div>

            <form className="flex flex-col gap-5"
                onSubmit={handleSubmit(handleChangePassword)}>
                <Input
                    label="Current Password"
                    type="password"
                    className="bg-neutral-100! dark:bg-zinc-800!"
                    placeholder="Enter your current password"
                    autoComplete="current-password"
                    error={errors.currentPassword?.message?.toString()}
                    {...register("currentPassword", {
                        required: "Current password is required",
                    })}
                />
                <Input
                    label="New Password"
                    type="password"
                    className="bg-neutral-100! dark:bg-zinc-800!"
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                    error={errors.newPassword?.message?.toString()}
                    {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                />
                <Input
                    label="Confirm New Password"
                    type="password"
                    className="bg-neutral-100! dark:bg-zinc-800!"
                    placeholder="Confirm your new password"
                    autoComplete="new-password"
                    error={errors.confirmNewPassword?.message?.toString()}
                    {...register("confirmNewPassword", {
                        required: "Please confirm your new password",
                    })}
                />

                <div className="flex justify-end pt-2">
                    <Button
                        type="submit"
                        loading={isPending}
                        disabled={isPending}
                        className="min-w-32"
                    >
                        Update Password
                    </Button>
                </div>
            </form>
        </section>
    );
}
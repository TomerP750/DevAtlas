import { useForm } from "react-hook-form";
import type { UpdateUserDto } from "../models/UpdateUserDto";
import { UserIcon } from "lucide-react";
import { Badge } from "../../../../shared/ui/Badge";
import { Button } from "../../../../shared/ui/Button";
import { Input } from "../../../../shared/ui/Input";
import userService from "../api/UserService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function PersonalInformationSettings() {

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateUserDto>();


    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: (data: UpdateUserDto) => userService.updateUser(data),
        onSuccess: () => {
            toast.success("User updated successfully");
        },
        onError: (error) => {
            toast.error("Failed to update user");
        },
    });

    const handleUpdateUser = (data: UpdateUserDto) => {
        updateUser(data);
    }

    return (

        <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900 sm:p-6">

            {/* Title */}

            <header className="flex flex-col mb-6">
                <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    <UserIcon className="h-5 w-5" />
                    <span>Personal Details</span>
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Update your name and account email address.
                </p>
            </header>

            <form className="flex flex-col gap-5"
                onSubmit={handleSubmit(handleUpdateUser)}>

                <div className="flex items-center gap-2">
                    {/* Avatar url input */}
                    <Badge
                        // firstName={user?.firstName}
                        // lastName={user?.lastName}
                        // avatarUrl={user?.avatarUrl}
                        size="lg"
                        className="rounded-xl" />

                    <Input
                        label="Avatar URL"
                        type="text"
                        className="bg-neutral-100! dark:bg-zinc-800!"
                        placeholder="Enter your avatar URL"
                        autoComplete="avatar-url"
                        error={errors.avatarUrl?.message?.toString()}
                        {...register("avatarUrl")}
                    />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Input
                        label="First Name"
                        type="text"
                        className="bg-neutral-100! dark:bg-zinc-800!"
                        placeholder="Enter your first name"
                        autoComplete="given-name"
                        error={errors.firstName?.message?.toString()}
                        {...register("firstName", {
                            minLength: {
                                value: 3,
                                message: "First name must be at least 3 characters long",
                            },
                            maxLength: {
                                value: 50,
                                message: "First name must be less than 50 characters long",
                            },
                        })}
                    />
                    <Input
                        label="Last Name"
                        type="text"
                        className="bg-neutral-100! dark:bg-zinc-800!"
                        placeholder="Enter your last name"
                        autoComplete="family-name"
                        error={errors.lastName?.message?.toString()}
                        {...register("lastName", {
                            minLength: {
                                value: 3,
                                message: "Last name must be at least 3 characters long",
                            },
                            maxLength: {
                                value: 50,
                                message: "Last name must be less than 50 characters long",
                            },
                        })}
                    />
                </div>

                <Input
                    label="Email"
                    type="email"
                    className="bg-neutral-100! dark:bg-zinc-800!"
                    placeholder="name@example.com"
                    autoComplete="email"
                    error={errors.email?.message?.toString()}
                    {...register("email", {
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter a valid email address",
                        },
                    })}
                />

                <div className="flex justify-end pt-2">
                    <Button
                        type="submit"
                        loading={isPending}
                        className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                        disabled={isPending}
                    >
                        Save Details
                    </Button>
                </div>
            </form>

        </section>
    );


}
import { useForm } from "react-hook-form";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { SignUpRequestDto } from "../models/SignupRequestDto";


export function SignupPage() {

    const navigate = useNavigate();
    const { signup: authSignup } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpRequestDto>();

    const { mutate: signUpUser, isPending } = useMutation({
        mutationFn: (dto: SignUpRequestDto) => authSignup(dto),
        onSuccess: () => {
            navigate("/dashboard");
            toast.success("Signup successful");
        },
        onError: () => {
            toast.error("Signup failed. Please try again.");
        },
    });
    
    const handleSignUp = (dto: SignUpRequestDto) => {
        signUpUser(dto);
    }

    const inputClassName = "h-11 rounded-xl !border-zinc-300 !bg-white/50 px-4 text-zinc-950 shadow-sm placeholder:text-zinc-400 hover:!border-zinc-400 focus:!border-brand-primary focus:!bg-white/75 focus:ring-4 focus:ring-brand-primary/10 dark:!border-cyan-300/30 dark:!bg-cyan-950/20 dark:text-white dark:placeholder:text-cyan-100/40 dark:hover:!border-cyan-300/50 dark:focus:!border-brand-primary-dark dark:focus:!bg-cyan-950/35 dark:focus:ring-brand-primary-dark/10";

    return (
        <section className="w-full max-w-lg" aria-labelledby="signup-heading">
            <form
                className="rounded-3xl border border-zinc-200/80 p-6 shadow-xl shadow-zinc-950/5 sm:p-8 dark:border-white/10 dark:shadow-black/25"
                onSubmit={handleSubmit(handleSignUp)}
            >
                <header className="mb-8">
                    <p className="mb-2 text-sm font-semibold text-brand-primary dark:text-brand-primary-dark">
                        Start building your atlas
                    </p>
                    <h1
                        id="signup-heading"
                        className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-white"
                    >
                        Create your account
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                        Keep your learning paths, notes, and resources together.
                    </p>
                </header>

                <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input
                        required
                        label="First Name"
                        placeholder="Your First Name"
                        className={inputClassName}
                        {...register("firstName", {
                            required: "First name is required",
                            pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "First name must contain only letters",
                            },
                        })}
                        error={errors.firstName?.message}
                    />

                    <Input
                        required
                        label="Last Name"
                        placeholder="Your Last Name"
                        className={inputClassName}
                        {...register("lastName", {
                            required: "Last name is required",
                            pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Last name must contain only letters",
                            },
                        })}
                        error={errors.lastName?.message}
                    />
                </div>

                <Input
                    required
                    label="Email"
                    placeholder="you@example.com"
                    className={inputClassName}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })}
                    error={errors.email?.message}
                />

                <Input
                    required
                    label="Password"
                    placeholder="At least 8 characters"
                    className={inputClassName}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long",
                        },
                    })}
                    type="password"
                    error={errors.password?.message}
                />

                <Input
                    required
                    label="Confirm Password"
                    placeholder="Repeat your password"
                    className={inputClassName}
                    {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value, formValues) => {
                            if (value !== formValues.password) {
                                return "Passwords do not match";
                            }
                        },
                    })}
                    type="password"
                    error={errors.confirmPassword?.message}
                />

                <Button
                    type="submit"
                    disabled={isPending}
                    variant="primary"
                    className="mt-2 h-11 w-full rounded-xl shadow-lg shadow-brand-primary/20 dark:shadow-brand-primary-dark/20">
                    {isPending ? "Creating account..." : "Create account"}
                </Button>
                </div>

                <p className="mt-6 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                    Already have an account? {" "}
                    <Link to="/auth/login"
                        className="font-semibold text-brand-primary hover:text-brand-primary-hover dark:text-brand-primary-dark dark:hover:text-brand-primary-dark-hover">
                        Sign in
                    </Link>
                </p>

            </form>
        </section>
    )
}
import { useForm } from "react-hook-form";
import { type LoginRequestDto } from "../models/LoginRequestDto";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export function LoginPage() {

    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequestDto>();

    const { mutate: loginUser, isPending } = useMutation({
        mutationFn: (dto: LoginRequestDto) => authLogin(dto),
        onSuccess: () => {
            navigate("/dashboard");
            toast.success("Login successful.");
        },
        onError: () => {
            toast.error("Login failed. Please try again.");
        },
    });

    const handleLogin = (dto: LoginRequestDto) => {
        loginUser(dto);
    };


    const inputClassName = "h-11 rounded-xl !border-zinc-300 !bg-white/50 px-4 text-zinc-950 shadow-sm placeholder:text-zinc-400 hover:!border-zinc-400 focus:!border-brand-primary focus:!bg-white/75 focus:ring-4 focus:ring-brand-primary/10 dark:!border-cyan-300/30 dark:!bg-cyan-950/20 dark:text-white dark:placeholder:text-cyan-100/40 dark:hover:!border-cyan-300/50 dark:focus:!border-brand-primary-dark dark:focus:!bg-cyan-950/35 dark:focus:ring-brand-primary-dark/10";

    return (
        <section className="w-full max-w-md" aria-labelledby="login-heading">
            <form
                className="rounded-3xl border border-zinc-200/80 p-6 shadow-xl shadow-zinc-950/5 sm:p-9 dark:border-white/10 dark:shadow-black/25"
                onSubmit={handleSubmit(handleLogin)}
            >
                <header className="mb-8">
                    <p className="mb-2 text-sm font-semibold text-brand-primary dark:text-brand-primary-dark">
                        Welcome back
                    </p>
                    <h1
                        id="login-heading"
                        className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-white"
                    >
                        Sign in to DevAtlas
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                        Continue where you left off.
                    </p>
                </header>

                <div className="space-y-5">
                <Input
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
                    label="Password"
                    placeholder="Enter your password"
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
                <Button
                    type="submit"
                    disabled={isPending}
                    variant="primary"
                    className="mt-2 h-11 w-full rounded-xl shadow-lg shadow-brand-primary/20 dark:shadow-brand-primary-dark/20">
                    {isPending ? "Signing in..." : "Sign in"}
                </Button>
                </div>

                <p className="mt-6 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/auth/signup"
                        className="font-semibold text-brand-primary hover:text-brand-primary-hover dark:text-brand-primary-dark dark:hover:text-brand-primary-dark-hover"
                    >
                        Sign up
                    </Link>
                </p>
            </form>

        </section>
    )
}
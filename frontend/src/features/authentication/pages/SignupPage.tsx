import { useForm } from "react-hook-form";
import { type SignUpRequestDto } from "../models/SignUpRequestDto";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function SignupPage() {

    const navigate = useNavigate();
    const { signup: authSignup } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpRequestDto>();


    const { mutate: signUpUser, isPending } = useMutation({
        mutationFn: (dto: SignUpRequestDto) => authSignup(dto),
        onSuccess: () => {
            navigate("/dashboard");
        },
        onError: (err) => {
            toast.error("Signup failed. Please try again.");
        },
    });
    
    const handleSignUp = (dto: SignUpRequestDto) => {
        signUpUser(dto);
    }

    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-3 text-center text-2xl font-semibold tracking-tight dark:text-white sm:text-3xl">
                Create an account
            </h1>
            <form
                className="w-md max-w-3xl space-y-5 rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm sm:p-10"
                onSubmit={handleSubmit(handleSignUp)}>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        required
                        label="First Name"
                        placeholder="First Name"
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
                        placeholder="Last Name"
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
                    placeholder="Email"
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
                    placeholder="Password"
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
                    placeholder="Confirm Password"
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
                    className="w-full">
                    Create Account
                </Button>

                <p className="text-center text-sm text-gray-500">
                    Already have an account? {" "}
                    <Link to="/auth/login"
                        className="text-brand-primary hover:underline font-bold">
                        Sign in
                    </Link>
                </p>

            </form>
        </section>
    )
}
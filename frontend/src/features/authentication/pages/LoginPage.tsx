import { useForm } from "react-hook-form";
import { type LoginRequestDto } from "../models/LoginRequestDto";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

export function LoginPage() {

    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequestDto>();

    const { mutate: loginUser, isPending } = useMutation({
        mutationFn: (dto: LoginRequestDto) => authLogin(dto),
        onSuccess: () => {
            navigate("/dashboard");
        },
        onError: (err) => {
            toast.error("Login failed. Please try again.");
        },
    });

    const handleLogin = (dto: LoginRequestDto) => {
        loginUser(dto);
    };


    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-3 text-center text-2xl font-semibold tracking-tight dark:text-white sm:text-3xl">
                Sign in to your account
            </h1>
            <form
                className="w-md max-w-2xl space-y-5 rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm sm:p-10"
                onSubmit={handleSubmit(handleLogin)}>
                <Input
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
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-2">
                    Login
                </Button>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account? <Link to="/auth/signup" className="text-brand-primary hover:underline font-bold">Sign up</Link>
                </p>
            </form>

        </section>
    )
}
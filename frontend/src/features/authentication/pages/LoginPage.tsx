import { useForm } from "react-hook-form";
import { type LoginRequestDto } from "../models/LoginRequestDto";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { Link } from "react-router-dom";

export function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequestDto>();

    const onSubmit = (data: LoginRequestDto) => {
        console.log(data);
    }

    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-3 text-center text-2xl font-semibold tracking-tight dark:text-white sm:text-3xl">
                Sign in to your account
            </h1>
            <form
                className="w-md max-w-2xl space-y-5 rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm sm:p-10"
                onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Email"
                    placeholder="Email"
                    {...register("email")}
                    error={errors.email?.message}
                />
                <Input
                    label="Password"
                    placeholder="Password"
                    {...register("password")}
                    error={errors.password?.message}
                />
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full">
                    Login
                </Button>
                <p className="text-center text-sm text-gray-500">
                    Don't have an account? <Link to="/auth/signup" className="text-brand-primary hover:underline font-bold">Sign up</Link>
                </p>
            </form>

        </section>
    )
}
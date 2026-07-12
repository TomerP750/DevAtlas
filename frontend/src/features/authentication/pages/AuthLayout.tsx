import { Link, Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-10">

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,_transparent_1px),linear-gradient(90deg,_rgba(255,255,255,0.035)_1px,_transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,_black_35%,_transparent_75%)]" />

            <div className="absolute z-10">
                <Link to="/">
                    <h1 className="dark:text-white text-xl md:text-2xl font-semibold tracking-tight">
                        DevAtlas
                    </h1>
                </Link>
            </div>

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
                <Outlet />
            </div>

        </main>
    )
}
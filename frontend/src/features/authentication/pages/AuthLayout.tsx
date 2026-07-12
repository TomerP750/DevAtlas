import { Link, Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-violet-50 to-indigo-100 px-4 py-8 sm:px-6 lg:px-10 dark:from-dark-background dark:via-slate-900 dark:to-indigo-950">

            {/* Background glow */}
            <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-brand-primary/20 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-indigo-400/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/10 blur-3xl" />

            {/* Logo */}
            <div className="relative z-10">
                <Link to="/">
                    <h1 className="text-2xl font-bold tracking-tight text-brand-primary">
                        DevAtlas
                    </h1>
                </Link>
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center -translate-y-8">
                <Outlet />
            </div>

        </main>
    );
}
import { Link } from "react-router-dom";

export function Hero() {
    return (
        <header className="relative min-h-screen bg-neutral-100">

            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />
            <div className="absolute top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-300/25 blur-3xl" />

            <nav className="h-20 flex items-center justify-between px-6 md:px-10">
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight text-indigo-600"
                >
                    DevAtlas
                </Link>

                <Link
                    to="/auth/login"
                    className="rounded-lg border border-neutral-300 px-5 py-2 text-sm font-medium transition hover:bg-neutral-100"
                >
                    Login
                </Link>
            </nav>

            <div className="flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center gap-16 px-6 md:px-10 lg:flex-row lg:items-center lg:justify-between">
                {/* Left */}
                <div className="max-w-xl sm:max-w-2xl lg:-translate-y-8">
                    <span className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
                        Developer Learning Platform
                    </span>

                    <h1 className="mt-6 bg-gradient-to-r from-brand-purple to-indigo-500 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                        Organize your developer knowledge in one place.
                    </h1>

                    <p className="my-6 text-lg leading-8 text-neutral-600">
                        Track technologies, learning progress, notes, and
                        resources with a clean workspace built for developers.
                    </p>

                    <Link
                        to="/auth/signup"
                        className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold 
                        text-white transition hover:bg-indigo-700">
                        Get Started
                    </Link>

                </div>

                {/* Right (placeholder) */}
                <div className="hidden h-[500px] w-full max-w-xl lg:block">
                    {/* Dashboard preview goes here */}
                </div>
            </div>
        </header>
    );
}
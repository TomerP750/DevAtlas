import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import previewImage from "../../assets/list_dark.jpg";

export function Hero() {
    return (
        <header className="relative isolate flex min-h-screen flex-col overflow-hidden bg-dark-background">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000_50%,transparent_100%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[-18rem] -z-10 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-brand-primary-dark/20 blur-[120px]"
            />

            <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 md:px-10">
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight text-white"
                >
                    Dev<span className="text-brand-primary-dark">Atlas</span>
                </Link>

                <div className="flex items-center gap-2">
                    <Link
                        to="/auth/login"
                        className="rounded-lg border border-white/10 bg-white/5 dark:bg-stone-900/80 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
                    >
                        Log in
                    </Link>
                </div>
            </nav>

            <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 pt-14 text-center sm:pt-20">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-white/25" />
                    Developer Progress Tracking platform
                    <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-white/25" />
                </p>

                <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Organize your developer knowledge in{" "}
                    <span className="bg-gradient-to-r from-brand-primary-dark-active to-brand-primary-dark-hover bg-clip-text text-transparent">
                        one place
                    </span>.
                </h1>

                <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-zinc-400">
                    Track technologies, learning progress, notes, and resources
                    with a clean workspace built for developers.
                </p>

                <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
                    <Link
                        to="/auth/signup"
                        className="group inline-flex items-center gap-2 rounded-xl bg-brand-primary-dark px-6 py-3 text-sm font-semibold text-cyan-950 shadow-lg shadow-brand-primary-dark/20 transition hover:bg-brand-primary-dark-hover"
                    >
                        Get started
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>

            <figure className="mx-auto mt-14 flex w-full max-w-6xl justify-center px-6 shadow-2xl shadow-cyan-500/30 sm:px-10">
                <img
                    src={previewImage}
                    alt="DevAtlas dashboard preview"
                    className="block h-64 w-full rounded-t-2xl border border-b-0 border-white/10 object-cover object-top shadow-2xl shadow-black/40 sm:h-80"
                />
            </figure>

        </header>
    );
}


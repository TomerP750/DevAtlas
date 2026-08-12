import { ArrowLeft, Compass, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50 px-5 py-12 dark:bg-dark-background">
            <div
                className="absolute -top-28 right-[-7rem] h-80 w-80 rounded-full bg-violet-200/50 blur-3xl dark:bg-violet-500/10"
                aria-hidden="true"
            />
            <div
                className="absolute -bottom-36 left-[-8rem] h-96 w-96 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-500/5"
                aria-hidden="true"
            />

            <section className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-neutral-950/5 dark:border-dark-border dark:bg-dark-card dark:shadow-black/30">
                <div className="grid md:grid-cols-[0.8fr_1.2fr]">
                    <div className="relative flex min-h-64 items-center justify-center overflow-hidden border-b border-neutral-200 bg-neutral-950 p-8 md:min-h-112 md:border-r md:border-b-0 dark:border-dark-border">
                        <span
                            className="absolute text-[11rem] font-black leading-none tracking-tighter text-white/5 md:text-[13rem]"
                            aria-hidden="true"
                        >
                            404
                        </span>
                        <div className="relative text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-violet-300 shadow-lg shadow-black/20">
                                <Compass size={32} strokeWidth={1.6} aria-hidden="true" />
                            </div>
                            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
                                Error 404
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center p-8 sm:p-12">
                        <p className="text-sm font-semibold text-brand-primary">
                            Lost in the atlas?
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl dark:text-dark-text">
                            This page is off the map.
                        </h1>
                        <p className="mt-4 max-w-md text-base leading-7 text-neutral-500 dark:text-dark-text-muted">
                            The page may have moved, been removed, or the address might be incorrect. Let&apos;s get you back to familiar ground.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button
                                onClick={() => navigate("/")}
                                leftIcon={<Home size={17} aria-hidden="true" />}
                                className="min-h-11"
                            >
                                Back to home
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate(-1)}
                                leftIcon={<ArrowLeft size={17} aria-hidden="true" />}
                                className="min-h-11"
                            >
                                Previous page
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
import { useState } from "react";
import { DashboardHeader } from "../../shared/components/DashboardHeader";
import { ActionButtons } from "../components/index/ActionButtons";
import { LearningPathCard } from "../components/index/LearningPathCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import learningPathService from "../api/learningPathService";
import { LayoutDashboardIcon } from "lucide-react";
import { Button } from "../../../../shared/ui/Button";

export type GridLayout = "grid" | "row";

const PAGE_SIZE = 10;

export default function DashboardIndex() {

    const [gridLayout, setGridLayout] = useState<GridLayout>("grid");

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ["learningPaths", PAGE_SIZE],
        queryFn: ({ pageParam }) => learningPathService.allLearningPaths({
            page: pageParam,
            size: PAGE_SIZE,
        }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
        staleTime: 1000 * 60 * 5,
    });

    const learningPaths = data?.pages.flatMap((page) => page.items) ?? [];

    return (
        <section className="">
            <DashboardHeader
                Icon={LayoutDashboardIcon}
                title="Dashboard"
                description="Welcome to your dashboard"
            />

            <div className="p-4 max-w-7xl flex flex-col w-full my-3">

                {/* Action buttons */}
                <ActionButtons onLayoutChange={setGridLayout} gridLayout={gridLayout} />

                <div className={`mt-5 grid grid-cols-1 gap-4 overflow-y-auto pr-2 ${gridLayout === "grid"
                    ? "md:max-h-[532px] md:auto-rows-[260px] md:grid-cols-2"
                    : "max-h-[500px]"
                    }`}>

                    {learningPaths.map((learningPath) => (
                        <LearningPathCard key={learningPath.id} learningPath={learningPath} />
                    ))}

                    {isLoading && (
                        <p className="text-sm text-neutral-500 dark:text-dark-text-muted">
                            Loading learning paths...
                        </p>
                    )}

                    {isError && (
                        <p className="text-sm text-red-600">
                            We could not load your learning paths. Please try again.
                        </p>
                    )}

                    {!isLoading && !isError && learningPaths.length === 0 && (
                        <p className="text-sm text-neutral-500 dark:text-dark-text-muted">
                            You do not have any learning paths yet. Create your first one to get started.
                        </p>
                    )}

                    {hasNextPage && (
                        <div className="md:col-span-full flex justify-center py-2">
                            <Button
                                variant="secondary"
                                onClick={() => fetchNextPage()}
                                loading={isFetchingNextPage}
                                className="w-fit! rounded-none!"
                            >
                                Load more
                            </Button>
                        </div>
                    )}

                </div>

            </div>

        </section>
    )
}

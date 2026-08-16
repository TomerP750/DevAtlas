import { useEffect, useState } from "react";
import { DashboardHeader } from "../../../shared/components/DashboardHeader";
import { ActionButtons } from "./ActionButtons";
import { LearningPathCard } from "./LearningPathCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import learningPathService from "../../api/learningPathService";
import { LayoutDashboardIcon } from "lucide-react";
import { Button } from "../../../../../shared/ui/Button";
import type { LearningPathFilters } from "../../models/learningPath/LearningPathQueryDto";
import { useSearchParams } from "react-router-dom";
import type { Difficulty } from "../../models/learningPath/Difficulty";
import type { Category } from "../../models/learningPath/Category";

export type GridLayout = "grid" | "row";

const PAGE_SIZE = 10;

export default function DashboardIndex() {

    const [gridLayout, setGridLayout] = useState<GridLayout>("grid");
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<LearningPathFilters>({});

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const category = searchParams.get("category");
        const difficulty = searchParams.get("difficulty");
        setFilters({
            category: category as Category,
            difficulty: difficulty as Difficulty,
        });
    }, [searchParams]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ["learningPaths", PAGE_SIZE, search, filters],
        queryFn: ({ pageParam }) => learningPathService.findAll({
            page: pageParam,
            size: PAGE_SIZE,
            search: search || undefined,
            ...filters,
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
                <ActionButtons
                    onLayoutChange={setGridLayout}
                    onAfterSearch={setSearch}
                    onApplyFilters={setFilters}
                    gridLayout={gridLayout}
                />

                <div className={`mt-5 grid grid-cols-1 gap-4 overflow-y-auto pr-2 ${gridLayout === "grid"
                    ? "md:max-h-[596px] md:auto-rows-[295px] md:grid-cols-2"
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

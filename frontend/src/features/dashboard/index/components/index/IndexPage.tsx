import { useState } from "react";
import { DashboardHeader } from "../../../shared/components/DashboardHeader";
import { ActionButtons } from "./ActionButtons";
import { LearningPathCard } from "./LearningPathCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import learningPathService from "../../api/learningPathService";
import { LayoutDashboardIcon } from "lucide-react";
import { Button } from "../../../../../shared/ui/Button";
import type { LearningPathFilters } from "../../models/learningPath/LearningPathQueryDto";
import { useSearchParams } from "react-router-dom";
import { Difficulty } from "../../models/learningPath/Difficulty";
import { Category } from "../../models/learningPath/Category";

export type GridLayout = "grid" | "row";

const PAGE_SIZE = 10;

const categories = Object.values(Category);
const difficulties = Object.values(Difficulty);
const sortFields = ["name", "createdAt", "updatedAt"] as const;
const sortOrders = ["ASC", "DESC"] as const;

export default function DashboardIndexPage() {

    const [gridLayout, setGridLayout] = useState<GridLayout>("grid");
    const [search, setSearch] = useState("");

    const [searchParams] = useSearchParams();

    // Matching against the known values ignores anything hand-typed into the URL.
    const filters: LearningPathFilters = {
        category: categories.find((value) => value === searchParams.get("category")),
        difficulty: difficulties.find((value) => value === searchParams.get("difficulty")),
        sortBy: sortFields.find((value) => value === searchParams.get("sortBy")) ?? "createdAt",
        sortOrder: sortOrders.find((value) => value === searchParams.get("sortOrder")) ?? "DESC",
    };

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
        <section className="flex h-full min-h-0 flex-col overflow-hidden">
            <DashboardHeader
                Icon={LayoutDashboardIcon}
                title="Dashboard"
                description="Welcome to your dashboard"
            />

            <div className="flex min-h-0 w-full max-w-7xl flex-1 flex-col p-4">

                {/* Action buttons */}
                <ActionButtons
                    onLayoutChange={setGridLayout}
                    onAfterSearch={setSearch}
                    gridLayout={gridLayout}
                />

                <div className={`mt-5 min-h-0 flex-1 grid grid-cols-1 gap-4 overflow-y-auto pr-2 ${gridLayout === "grid"
                    ? "md:auto-rows-[295px] md:grid-cols-2"
                    : ""
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

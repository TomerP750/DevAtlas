import { useState } from "react";
import { DashboardHeader } from "../../shared/components/DashboardHeader";
import { ActionButtons } from "../components/ActionButtons";
import { LearningPathCard } from "../components/LearningPathCard";
import { useQuery } from "@tanstack/react-query";
import learningPathService from "../api/learningPathService";
import type { LearningPathDispalyDto } from "../models/learningPath/LearningPathDisplayDto";

export type GridLayout = "grid" | "row";

export function DashboardIndex() {

    const [gridLayout, setGridLayout] = useState<GridLayout>("grid");

    const { data: learningPaths, isLoading, error } = useQuery<LearningPathDispalyDto[]>({
        queryKey: ["learningPaths"],
        queryFn: () => learningPathService.allLearningPaths({ page: 1, size: 10 }),
        staleTime: 1000 * 60 * 5,
    });

    return (
        <section className="">
            <DashboardHeader
                title="Dashboard"
                description="Welcome to your dashboard"
            />

            <div className="p-4 max-w-7xl flex flex-col w-full mt-8">

                {/* Action buttons */}
                <ActionButtons onLayoutChange={setGridLayout} gridLayout={gridLayout} />

                <div className={`grid ${gridLayout === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-4 mt-8`}>

                    {learningPaths?.map((learningPath) => (
                        <LearningPathCard key={learningPath.id} learningPath={learningPath} />
                    ))}

                </div>

            </div>

        </section>
    )
}
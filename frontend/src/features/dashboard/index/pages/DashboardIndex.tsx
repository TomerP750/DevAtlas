import { useState } from "react";
import { DashboardHeader } from "../../shared/components/DashboardHeader";
import { ActionButtons } from "../components/index/ActionButtons";
import { LearningPathCard } from "../components/index/LearningPathCard";
import { useQuery } from "@tanstack/react-query";
import learningPathService from "../api/learningPathService";
import { LayoutDashboardIcon } from "lucide-react";
import type { LearningPathDto } from "../models/learningPath/LearningPathDto";

export type GridLayout = "grid" | "row";

export default function DashboardIndex() {

    const [gridLayout, setGridLayout] = useState<GridLayout>("grid");

    const { data: learningPaths, isLoading, error } = useQuery<LearningPathDto[]>({
        queryKey: ["learningPaths"],
        queryFn: () => learningPathService.allLearningPaths({ page: 1, size: 10 }),
        staleTime: 1000 * 60 * 5,
        enabled: false
    });

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

                    {learningPaths?.map((learningPath) => (
                        <LearningPathCard key={learningPath.id} learningPath={learningPath} />
                    ))}

                </div>

            </div>

        </section>
    )
}
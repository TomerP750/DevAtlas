import { useState } from "react";
import { DashboardHeader } from "../../shared/components/DashboardHeader";
import { ActionButtons } from "../components/ActionButtons";

export type GridLayout = "grid" | "row";

export function DashboardIndex() {

    const [gridLayout, setGridLayout] = useState<GridLayout>("grid");

    return (
        <section className="">
            <DashboardHeader
                title="Dashboard"
                description="Welcome to your dashboard"
            />

            <div className="p-4 max-w-7xl flex flex-col w-full mt-8">

                {/* Action buttons */}
                <ActionButtons onLayoutChange={setGridLayout} gridLayout={gridLayout} />

                <div className={`grid ${gridLayout === "grid" ? "grid-cols-2" : "grid-cols-1"} gap-4`}>


                </div>




            </div>

        </section>
    )
}
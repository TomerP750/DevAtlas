import { BookOpenIcon, Grid2x2Icon, GridIcon, ListIcon, PlusIcon } from "lucide-react";
import { DashboardHeader } from "../../shared/components/DashboardHeader";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/ui/Button";
import { useState } from "react";

type GridLayout = "grid" | "row";

export function DashboardIndex() {

    const navigate = useNavigate();

    const [gridLayout, setGridLayout] = useState<GridLayout>("grid");

    return (
        <section className="">
            <DashboardHeader
                title="Dashboard"
                description="Welcome to your dashboard"
            />

            <div className="p-4 max-w-7xl flex flex-col w-full mt-8">

                {/* Action buttons */}
                <div className="flex justify-between gap-2">
                    <Button variant="primary" className="w-fit! rounded-none!">
                        <PlusIcon className="w-4 h-4" />
                        Create a new Learning Path
                    </Button>

                    <div className="flex gap-1">
                        <Button
                            onClick={() => setGridLayout("grid")}
                            variant={gridLayout === "grid" ? "primary" : "secondary"}
                            className="w-fit! rounded-none!"
                        >
                            <Grid2x2Icon className="w-4 h-4" />
                            
                        </Button>
                        <Button
                            onClick={() => setGridLayout("row")}
                            variant={gridLayout === "row" ? "primary" : "secondary"}
                            className="w-fit! rounded-none!"
                        >
                            <ListIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className={`grid ${gridLayout === "grid" ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
                    

                </div>




            </div>

        </section>
    )
}
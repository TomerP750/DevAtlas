import { FilterIcon, Grid2x2Icon, ListIcon, PlusIcon } from "lucide-react";
import { Button } from "../../../../shared/ui/Button";
import { SearchInput } from "../../../../shared/ui/SearchInput";
import { useState } from "react";
import type { GridLayout } from "../pages/DashboardIndex";
import { CreateModal } from "./modals/CreateModal";


interface ActionButtonsProps {
    onLayoutChange: (layout: GridLayout) => void;
    gridLayout: GridLayout;

}

export function ActionButtons({ onLayoutChange, gridLayout }: ActionButtonsProps) {

    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-wrap md:flex-nowrap gap-2">
            <Button onClick={() => setCreateModalOpen(true)} variant="primary" className="shrink-0 rounded-none!">
                <PlusIcon className="w-4 h-4" />
                Add New Path
            </Button>

            <SearchInput
                placeholder="Search Learning Path"
                className="max-w-xl"

            />

            <div className="flex gap-1">

                <Button onClick={() => setFilterModalOpen(true)} variant="secondary" className="shrink-0 rounded-none!">
                    <FilterIcon className="w-4 h-4" />
                    Filters
                </Button>

                <Button
                    onClick={() => onLayoutChange("grid")}
                    variant={gridLayout === "grid" ? "primary" : "secondary"}
                    className="w-fit! rounded-none!"
                >
                    <Grid2x2Icon className="w-4 h-4" />

                </Button>

                <Button
                    onClick={() => onLayoutChange("row")}
                    variant={gridLayout === "row" ? "primary" : "secondary"}
                    className="w-fit! rounded-none!"
                >
                    <ListIcon className="w-4 h-4" />
                </Button>

            </div>
            <CreateModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />
        </div>
    )
}
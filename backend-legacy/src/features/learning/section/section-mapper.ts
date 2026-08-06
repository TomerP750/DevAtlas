import type { ISection } from "./section-model.js";


export const toDto = (section: ISection) => {
    return {
        id: section._id.toString(),
        name: section.name,
        description: section.description,
        status: section.status,
    };
}
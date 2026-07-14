import type { UpdateSectionDto } from "./dto/UpdateSectionDto.js";
import Section, { type ISection } from "./section-model.js";


export const findById = async (id: string) => {
    return await Section.findById(id);
}

export const createSection = async (newSection: Omit<ISection, "_id" | "order">) => {
    return await Section.create(newSection);
}

export const updateById = async (id: string, updateSectionDto: UpdateSectionDto) => {
    return await Section.findByIdAndUpdate(id, updateSectionDto, { new: true });
}

export const deleteById = async (id: string) => {
    return await Section.findByIdAndDelete(id);
}

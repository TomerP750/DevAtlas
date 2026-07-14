import { Types } from "mongoose";
import { HttpError } from "../../../shared/exceptions/HttpError.js";
import type { CreateSectionDto } from "./dto/CreateSectionDto.js";
import type { UpdateSectionDto } from "./dto/UpdateSectionDto.js";
import { toDto } from "./section-mapper.js";
import type { ISection } from "./section-model.js";
import * as sectionRepository from "./section-repository.js";


export const oneSection = async (id: string) => {
    const section = await fetchSectionEntity(id);
    return toDto(section);
}

export const createSection = async (userId: string, learningPathId: string, createSectionDto: CreateSectionDto) => {

    
    const newSection: Omit<ISection, "_id" | "order"> = {
        name: createSectionDto.name,
        description: createSectionDto.description,
        status: createSectionDto.status,
        learningPathId: new Types.ObjectId(learningPathId),
    };

    await sectionRepository.createSection(newSection);

}

export const updateSection = async (userId: string, sectionId: string, learningPathId: string, updateSectionDto: UpdateSectionDto) => {

    const section = await fetchSectionEntity(sectionId);
    if (section.learningPathId.toString() !== learningPathId) {
        throw new HttpError(403, "You are not authorized to update this section");
    }

    await sectionRepository.updateById(sectionId, updateSectionDto);

}

export const deleteSection = async (userId: string, sectionId: string, learningPathId: string) => {
   
    const section = await fetchSectionEntity(sectionId);
    if (section.learningPathId.toString() !== learningPathId) {
        throw new HttpError(403, "You are not authorized to delete this section");
    }

    await sectionRepository.deleteById(sectionId);
}

const fetchSectionEntity = async (id: string) => {
    const section = await sectionRepository.findById(id);
    if (!section) {
        throw new HttpError(404, "Section not found");
    }
    return section;
}
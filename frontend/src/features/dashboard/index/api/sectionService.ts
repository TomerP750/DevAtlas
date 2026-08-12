import axios from "axios";
import { baseApiUrl } from "../../../../shared/utils/baseApi";
import type { SectionDto } from "../models/section/SectionDto";
import type { CreateSectionDto } from "../models/section/CreateSectionDto";
import type { UpdateSectionDto } from "../models/section/UpdateSectionDto";

class SectionService {

    async allSections(topicId: string): Promise<SectionDto[]> {
        return (await axios.get(`${baseApiUrl}/api/sections/topic/${topicId}`)).data;
    }

    async oneSection(sectionId: string): Promise<SectionDto> {
        return (await axios.get(`${baseApiUrl}/api/sections/${sectionId}`)).data;
    }

    async createSection(topicId: string, dto: CreateSectionDto): Promise<SectionDto> {
        return (await axios.post(`${baseApiUrl}/api/sections/create/${topicId}`, dto)).data;
    }

    async updateSection(sectionId: string, dto: UpdateSectionDto): Promise<SectionDto> {
        return (await axios.put(`${baseApiUrl}/api/sections/update/${sectionId}`, dto)).data;
    }

    async deleteSection(sectionId: string): Promise<void> {
        await axios.delete(`${baseApiUrl}/api/sections/delete/${sectionId}`);
    }

    

}

const sectionService = new SectionService();
export default sectionService;
import axios from "axios";
import { baseApiUrl } from "../../../../shared/utils/baseApi";
import type { CreateLearningPathDto } from "../models/learningPath/CreateLearningPathDto";
import type { UpdateLearningPathDto } from "../models/learningPath/UpdateLearningPathDto";
import type { LearningPathDto } from "../models/learningPath/LearningPathDto";
import type { LearningPathQueryDto } from "../models/learningPath/LearningPathQueryDto";
import type { Page } from "../../../../shared/models/Page";

class LearningPathService {

    async create(dto: CreateLearningPathDto): Promise<LearningPathDto> {
        return (await axios.post(`${baseApiUrl}/api/learning-path/create`, dto)).data;
    }

    async update(learningPathId: string, dto: UpdateLearningPathDto): Promise<LearningPathDto> {
        return (await axios.put(`${baseApiUrl}/api/learning-path/update/${learningPathId}`, dto)).data;
    }

    async delete(learningPathId: string): Promise<LearningPathDto> {
        return (await axios.delete(`${baseApiUrl}/api/learning-path/delete/${learningPathId}`)).data;
    }

    async findOne(learningPathId: string): Promise<LearningPathDto> {
        return (await axios.get(`${baseApiUrl}/api/learning-path/${learningPathId}`)).data;
    }

    async findAll(query: LearningPathQueryDto = {}): Promise<Page<LearningPathDto>> {
        return (await axios.get(`${baseApiUrl}/api/learning-path/all`,
            {
                params: query
            }
        )).data;
    }

}

const learningPathService = new LearningPathService();
export default learningPathService;

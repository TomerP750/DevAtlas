import axios from "axios";
import { baseApiUrl } from "../../../../shared/utils/baseApi";
import type { CreateLearningPathDto } from "../models/learningPath/CreateLearningPathDto";
import type { UpdateLearningPathDto } from "../models/learningPath/UpdateLearningPathDto";
import type { Pagination } from "../../../../shared/models/Pagination";

class LearningPathService {

    async createLearningPath(dto: CreateLearningPathDto) {
        return (await axios.post(`${baseApiUrl}/api/learning-path/create`, dto)).data;
    }

    async updateLearningPath(learningPathId: string, dto: UpdateLearningPathDto) {
        return (await axios.put(`${baseApiUrl}/api/learning-path/update/${learningPathId}`, dto)).data;
    }

    async deleteLearningPath(learningPathId: string) {
        return (await axios.delete(`${baseApiUrl}/api/learning-path/delete/${learningPathId}`)).data;
    }

    async oneLearningPath(learningPathId: string) {
        return (await axios.get(`${baseApiUrl}/api/learning-path/${learningPathId}`)).data;
    }

    async allLearningPaths(pagination: Pagination) {
        return (await axios.get(`${baseApiUrl}/api/learning-path/all`,
            {
                params: pagination
            }
        )).data;
    }


}

const learningPathService = new LearningPathService();
export default learningPathService;
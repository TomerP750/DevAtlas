import axios from "axios";
import { baseApiUrl } from "../../../../shared/utils/baseApi";
import type { CreateLearningPathDto } from "../models/crud_requests/CreateLearningPathDto";
import type { UpdateLearningPathDto } from "../models/crud_requests/UpdateLearningPathDto";

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


}

const learningPathService = new LearningPathService();
export default learningPathService;
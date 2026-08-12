import axios from "axios";
import { baseApiUrl } from "../../../../shared/utils/baseApi";
import type { CreateTopicDto } from "../models/topic/CreateTopicDto";
import type { TopicDto } from "../models/topic/TopicDto";
import type { UpdateTopicDto } from "../models/topic/UpdateTopicDto";

class TopicService {

    async allTopics(learningPathId: string): Promise<TopicDto[]> {
        return (await axios.get(`${baseApiUrl}/api/topics/learning-path/${learningPathId}`)).data;
    }

    async oneTopic(topicId: string): Promise<TopicDto> {
        return (await axios.get(`${baseApiUrl}/api/topics/${topicId}`)).data;
    }

    async createTopic(learningPathId: string, dto: CreateTopicDto): Promise<TopicDto> {
        return (await axios.post(`${baseApiUrl}/api/topics/${learningPathId}`, dto)).data;
    }

    async updateTopic(topicId: string, dto: UpdateTopicDto): Promise<TopicDto> {
        return (await axios.put(`${baseApiUrl}/api/topics/${topicId}`, dto)).data;
    }

    async deleteTopic(topicId: string): Promise<void> {
        await axios.delete(`${baseApiUrl}/api/topics/${topicId}`);
    }

}

const topicService = new TopicService();
export default topicService;
import axios from "axios";
import { baseApiUrl } from "../../../../shared/utils/baseApi";
import type { TopicDto } from "../models/learningPath/TopicDto";

class TopicService {

    async allTopics(learningPathId: string): Promise<TopicDto[]> {
        return (await axios.get(`${baseApiUrl}/api/topics/learning-path/${learningPathId}`)).data;
    }

    async oneTopic(topicId: string): Promise<TopicDto> {
        return (await axios.get(`${baseApiUrl}/api/topics/${topicId}`)).data;
    }

    async createTopic(dto: CreateTopicDto): Promise<TopicDto> {
        return (await axios.post(`${baseApiUrl}/api/topics`, dto)).data;
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
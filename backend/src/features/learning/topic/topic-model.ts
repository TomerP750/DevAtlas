import { Types, Schema, model } from "mongoose";
import { TopicStatus } from "./topic-status.js";

export interface ITopic {
    _id: string,
    name: string, 
    explanation: string,
    status: TopicStatus
    sectionId: Types.ObjectId,   
}

const topicSchema = new Schema<ITopic>({
    name: { 
        type: String, 
        required: true 
    },
    explanation: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: Object.values(TopicStatus), 
        required: true
    },
    sectionId: { 
        type: Schema.Types.ObjectId, 
        ref: "Section", 
        required: true 
    }
});

const Topic = model<ITopic>("Topic", topicSchema);
export default Topic;
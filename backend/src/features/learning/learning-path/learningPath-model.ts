import { Schema, Types, model } from "mongoose";

export interface ILearningPath {
    _id: Types.ObjectId;
    name: string;
    description: string;
    ImageUrl: string;
    userId: Types.ObjectId;
}

const learningPathSchema = new Schema<ILearningPath>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ImageUrl: {
        type: String,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

const LearningPath = model("LearningPath", learningPathSchema);
export default LearningPath;


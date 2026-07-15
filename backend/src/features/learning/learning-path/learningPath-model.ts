import { Schema, Types, model } from "mongoose";
import { Category } from "./Category.js";
import { Difficulty } from "./Difficulty.js";

export interface ILearningPath {
    _id: Types.ObjectId;
    name: string;
    description: string;
    category: Category;
    difficulty: Difficulty;
    ImageUrl: string;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
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
    category: {
        type: String,
        enum: Object.values(Category),
        required: true
    },
    difficulty: {
        type: String,
        enum: Object.values(Difficulty),
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
}, { timestamps: true });

const LearningPath = model("LearningPath", learningPathSchema);
export default LearningPath;


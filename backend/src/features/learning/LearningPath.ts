import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface ILearningPath {
    name: string;
    description: string;
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
});

const LearningPath = mongoose.model("LearningPath", learningPathSchema);
export default LearningPath;


import { Schema, model, Types } from "mongoose";
import { SectionStatus } from "./section-status.js";

export interface ISection {
    _id: string;
    name: string;
    description: string;
    status: SectionStatus;
    order: number;
    learningPathId: Types.ObjectId;
}

const sectionSchema = new Schema<ISection>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(SectionStatus),
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    learningPathId: {
        type: Schema.Types.ObjectId,
        ref: "LearningPath",
        required: true
    },
}, { timestamps: true });

const Section = model<ISection>("Section", sectionSchema);
export default Section;
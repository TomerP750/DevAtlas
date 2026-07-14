import { Schema, Types, model } from "mongoose";
import { Role } from "./Role.js";

export interface IUser {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatarUrl: string;
    role: Role;
}


const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        required: true,
    },

}, { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;



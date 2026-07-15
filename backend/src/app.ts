import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
import authRoutes from "./features/authentication/auth-routes.js";
import userRoutes from "./features/user/user-routes.js";
import topicRoutes from "./features/learning/topic/topic-routes.js";
import sectionRoutes from "./features/learning/section/section-routes.js";
import learningPathRoutes from "./features/learning/learning-path/learningPath-routes.js";

import { globalExceptionHandler } from "./shared/exceptions/GlobalExceptionHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/learning-paths", learningPathRoutes);

app.use(globalExceptionHandler);

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    }).catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
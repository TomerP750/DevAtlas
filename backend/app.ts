import express from "express";
import mongoose from "mongoose";
import authRoutes from "./features/authentication/auth-routes.js";
import userRoutes from "./features/user/user-routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    }).catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
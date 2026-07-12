import type { LearningPath } from "../models/LearningPath";

// Image is empty no url for image only empty string 
export const dummyData: LearningPath[] = [
    {
        id: "1",
        title: "React Development",
        description: "Master React fundamentals, hooks, state management, performance optimization, and modern frontend architecture.",
        createdAt: new Date(),
    },
    {
        id: "2",
        title: "JavaScript Fundamentals",
        description: "Learn JavaScript core concepts including ES6+, asynchronous programming, DOM manipulation, and advanced patterns.",
        createdAt: new Date(),
    },
    {
        id: "3",
        title: "Spring Boot Backend",
        description: "Build production-ready backend applications with Spring Boot, REST APIs, security, JPA, and microservices.",
        createdAt: new Date(),
    },
    {
        id: "4",
        title: "Node.js Backend",
        description: "Develop scalable server-side applications using Node.js, Express, authentication, databases, and APIs.",
        createdAt: new Date(),
    },
    {
        id: "5",
        title: "Docker & DevOps",
        description: "Understand containerization, Docker images, containers, networking, and deployment workflows.",
        createdAt: new Date(),
    },
];
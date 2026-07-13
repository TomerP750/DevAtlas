import type { LearningPath } from "../models/learningPath/LearningPathDto";

export const dummyData: LearningPath[] = [
    {
        id: "1",
        title: "React Development",
        description: "Master React fundamentals, hooks, state management, performance optimization, and modern frontend architecture.",
        completedTopicsCount: 18,
        topicsLength: 25,
        createdAt: new Date(),
    },
    {
        id: "2",
        title: "JavaScript Fundamentals",
        description: "Learn JavaScript core concepts including ES6+, asynchronous programming, DOM manipulation, and advanced patterns.",
        completedTopicsCount: 32,
        topicsLength: 40,
        createdAt: new Date(),
    },
    {
        id: "3",
        title: "Spring Boot Backend",
        description: "Build production-ready backend applications with Spring Boot, REST APIs, security, JPA, and microservices.",
        completedTopicsCount: 15,
        topicsLength: 35,
        createdAt: new Date(),
    },
    {
        id: "4",
        title: "Node.js Backend",
        description: "Develop scalable backend applications using Node.js, Express, authentication, databases, and API design.",
        completedTopicsCount: 22,
        topicsLength: 30,
        createdAt: new Date(),
    },
    {
        id: "5",
        title: "Docker & DevOps",
        description: "Understand containerization, Docker images, containers, networking, and deployment workflows.",
        completedTopicsCount: 8,
        topicsLength: 20,
        createdAt: new Date(),
    },
];
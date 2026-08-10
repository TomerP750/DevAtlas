import type { LearningPathDto } from "../models/learningPath/LearningPathDto";

export const dummyData: LearningPathDto[] = [
    {
        id: "1",
        title: "React Development",
        description: "Master React fundamentals, hooks, state management, performance optimization, and modern frontend architecture.",
        completedTopicsCount: 18,
        totalSectionsCount: 25,
        totalTopicsCount: 100,
        createdAt: new Date(),
    },
    {
        id: "2",
        title: "JavaScript Fundamentals",
        description: "Learn JavaScript core concepts including ES6+, asynchronous programming, DOM manipulation, and advanced patterns.",
        completedTopicsCount: 32,
        totalSectionsCount: 40,
        totalTopicsCount: 150,
        createdAt: new Date(),
    },
    {
        id: "3",
        title: "Spring Boot Backend",
        description: "Build production-ready backend applications with Spring Boot, REST APIs, security, JPA, and microservices.",
        completedTopicsCount: 15,
        totalSectionsCount: 35,
        totalTopicsCount: 200,
        createdAt: new Date(),
    },
    {
        id: "4",
        title: "Node.js Backend",
        description: "Develop scalable backend applications using Node.js, Express, authentication, databases, and API design.",
        completedTopicsCount: 22,
        totalSectionsCount: 30,
        totalTopicsCount: 120,
        createdAt: new Date(),
    },
    {
        id: "5",
        title: "Docker & DevOps",
        description: "Understand containerization, Docker images, containers, networking, and deployment workflows.",
        completedTopicsCount: 8,
        totalSectionsCount: 20,
        totalTopicsCount: 80,
        createdAt: new Date(),
    },
];
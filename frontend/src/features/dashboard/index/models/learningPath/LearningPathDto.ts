export interface LearningPathDto {
    id: string;
    title: string;
    description: string;
    totalSectionsCount: number;
    totalTopicsCount: number;
    completedTopicsCount: number;
    createdAt: Date;
    avatarUrl?: string;
}


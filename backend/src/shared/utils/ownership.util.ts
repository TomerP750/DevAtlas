import type { FindOptionsWhere } from 'typeorm';
import type { LearningPath } from '../../learning-path/learning-path.entity';
import type { Section } from '../../section/section.entity';
import type { Topic } from '../../topic/topic.entity';

/**
 * Returns a FindOptionsWhere object that can be used to 
 * find a learning path owned by the user
 * @param userId - The ID of the user who owns the learning path
 * @returns A FindOptionsWhere object that can be used to 
 * find a learning path owned by the user
 */
export function learningPathOwnedBy(userId: string): FindOptionsWhere<LearningPath> {
  return { user: { id: userId } };
}

export function topicOwnedBy(userId: string): FindOptionsWhere<Topic> {
  return { learningPath: learningPathOwnedBy(userId) };
}

export function sectionOwnedBy(userId: string): FindOptionsWhere<Section> {
  return { topic: topicOwnedBy(userId) };
}

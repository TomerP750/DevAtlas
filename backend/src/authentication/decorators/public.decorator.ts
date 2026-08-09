import { SetMetadata } from "@nestjs/common";

/**
 * Decorator to mark a route as public.
 * This will skip the authentication middleware for the route.
 */

export const Public = () => SetMetadata('isPublic', true);
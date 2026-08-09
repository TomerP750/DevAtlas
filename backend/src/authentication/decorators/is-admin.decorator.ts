import { SetMetadata } from "@nestjs/common";

/**
 * Decorator to mark a route as admin only.
 * Requests from users without the ADMIN role are rejected by the AdminGuard.
 */

export const IsAdmin = () => SetMetadata('isAdmin', true);

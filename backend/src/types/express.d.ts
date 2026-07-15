import type { Role } from "../features/user/Role.js";

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                role: Role;
            };
        }
    }
}

export {};

import { Role } from "./role";


export interface JwtPayload {
    sub: string;
    email: string;
    role: Role;
    type: 'access' | 'refresh';
  }
  
  declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload;
      }
    }
  }
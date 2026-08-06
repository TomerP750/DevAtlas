import jwt from "jsonwebtoken";
import type { Role } from "../user/Role.js";

export const generateToken = async (userId: string, role: Role): Promise<string> => {
    return jwt.sign(
        {
            userId, role
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1h",
            issuer: "devatlas"
        }
    );
}


export const isTokenValid = (token: string): boolean => {

    try {

        if (!process.env.JWT_SECRET) {
            return false;
        }

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                issuer: "devatlas"
            }
        );

        return true;

    } catch (error) {
        return false;
    }

}



import jwt from "jsonwebtoken";
import type { Role } from "../user/Role.js";

export const generateToken = async (userId: string, role: Role): Promise<string> => {
    return jwt.sign(
        {
            userId, role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
            issuer: "devatlas"
        }
    );
}


export const isTokenValid = async (token: string): Promise<boolean> => {

    try {

        const decoded = jwt.decode(token);
        if (!decoded) {
            return false;
        }

        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
            return false;
        }

        if (decoded.iss !== "devatlas") {
            return false;
        }

        if (decoded.exp && decoded.exp < Date.now() / 1000) {
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



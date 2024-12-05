import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string


export const createToken = (payload: any, expireTime: string) => {
    if (!payload || payload === null) return null;
    return jwt.sign(payload, JWT_SECRET, { expiresIn: expireTime });
}


export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }

}
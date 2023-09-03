import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization || "";
        const decryptedToken: any = jwt.verify(token, secret as Secret);
        if (decryptedToken) {
            req.query.userId = decryptedToken.data;
            next();
        }
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: "API failed in student middleware",
            data: null
        });
    }
}
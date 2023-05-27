import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '@helpers/token';
import { IToken } from '@auth/auth.interface';
import jwt from "jsonwebtoken"


// i chenched node modules type:
// export class JsonWebTokenError extends Error {
//     inner: Error;
//     role: string;
//     constructor(message: string, error?: Error);
// }

export const verifyUser = async (req: Request | any, res: Response, next: NextFunction): Promise<void | Response> => {
    const token = req.header("x-api-key");
    if (!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "You need to send token to this endpoint url" })
    }
    try {
        let payload: IToken | jwt.JsonWebTokenError = await verifyToken(
            token
        );
        // add to req , so the next function will recognize
        // the tokenData/payload
        // console.log("From verifyUser: " + JSON.stringify(payload));
        req.tokenData = payload;

        next();
    }
    catch (error) {
        console.log(error);
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Token invalid or expired, log in again!" })
    }
}

export const verifyAdmin = async (req: Request | any, res: Response, next: NextFunction): Promise<void | Response> => {
    const token = req.header("x-api-key");
    if (!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "You need to send token to this endpoint url" })
    }
    try {
        let payload: IToken | jwt.JsonWebTokenError = await verifyToken(
            token
        );
        // console.log("From verifyAdmin: " + JSON.stringify(payload));

        if (payload.role != "admin") {
            return res.status(401).json({ message: "Token invalid or expired, code: 3" })
        }
        // add to req , so the next function will recognize
        // the tokenData/payload
        // console.log("From middleware: " + JSON.stringify(payload));

        req.tokenData = payload;

        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Token invalid or expired, log in again!" })
    }
}




import { IToken, IUser } from "@auth/auth.interface";
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        export interface Request {
            user: IUser;
            tokenData: IToken | jwt.JsonWebTokenError | any;
            role: string;
        }
    }
}

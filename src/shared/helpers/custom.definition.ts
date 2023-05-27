import { IUser } from "@auth/auth.interface";


declare global {
    namespace Express {
        export interface Request {
            user: IUser;
            tokenData: Object;
            role: string;
        }
    }
}

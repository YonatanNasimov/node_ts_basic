import jwt from "jsonwebtoken";
import { IUser } from "@auth/auth.interface";
import { IToken } from "@auth/auth.interface";
import { config } from "@root/config";

export const createToken = (user: IUser): string => {
    return jwt.sign(
        { id: user._id, role: user.role },
        config.JWT_TOKEN as jwt.Secret,
        { expiresIn: "29d" }
    );
};

export const verifyToken = async (token: string): Promise<jwt.VerifyErrors | IToken> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            config.JWT_TOKEN as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);
                // console.log("From createToken: " + JSON.stringify(payload));
                resolve(payload as IToken);
            }
        );
    });
};
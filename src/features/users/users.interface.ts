import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    phone: string;
    img_url: string;
    role: string;
    active: boolean;
    isValidPassword(password: string): Promise<Error | boolean>;
}

export interface IToken extends Object {
    id: ObjectId;
    role: string;
    expiresIn: number;
}

export interface SignInModelInterface extends Document {
    username: string;
    email: string;
    password: string;
    phone: string;
    img_url: string;
    role: string;
    active: boolean;
    _id: string | ObjectId;
    __v: number;
}
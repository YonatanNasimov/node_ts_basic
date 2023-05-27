import { Document } from 'mongoose';

export interface IBook extends Document {
    bookName: string;
    author: string;
    img_url: string;
    user_id: string;
    published: Date;
    price: number;
}


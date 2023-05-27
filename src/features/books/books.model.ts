import { Schema, model, Model } from "mongoose";
import { IBook } from "@books/books.interface";

const bookSchema: Schema = new Schema(
    {
        bookName: { type: String },
        author: { type: String },
        user_id: { type: String },
        published: { type: Date },
        price: { type: Number },
        img_url: { type: String }
    },
    { timestamps: true }
);


const BookModel: Model<IBook> = model<IBook>("books", bookSchema);
export { BookModel };
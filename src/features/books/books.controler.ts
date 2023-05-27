import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from "express";
import { joiValidation } from "@decorators/joi-validation.decorators";
import { validBook } from "@books/books.validition";
import { BookModel } from '@books/books.model';
import { IBook } from '@books/books.interface';

class BookCtrl {
    public book(req: Request, res: Response): void {
        res.json({ message: "Books Route Work..." })
    }

    // get all Books
    public async getAllBooks(req: Request | any, res: Response): Promise<Response | void> {
        const perPage: number = Math.min(req.query.perPage, 20) || 10;
        const page: number = req.query.page || 1;
        const sort: string = req.query.sort || "_id";
        const reverse: string | any = req.query.reverse == "yes" ? -1 : 1;
        // http://localhost:5000/api/books/getallbooks?perPage=4?page=2
        try {
            const books: IBook[] = await BookModel
                .find({})
                .limit(perPage)
                .skip((page - 1) * perPage)
                .sort({ [sort]: reverse })
            res.status(HTTP_STATUS.CREATED).json({ books });
        } catch (error) {
            console.log(error);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "There Is An Error geting all the books : ", error });
        }
    }

    // post Book
    @joiValidation(validBook)
    public async createBook(req: Request | any, res: Response): Promise<Response | void> {
        try {
            const book: IBook = new BookModel(req.body);
            // console.log(req.tokenData.id);
            book.user_id = req.tokenData.id;
            await book.save();
            res.status(HTTP_STATUS.CREATED).json({ book });
        } catch (error) {
            console.log(error);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "There Is An Error creating a book: ", error });
        }
    }

    // deletebook
    @joiValidation(validBook)
    public async deleteBook(req: Request | any, res: Response): Promise<Response | void> {
        try {
            const bookId = req.params.idDel;
            let data;
            if (req.tokenData.role == "admin") {
                data = await BookModel.deleteOne({ _id: bookId })
            }
            else {
                data = await BookModel.deleteOne({ _id: bookId, user_id: req.tokenData.id })
            }
            res.status(HTTP_STATUS.GONE).json({ data });
        } catch (error) {
            console.log(error);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "There Is An Error deleting the book: ", error });
        }
    }

    // updatebook
    @joiValidation(validBook)
    public async updateBook(req: Request | any, res: Response): Promise<Response | void> {
        try {
            const bookId = req.params.idEdit;
            let data;
            if (req.tokenData.role == "admin") {
                data = await BookModel.updateOne({ _id: bookId }, req.body)
            }
            else {
                data = await BookModel.updateOne({ _id: bookId, user_id: req.tokenData.id }, req.body)
            }
            if (!data) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(HTTP_STATUS.GONE).json({ data });
        } catch (error) {
            console.log(error);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "There Is An Error updateing the book: ", error })
        }
    }
}

export const bookCtrl: BookCtrl = new BookCtrl();
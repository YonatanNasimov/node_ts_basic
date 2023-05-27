import express, { Router } from "express";
import { bookCtrl } from "@books/books.controler";
import { verifyUser } from "@middlewares/authMiddleware";

const BOOK_PATH = '/books';

class BookRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        // test
        this.router.get(`${BOOK_PATH}`, verifyUser, bookCtrl.book);
        // getallbooks
        this.router.get(`${BOOK_PATH}/getallbooks`, verifyUser, bookCtrl.getAllBooks);
        // create a book
        this.router.post(`${BOOK_PATH}/create`, verifyUser, bookCtrl.createBook);
        // delete a book by _id
        this.router.delete(`${BOOK_PATH}/delete/:idDel`, verifyUser, bookCtrl.deleteBook);
        // update a book by _id
        this.router.put(`${BOOK_PATH}/update/:idEdit`, verifyUser, bookCtrl.updateBook);

        return this.router;
    }
};

export const bookRoutes: BookRoutes = new BookRoutes();
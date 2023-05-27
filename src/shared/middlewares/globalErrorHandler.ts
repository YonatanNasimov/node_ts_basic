import  HTTP_STATUS  from 'http-status-codes';
import { Application, NextFunction, Request, Response } from "express";
import { CustomError, IErroeResponse } from '@middlewares/error-handler';

export default class GlobalErrorHandler {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public errorHandler(app: Application): void {
        app.all('*', (req: Request, res: Response) => {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} Not Found` }); //if client sent req to url who are not exist.
        });

        app.use((error: IErroeResponse, _req: Request, res: Response, next: NextFunction) => {
            console.log(error);
            if (error instanceof CustomError) {
                return res.status(error.statusCode).json(error.serializeErrors());
            }
            next();
        });
    }

}
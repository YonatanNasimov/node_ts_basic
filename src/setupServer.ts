import { Application, json, urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import { config } from '@root/config';
import RoutesInit from '@root/routes'
import 'express-async-errors'; // ES6 async/await support hack for ExpressJS
import GlobalErrorHandler from '@middlewares/globalErrorHandler';

const SERVER_PORT = 5000;

export class SetupServer {
    private app: Application; //app from the express

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routesMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }

    private securityMiddleware(app: Application): void {
        app.use(hpp()); //security modul
        app.use(helmet()); //security modul prevent attacks.
        app.use(
            cors({
                origin: config.CLIENT_URL,
                credentials: true, //to use the cookies
                optionsSuccessStatus: 200, //for most of the browsers is nurmal, but nut in Explorer browser.
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
            })
        );
    }

    private standardMiddleware(app: Application): void {
        app.use(compression()); //compress response bodies for all requests
        app.use(json({ limit: '50mb' })); //json allows us to send and get json, limit for limit the size of user req/request
        app.use(urlencoded({ extended: true, limit: '50mb' })); //recognize the incoming Request Object as strings or arrays.
    }

    //setupRoutes.
    private routesMiddleware(app: Application): void {
        RoutesInit(app);
    }

    private globalErrorHandler(app: Application): void {
        const globalErrorHandler: GlobalErrorHandler = new GlobalErrorHandler(app);
        globalErrorHandler.errorHandler(app);
    }

    private startServer(app: Application): void {
        try {
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer);
        } catch (error) {
            console.log(error);
        }
    }

    private startHttpServer(httpServer: http.Server): void {
        httpServer.listen(SERVER_PORT, () => {
            console.log(`Server is running on port ${SERVER_PORT}`);
        });
    }

}


import express, { Router } from "express";
import { usersCtrl } from "@users/users.controler";
import { verifyUser } from "@middlewares/authMiddleware";

const USERS_PATH = '/users';

class UsersRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.get(`${USERS_PATH}`, usersCtrl.users);

        this.router.get(`${USERS_PATH}/myInfo`, verifyUser, usersCtrl.myInfo);

        return this.router;
    }
};

export const usersRoutes: UsersRoutes = new UsersRoutes();
import express, { Router } from "express";
import { usersCtrl } from "@users/users.controler";

const USERS_PATH = '/users';

class UsersRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.get(`${USERS_PATH}`, usersCtrl.users);
        
        return this.router;
    }
};

export const usersRoutes: UsersRoutes = new UsersRoutes();
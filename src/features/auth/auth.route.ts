import express, { Router } from "express";
import { authCtrl } from "@auth/auth.controler";

const AUTH_PATH = '/auth';

class AuthRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        // test
        this.router.get(`${AUTH_PATH}`, authCtrl.auth);
        // signup
        this.router.post(`${AUTH_PATH}/signup`, authCtrl.signup);
        // login
        this.router.post(`${AUTH_PATH}/login`, authCtrl.login);
        return this.router;
    }
};

export const authRoutes: AuthRoutes = new AuthRoutes();
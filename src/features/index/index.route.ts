import express, { Router } from "express";
import { indexCtrl } from "@index/index.controler";

class IndexRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.get("/", indexCtrl.index);
        return this.router;
    }
};

export const indexRoutes: IndexRoutes = new IndexRoutes();
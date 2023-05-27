import { Request, Response } from "express";

class IndexCtrl {
    public index(req: Request, res: Response): void {
        res.json({ message: "Express Work..." })
    }
}

export const indexCtrl: IndexCtrl = new IndexCtrl();
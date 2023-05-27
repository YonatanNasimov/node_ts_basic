import { Request, Response } from "express";

class IndexCtrl {
    public index(req: Request, res: Response): void {
        res.json({ msg: "Express Work..." })
    }
}

export const indexCtrl: IndexCtrl = new IndexCtrl();
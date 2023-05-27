import { Request, Response } from "express";

class UsersCtrl {
    public users(req: Request, res: Response): void {
        res.json({ msg: "Users Route Work..." })
    }
}

export const usersCtrl: UsersCtrl = new UsersCtrl();
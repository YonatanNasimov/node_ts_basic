import { UserModel } from "@auth/auth.model";
import { Request, Response } from "express";

class UsersCtrl {
    public users(req: Request, res: Response): void {
        res.json({ message: "Users Route Work..." })
    }

    public async myInfo(req: Request | any, res: Response): Promise<void> {
        // console.log(req.tokenData);
        try {
            const userInfo = await UserModel
            .findById({ _id: req.tokenData.id }, { password: 0 });
            res.json(userInfo);
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: "err", err })
        }
    }
}

export const usersCtrl: UsersCtrl = new UsersCtrl();
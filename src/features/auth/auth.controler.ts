import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from "@decorators/joi-validation.decorators";
import { UserModel } from "@auth/auth.model";
import { validUser, validLogin } from "@auth/auth.validition";
import { IUser } from "@auth/auth.interface";
import { authService } from "@auth/auth.service";
import { BadRequestError } from "@middlewares/error-handler";


class AuthCtrl {
    public auth(req: Request, res: Response): void {
        res.json({ message: "Auth Work..." })
    }

    @joiValidation(validUser)
    public async signup(req: Request, res: Response): Promise<Response | void> {
        const user = new UserModel(req.body);
        const { username, email } = user;
        const checkIfUserExist: IUser = await authService.getUserByUsernameOrEmail(username, email);
        if (checkIfUserExist) {
            throw new BadRequestError('Invalid credentials: username OR email are already used.');
        }
        try {
            user.password = await bcrypt.hash(user.password, 10);
            await user.save();
            user.password = "***";
            return res.status(HTTP_STATUS.CREATED).json({"User Created: ":user});
        } catch (error) {
            console.log(error);
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "There Is An Error Signin To System: ", error })
        }
    }

    @joiValidation(validLogin)
    public async login(req: Request, res: Response): Promise<Response | void> {
        try {
            const { username, password } = req.body;
            const token = await authService.validateBodyLogin(username, password);
            res.status(HTTP_STATUS.ACCEPTED).json({ token: token });
        } catch (error) {
            console.log(error);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "There Is An Error Login To System: ", error })
        }
    }
}

export const authCtrl: AuthCtrl = new AuthCtrl();
import { IUser } from "@auth/auth.interface";
import { UserModel } from "@auth/auth.model";
import { Helpers } from "@helpers/helpers";
import { BadRequestError, NotAuthorizeError } from '@middlewares/error-handler';
import { createToken } from '@helpers/token';

class AuthService {
    //find user by his username or email.
    public async getUserByUsernameOrEmail(username: string, email: string): Promise<IUser> {
        const query = {
            $or: [{ username: Helpers.firstLetterToUpperCase(username) }, { email: Helpers.lowerCase(email) }]
        };
        const user: IUser = await UserModel.findOne(query).exec() as IUser;
        return user;
    }

    public async validateBodyLogin(username: string, passwors: string): Promise<string | Error> {
        try {
            const user = await UserModel.findOne({ username })
            if (!user) {
                throw new NotAuthorizeError("username OR password are wrong");
            }
            if (await user.isValidPassword(passwors)) {
                return createToken(user);
            } else {
                throw new NotAuthorizeError("username OR password are wrong");
            }
        } catch (error) {
            console.log(error);
            throw new BadRequestError("unable to login, try again")
        }
    }
}

export const authService: AuthService = new AuthService();
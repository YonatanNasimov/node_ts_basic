import { Schema, model, Model } from "mongoose";
import bcrypt from 'bcrypt'
import { IUser } from "@auth/auth.interface";


const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true //getting rid of white space.
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        img_url: {
            type: String
        },
        role: {
            type: String,
            default: "user"
        },
        active: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

// validate if password correct.
userSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};


const UserModel: Model<IUser> = model<IUser>("users", userSchema);
export { UserModel };
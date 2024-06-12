import { Model } from "mongoose";

export interface TUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: 'user' | 'admin';
}

export type TLogin = {
    email: string;
    password: string;
}

export interface UserModel extends Model<TUser> {
    isUserExists(email: string): Promise<TUser>;
    isPasswordMatched(plainPassword: string, hashedPassword: string,): Promise<boolean>;
}
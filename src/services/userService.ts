import {UserModel} from "../models/usersModel";
import {IRecordSet} from "mssql";
import bcrypt from "bcryptjs";

export const getAllAdminUsers = async (role: string):Promise<IRecordSet<any>> =>{
    return UserModel.getAllAdminUsers(role);
}

export const registerUser = async (userData: any): Promise<{ success: boolean; message: string }> =>{
    const {email} = userData;

    const existingUser = await UserModel.findUserByEmail(email);

    if(existingUser){
        return { success: false, message: 'Пользователь уже существует' };
    }

    return  UserModel.registerUser(userData);
}

export const loginUser = async (
    email: string,
    password: string
): Promise<{ success: boolean; user: any | null; message: string }> => {
    const user = await UserModel.findUserByEmail(email);
    if (!user) {
        return { success: false, user: null, message: 'Неверное имя пользователя или пароль' };
    }

    const isValid = await UserModel.verifyPassword(user.password, password);
    if (!isValid) {
        return { success: false, user: null, message: 'Неверный пароль' };
    }

    return { success: true, user, message: 'Вход успешен' };
};
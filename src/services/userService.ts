import {UserModel} from "../models/usersModel";
import {IRecordSet} from "mssql";

export const getAllAdminUsers = async (role: string):Promise<IRecordSet<any>> =>{
    return UserModel.getAllAdminUsers(role);
}
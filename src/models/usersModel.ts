import {sqlServer} from '../config/database';
import {IRecordSet} from "mssql";
import {getAllAdminUsers} from "../services/userService";

export class UserModel{
    static async getAllAdminUsers(role: string):Promise<IRecordSet<any>>{
        const result = await sqlServer.query`
                SELECT * 
                FROM users AS u
                WHERE u.role = ${role}
            `;
        return result.recordset;
    }
}
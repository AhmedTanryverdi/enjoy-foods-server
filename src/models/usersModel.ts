import {sqlServer} from '../config/database';
import {IRecordSet} from "mssql";
import bcrypt from 'bcryptjs';

export class UserModel{
    static async getAllAdminUsers(role: string):Promise<IRecordSet<any>>{
        const result = await sqlServer.query`
                SELECT * 
                FROM users AS u
                WHERE u.role = ${role}
            `;
        return result.recordset;
    }

    static async registerUser(userData: any): Promise<{success: boolean, message: string}>{
        const {id, firstname, lastname, patronym, birthday,email, password, role, is_active} = userData;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        try {
            await sqlServer.query`
                INSERT INTO users (id, 
                                   firstname, 
                                   lastname, 
                                   patronym, 
                                   birthday,
                                   email, 
                                   password, 
                                   role, 
                                   is_active)
                VALUES (${id},
                        ${firstname}, 
                        ${lastname}, 
                        ${patronym}, 
                        ${birthday}, 
                        ${email}, 
                        ${passwordHash}, 
                        ${role}, 
                        ${is_active})
            `;
            return {success: true, message: 'Регистрация прошла успешно'};
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message: String(err);
            return {success: false, message: `Ошибка при регистрации: ${message}`};
        }
    }

    static async findUserByEmail(email: string): Promise<any>{
        const result = await sqlServer.query`
            SELECT * FROM users WHERE email = ${email}
        `;

        return result.recordset[0] || null;
    }

    static async verifyPassword(
        storedHash: string,
        providedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(providedPassword, storedHash);
    }
}
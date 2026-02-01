import {Request, Response} from "express";
import {getAllAdminUsers, registerUser, loginUser} from "../services/userService";
import {generateToken} from "../utils/jwt";

export const getUserController = async (req: any, res: any)=>{
    try{
        // Получаем параметры из URL и query-строки
        const role = req.query.role as string;

        if (!role) {
            return res.status(400).json({
                error: 'Missing required parameters: id, firstname, lastname'
            });
        }

        const users = await getAllAdminUsers(role);

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(users);
    }catch(err: unknown) {
        const mess = err instanceof Error ? err.message: String(err);
        res.status(500).json({message: `Ошибка сервера: ${mess}`});
    }
}

export const registerController = async (req: any, res: any) => {

    try {
        const {id, firstname, lastname, patronym, birthday,email, password, role, is_active} = req.body;

        if (!id || !firstname || !lastname || !patronym || !birthday || !email || !password || !is_active) {
            return res.status(400).json({
                error: 'Required fields: id, firstname, lastname, patronym, birthday, email, password, is_active'
            });
        }


        const userdata = {id, firstname, lastname, patronym, birthday,email, password, role, is_active};
        const result = await registerUser(userdata);

        res.status(result.success ? 201 : 400).json(result);
    } catch (err: unknown) {
        const mess = err instanceof Error ? err.message : String(err);

        res.status(500).json({ message: `Ошибка сервера: ${mess}` });
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Required fields: email, password'
            });
        }

        const result = await loginUser(email, password);

        if (result.success) {
            // Генерируем JWT-токен
            const token = generateToken({
                id: result.user.id,
                firstname: result.user.firstname,
                lastname: result.user.lastname,
                email: result.user.email,
                role: result.user.role
            });

            res.json({
                message: result.message,
                user: {
                    id: result.user.id,
                    username: result.user.username,
                    email: result.user.email,
                    role: result.user.role
                },
                token: token,
                expiresIn: '1h'
            });
        } else {
            res.status(401).json({ message: result.message });
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({ message: `Ошибка сервера: ${message}` });
    }
};
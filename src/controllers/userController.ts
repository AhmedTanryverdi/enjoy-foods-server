import {getAllAdminUsers} from "../services/userService";

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
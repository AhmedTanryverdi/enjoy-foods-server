import express from 'express';
import {getUserController, registerController, loginController} from "../controllers/userController";

const router: express.Router = express.Router();

router.get('/user', getUserController);

router.post('/register', registerController);

router.post('/login', loginController);

export default router;
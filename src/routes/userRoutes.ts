import express from 'express';
import {getUserController} from "../controllers/userController";

const router: express.Router = express.Router();

router.get('/user', getUserController);

export default router;
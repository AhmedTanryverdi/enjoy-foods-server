import express from 'express';
import {connectDB} from "./config/database";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

connectDB();

app.use('/', userRoutes);

export default app;
require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/database');
const menuRoutes = require('./routes/menuRoutes');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // разрешаем запросы только с этого хоста
    credentials: true, // если используете куки/аутентификацию
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // разрешённые HTTP-методы
    allowedHeaders: ['Content-Type', 'Authorization'], // разрешённые заголовки
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Подключение к БД
connectDB();

// Маршруты
app.use('/', menuRoutes);

module.exports = app;

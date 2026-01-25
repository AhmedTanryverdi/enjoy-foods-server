require('dotenv').config();

const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DATABASE,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("Подключено к SQL Server");
    } catch (err) {
        console.error("Ошибка подключения к SQL:", err.message);
        process.exit(1); // Завершаем процесс приложения при ошибке
    }
};

module.exports = { sql, connectDB };

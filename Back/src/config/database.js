const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la conexión a TiDB Cloud
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    } : false,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para probar la conexión
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión exitosa a TiDB Cloud');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Error al conectar a TiDB Cloud:', error.message);
        return false;
    }
};

module.exports = { pool, testConnection };

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./src/config/database');
const taskRoutes = require('./src/routes/task.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: '🚀 API de Gestión de Tareas - TiDB Cloud',
        timestamp: new Date().toISOString(),
        endpoints: {
            tasks: '/api/tasks'
        }
    });
});

// Rutas de la API
app.use('/api/tasks', taskRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Iniciar el servidor y probar conexión a la base de datos
app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📝 Documentación API: http://localhost:${PORT}/`);

    // Probar conexión a TiDB Cloud
    await testConnection();
});
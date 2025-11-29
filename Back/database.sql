-- ============================================
-- Script SQL para TiDB Cloud
-- Sistema de Gestión de Tareas
-- ============================================
-- Crear la base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS tasks_db;
-- Usar la base de datos
USE tasks_db;
-- Crear la tabla de tareas
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_completed (completed),
    INDEX idx_created_at (created_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- Insertar datos de ejemplo (opcional)
INSERT INTO tasks (title, description, completed)
VALUES (
        'Configurar TiDB Cloud',
        'Crear cuenta y configurar cluster en TiDB Cloud',
        true
    ),
    (
        'Conectar backend con TiDB',
        'Configurar la conexión desde Node.js a TiDB Cloud',
        true
    ),
    (
        'Crear API REST',
        'Implementar endpoints CRUD para tareas',
        false
    ),
    (
        'Desarrollar frontend React',
        'Crear interfaz de usuario con React',
        false
    ),
    (
        'Probar la aplicación',
        'Realizar pruebas de integración completas',
        false
    );
-- Verificar que la tabla se creó correctamente
SHOW TABLES;
-- Ver la estructura de la tabla
DESCRIBE tasks;
-- Ver los datos insertados
SELECT *
FROM tasks;
const { pool } = require('../config/database');

// Modelo de Tareas
const Task = {
    // Obtener todas las tareas
    getAll: async () => {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM tasks ORDER BY created_at DESC'
            );
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // Obtener tarea por ID
    getById: async (id) => {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM tasks WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Crear nueva tarea
    create: async (taskData) => {
        try {
            const { title, description } = taskData;
            const [result] = await pool.query(
                'INSERT INTO tasks (title, description) VALUES (?, ?)',
                [title, description]
            );
            return { id: result.insertId, title, description, completed: false };
        } catch (error) {
            throw error;
        }
    },

    // Actualizar tarea
    update: async (id, taskData) => {
        try {
            const { title, description, completed } = taskData;
            await pool.query(
                'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
                [title, description, completed, id]
            );
            return { id, ...taskData };
        } catch (error) {
            throw error;
        }
    },

    // Actualizar solo el estado de completado
    toggleComplete: async (id) => {
        try {
            await pool.query(
                'UPDATE tasks SET completed = NOT completed WHERE id = ?',
                [id]
            );
            const task = await Task.getById(id);
            return task;
        } catch (error) {
            throw error;
        }
    },

    // Eliminar tarea
    delete: async (id) => {
        try {
            await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
            return { message: 'Tarea eliminada exitosamente' };
        } catch (error) {
            throw error;
        }
    },

    // Obtener tareas por estado
    getByStatus: async (completed) => {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM tasks WHERE completed = ? ORDER BY created_at DESC',
                [completed]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Task;

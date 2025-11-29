const Task = require('../models/task.model');

// Controlador de Tareas
const taskController = {
    // Obtener todas las tareas
    getAllTasks: async (req, res) => {
        try {
            const { status } = req.query;

            let tasks;
            if (status === 'completed') {
                tasks = await Task.getByStatus(true);
            } else if (status === 'pending') {
                tasks = await Task.getByStatus(false);
            } else {
                tasks = await Task.getAll();
            }

            res.json({
                success: true,
                count: tasks.length,
                data: tasks
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener las tareas',
                error: error.message
            });
        }
    },

    // Obtener tarea por ID
    getTaskById: async (req, res) => {
        try {
            const { id } = req.params;
            const task = await Task.getById(id);

            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Tarea no encontrada'
                });
            }

            res.json({
                success: true,
                data: task
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener la tarea',
                error: error.message
            });
        }
    },

    // Crear nueva tarea
    createTask: async (req, res) => {
        try {
            const { title, description } = req.body;

            // Validación básica
            if (!title || title.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'El título es requerido'
                });
            }

            const newTask = await Task.create({ title, description });

            res.status(201).json({
                success: true,
                message: 'Tarea creada exitosamente',
                data: newTask
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al crear la tarea',
                error: error.message
            });
        }
    },

    // Actualizar tarea
    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, completed } = req.body;

            const task = await Task.getById(id);
            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Tarea no encontrada'
                });
            }

            const updatedTask = await Task.update(id, {
                title: title || task.title,
                description: description !== undefined ? description : task.description,
                completed: completed !== undefined ? completed : task.completed
            });

            res.json({
                success: true,
                message: 'Tarea actualizada exitosamente',
                data: updatedTask
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar la tarea',
                error: error.message
            });
        }
    },

    // Cambiar estado de completado
    toggleTaskComplete: async (req, res) => {
        try {
            const { id } = req.params;

            const task = await Task.getById(id);
            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Tarea no encontrada'
                });
            }

            const updatedTask = await Task.toggleComplete(id);

            res.json({
                success: true,
                message: 'Estado de tarea actualizado',
                data: updatedTask
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el estado',
                error: error.message
            });
        }
    },

    // Eliminar tarea
    deleteTask: async (req, res) => {
        try {
            const { id } = req.params;

            const task = await Task.getById(id);
            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Tarea no encontrada'
                });
            }

            await Task.delete(id);

            res.json({
                success: true,
                message: 'Tarea eliminada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar la tarea',
                error: error.message
            });
        }
    }
};

module.exports = taskController;

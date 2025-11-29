const API_URL = 'http://localhost:3000/api';

export const taskService = {
    // Obtener todas las tareas
    getAllTasks: async (status = null) => {
        try {
            const url = status
                ? `${API_URL}/tasks?status=${status}`
                : `${API_URL}/tasks`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al obtener tareas');
            }

            return data.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Crear nueva tarea
    createTask: async (taskData) => {
        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al crear tarea');
            }

            return data.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Actualizar tarea
    updateTask: async (id, taskData) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al actualizar tarea');
            }

            return data.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Cambiar estado de completado
    toggleTask: async (id) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
                method: 'PATCH',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al cambiar estado');
            }

            return data.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Eliminar tarea
    deleteTask: async (id) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al eliminar tarea');
            }

            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
};

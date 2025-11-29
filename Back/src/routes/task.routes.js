const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Rutas de tareas
router.get('/', taskController.getAllTasks);           // GET /api/tasks?status=completed|pending
router.get('/:id', taskController.getTaskById);        // GET /api/tasks/:id
router.post('/', taskController.createTask);           // POST /api/tasks
router.put('/:id', taskController.updateTask);         // PUT /api/tasks/:id
router.patch('/:id/toggle', taskController.toggleTaskComplete); // PATCH /api/tasks/:id/toggle
router.delete('/:id', taskController.deleteTask);      // DELETE /api/tasks/:id

module.exports = router;

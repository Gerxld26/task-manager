const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

// Rutas CRUD
router.get('/tasks', getTasks); // Obtener todas las tareas
router.post('/tasks', createTask); // Crear una nueva tarea
router.put('/tasks/:id', updateTask); // Actualizar una tarea por ID
router.delete('/tasks/:id', deleteTask); // Eliminar una tarea por ID

module.exports = router;

const Task = require('../models/Task');

// Obtener todas las tareas
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas." });
    }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;

    console.log('Datos recibidos:', req.body); // Log para depuración

    if (!title) {
        return res.status(400).json({ message: "El título es obligatorio." });
    }

    const today = new Date();
    const selectedDate = new Date(dueDate);

    if (selectedDate < today) {
        return res.status(400).json({ message: "La fecha límite no puede ser en el pasado." });
    }

    try {
        const newTask = new Task({ title, description, status, dueDate });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error al guardar la tarea:', error); // Log del error
        res.status(500).json({ message: "Error al crear la tarea." });
    }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    // Validaciones
    if (!title) {
        return res.status(400).json({ message: "El título es obligatorio." });
    }

    const today = new Date();
    const selectedDate = new Date(dueDate);

    if (selectedDate < today) {
        return res.status(400).json({ message: "La fecha límite no puede ser en el pasado." });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, status, dueDate },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Tarea no encontrada." });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la tarea." });
    }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Tarea no encontrada." });
        }

        res.status(200).json({ message: "Tarea eliminada con éxito." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea." });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };

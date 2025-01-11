const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ['Pendiente', 'En Progreso', 'Completada'], // Asegúrate de incluir las opciones correctas
        default: 'Pendiente'
    },
    dueDate: { type: Date, required: true }
});

module.exports = mongoose.model('Task', taskSchema);

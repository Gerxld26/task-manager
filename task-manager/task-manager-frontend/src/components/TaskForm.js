import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const TaskForm = ({ closeModal, darkMode, addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pendiente');
    const [dueDate, setDueDate] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentErrors = {};
        const today = new Date();
        const selectedDate = new Date(dueDate);

        if (!title.trim()) {
            currentErrors.title = 'El título es obligatorio.';
        }

        if (selectedDate < today) {
            currentErrors.dueDate = 'La fecha límite no puede ser en el pasado.';
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/tasks', {
                title,
                description,
                status,
                dueDate,
            });
            toast.success('Tarea creada con éxito');

            // Añadir la nueva tarea al estado global
            addTask(response.data);

            // Limpiar el formulario
            setTitle('');
            setDescription('');
            setStatus('Pendiente');
            setDueDate('');
            setErrors({});
            closeModal();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al crear la tarea');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className={`max-w-md w-full mx-auto mt-10 p-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            } sm:max-w-lg md:max-w-xl`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-6 text-center">Crear Tarea</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="task-title"
                        className="block text-sm font-medium mb-1 dark:text-gray-300"
                    >
                        Título
                    </label>
                    <input
                        id="task-title"
                        type="text"
                        placeholder="Escribe el título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full p-3 border rounded-md focus:outline-none ${
                            errors.title
                                ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                                : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400'
                        }`}
                        required
                        aria-label="Título de la tarea"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>
                <div>
                    <label
                        htmlFor="task-description"
                        className="block text-sm font-medium mb-1 dark:text-gray-300"
                    >
                        Descripción
                    </label>
                    <textarea
                        id="task-description"
                        placeholder="Escribe la descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                        rows={3}
                        aria-label="Descripción de la tarea"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="task-status"
                            className="block text-sm font-medium mb-1 dark:text-gray-300"
                        >
                            Estado
                        </label>
                        <select
                            id="task-status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-3 border rounded-md focus:outline-none border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 appearance-none bg-transparent"
                            aria-label="Estado de la tarea"
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="En Progreso">En Progreso</option>
                            <option value="Completada">Completada</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="task-dueDate"
                            className="block text-sm font-medium mb-1 dark:text-gray-300"
                        >
                            Fecha Límite
                        </label>
                        <input
                            id="task-dueDate"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className={`w-full p-3 border rounded-md focus:outline-none ${
                                errors.dueDate
                                    ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                                    : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400'
                            }`}
                            required
                            aria-label="Fecha límite de la tarea"
                        />
                        {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-200 w-full sm:w-auto"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className={`py-2 px-4 rounded-md focus:outline-none transition duration-200 w-full sm:w-auto ${
                            loading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar Tarea'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default TaskForm;

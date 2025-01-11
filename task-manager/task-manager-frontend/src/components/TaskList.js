import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon } from '@heroicons/react/solid';
import { AnimatePresence } from 'framer-motion';

const TaskList = ({ darkMode }) => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 4; // Número de tareas por página
    const [confirmDelete, setConfirmDelete] = useState({ show: false, taskId: null });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al cargar las tareas');
        }
    };

    const confirmDeletion = (taskId) => {
        setConfirmDelete({ show: true, taskId });
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            toast.success('Tarea eliminada con éxito');
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al eliminar la tarea');
        } finally {
            setConfirmDelete({ show: false, taskId: null });
        }
    };

    const cancelDeletion = () => {
        setConfirmDelete({ show: false, taskId: null });
    };

    // Paginación
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div
            className={`max-w-4xl mx-auto mt-10 pb-20 ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
            }`}
        >
            <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Lista de Tareas
            </h2>
            <ToastContainer />
            {tasks.length === 0 ? (
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    No hay tareas disponibles
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Quitamos AnimatePresence para evitar saltos */}
                        {currentTasks.map((task) => (
                            <div
                                key={task._id}
                                className={`p-4 shadow rounded flex justify-between items-start border ${
                                    darkMode
                                        ? 'bg-gray-800 border-gray-700 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                }`}
                            >
                                <div>
                                    <h3 className="text-xl font-bold">{task.title}</h3>
                                    <p>{task.description || 'Sin descripción'}</p>
                                    <p className="text-sm">Estado: {task.status}</p>
                                    <p className="text-sm">
                                        Fecha límite: {new Date(task.dueDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => confirmDeletion(task._id)}
                                    className={`${
                                        darkMode
                                            ? 'text-red-400 hover:text-red-500'
                                            : 'text-red-600 hover:text-red-800'
                                    }`}
                                    aria-label={`Eliminar tarea ${task.title}`}
                                >
                                    <TrashIcon className="h-6 w-6" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Controles de paginación */}
                    <div className="flex justify-center mt-10">
                        {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, i) => i + 1).map(
                            (number) => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`mx-1 px-4 py-2 rounded ${
                                        number === currentPage
                                            ? darkMode
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-blue-400 text-white'
                                            : darkMode
                                            ? 'bg-gray-700 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {number}
                                </button>
                            )
                        )}
                    </div>
                </>
            )}

            {confirmDelete.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        className={`p-6 rounded shadow-lg text-center ${
                            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                        }`}
                    >
                        <p className="mb-4">¿Estás seguro de que deseas eliminar esta tarea?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={cancelDeletion}
                                className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => deleteTask(confirmDelete.taskId)}
                                className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;

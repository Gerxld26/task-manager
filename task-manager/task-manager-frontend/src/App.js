import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import Modal from 'react-modal';
import axios from 'axios';

// Configurar react-modal
Modal.setAppElement('#root');

const App = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Recuperar el estado inicial desde localStorage
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    // Obtener las tareas al inicio
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    };

    const addTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    };

    // Aplicar o eliminar la clase 'dark' al <html>
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Guardar la preferencia en localStorage
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div
            className={`flex flex-col min-h-screen ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
            }`}
        >
            <Router>
                <Navbar toggleTheme={toggleDarkMode} darkMode={darkMode} openModal={openModal} />
                <main className="flex-grow container mx-auto p-6">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <TaskList
                                    darkMode={darkMode}
                                    tasks={tasks}
                                    deleteTask={deleteTask}
                                />
                            }
                        />
                    </Routes>
                </main>
                <Footer />
            </Router>

            {/* Modal para crear tarea */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className={`max-w-lg mx-auto p-6 rounded shadow-md relative ${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                }`}
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <TaskForm
                    closeModal={closeModal}
                    darkMode={darkMode}
                    addTask={addTask} // Pasar la función para agregar la tarea
                />
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                >
                    &times;
                </button>
            </Modal>
        </div>
    );
};

export default App;

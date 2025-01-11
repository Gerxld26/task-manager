import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ toggleTheme, darkMode, openModal }) => {
    return (
        <nav className="bg-blue-600 dark:bg-gray-800 text-white shadow p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Título */}
                <Link to="/" className="text-xl font-bold">
                    Gestor de Tareas
                </Link>

                {/* Enlaces e Ícono */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="hover:underline">
                        Inicio
                    </Link>
                    {/* Botón para abrir el modal de "Crear Tarea" */}
                    <button
                        onClick={openModal}
                        className="hover:underline focus:outline-none"
                    >
                        Crear Tarea
                    </button>

                    {/* Botón del Modo Oscuro/Claro */}
                    <button
                        onClick={toggleTheme}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-md ${
                            darkMode
                                ? 'bg-white text-gray-800 hover:bg-gray-200'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                        aria-label="Cambiar tema"
                    >
                        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
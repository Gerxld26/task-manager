import React from 'react';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer
            className="bg-gray-800 text-white p-6 mt-10"
            style={{ position: 'relative', bottom: 0, width: '100%' }}
        >
            <div className="container mx-auto text-center space-y-4">
                <p>&copy; 2025 - Creado por Gerald. Todos los derechos reservados.</p>
                <div className="flex justify-center items-center space-x-4">
                    <a
                        href="mailto:atuncarfloresg@gmail.com"
                        className="flex items-center text-blue-400 hover:underline"
                    >
                        <FaEnvelope className="mr-2" />
                        atuncarfloresg@gmail.com
                    </a>
                </div>
                <div className="flex justify-center items-center space-x-4">
                    <a
                        href="https://wa.me/51982678627?text=Hola%20Gerald,%20quiero%20consultar%20sobre%20tus%20servicios."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-green-400 hover:underline"
                    >
                        <FaWhatsapp className="mr-2" />
                        Escríbeme por WhatsApp
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

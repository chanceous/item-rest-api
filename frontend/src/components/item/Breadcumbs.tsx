import React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumbs: React.FC = () => {
    return (
        <div className="hidden md:flex items-center text-sm mb-6">
            <Link to="/" className="text-meli-blue hover:underline">
                Volver al listado
            </Link>

            <span className="mx-4 text-gray-300">|</span>

            Productos
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-gray-500">Ofertas Pago Chris</span>
        </div>
    );
};
import React, {useState} from 'react';
import { useItems } from '../hooks/useItems';
import { Loader } from '../components/Loader';
import { ItemsCard } from '../components/items/ItemsCard';
import {InfoModal} from "../components/ui/InfoModal.tsx";

const getGreeting = (): string => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 13) {
        return 'Buen día';
    }
    if (currentHour >= 13 && currentHour < 20) {
        return 'Buenas tardes';
    }
    return 'Buenas noches';
};

export const HomePage: React.FC = () => {
    const { items, loading, error } = useItems();
    const greeting = getGreeting();
    const [isNotesModalOpen, setNotesModalOpen] = useState(false);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center p-10 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
                    <h1 className="text-xl font-bold text-red-600 mb-4">
                        Error al cargar productos
                    </h1>
                    <p className="text-meli-gray">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4">
                <div className="w-full h-40 sm:h-64 bg-gradient-to-r from-meli-yellow to-yellow-300 rounded-lg mb-6 sm:mb-8 flex items-center justify-center p-4">
                    <div className="text-center">
                        <h1 className="text-2xl sm:text-4xl text-meli-dark font-bold">
                            {greeting}, ¡descubrí las mejores ofertas para vos!
                        </h1>
                        <button
                            onClick={() => setNotesModalOpen(true)}
                            className="mt-4 bg-meli-blue text-white font-semibold py-2 px-5 rounded-md hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            Leer notas de Chris
                        </button>
                    </div>
                </div>

                <main>
                    <div className="border-b border-gray-200 pb-4 mb-6">
                        <h1 className="text-3xl font-semibold text-meli-dark">
                            Ofertas de verdad
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">{items.length} productos</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map((item) => (
                            <ItemsCard key={item.id} item={item} />
                        ))}
                    </div>
                </main>
            </div>

            <InfoModal
                isOpen={isNotesModalOpen}
                onClose={() => setNotesModalOpen(false)}
                title="Notas de Chris"
            >
                <div className="space-y-4 text-gray-700">
                    <p>
                        {greeting}, gracias por revisar mi challenge. Dejo 2 puntos importantes sobre lo que hice:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                        <li>
                            <span className="font-semibold">Casos de publicaciones:</span> Para que puedan realizar pruebas variadas, preparé distintas publicaciones con casos diversos: algunas tienen varias fotos, otras solo una; algunas incluyen envío gratis, otras no; también hay publicaciones sin stock, entre otros escenarios.
                        </li>
                        <li>
                            <span className="font-semibold">IA Integrada con Groq:</span>{' '}
                            "Preguntas" en la página del producto utiliza un LLM llamado Groq para responder como si fuera el vendedor, parsea y envia los datos en el backend haciendo el pasamanos por el frontend.
                        </li>
                    </ul>
                    <p>
                        Nuevamente gracias y ante cualquier duda me avisan.
                    </p>
                </div>
            </InfoModal>
        </>
    );
};
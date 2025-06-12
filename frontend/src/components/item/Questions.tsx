import React, { useState } from 'react';
import { aiApi } from '../../api/ai';
import { Item } from "../../types/item.ts";
import {
    SendIcon,
    SparklesIcon,
    ThumbsUpIcon,
    ThumbsDownIcon,
    CornerDownRightIcon,
} from '../icons';

interface QuestionProps {
    item: Item;
}

export const Questions: React.FC<QuestionProps> = ({ item }) => {
    const [question, setQuestion] = useState('');

    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        setIsLoading(true);
        setAiResponse(null);
        setError(null);

        try {
            const data = await aiApi.askQuestion(question, item);
            setAiResponse(data.data.message);
        } catch (err) {
            setError(
                'Hubo un problema interno. Por favor, intenta de nuevo.',
            );
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pb-8">
            <div className="py-6">
                <h3 className="text-lg font-semibold mb-3">¿Qué querés saber?</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {[
                        'Costo y tiempo de envío',
                        'Devoluciones gratis',
                        'Medios de pago y promociones',
                        'Garantía',
                    ].map((text) => (
                        <button
                            key={text}
                            className="bg-blue-50 text-meli-blue text-sm px-4 py-1.5 rounded-md hover:bg-blue-100"
                        >
                            {text}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="flex items-start gap-4">
          <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full h-12 p-2 border border-gray-300 rounded-md focus:ring-meli-blue focus:border-meli-blue resize-none text-sm mt-4"
              placeholder="Escribí tu pregunta..."
          />
                    <button
                        type="submit"
                        disabled={isLoading || !question.trim()}
                        className="flex items-center justify-center bg-meli-blue text-white font-semibold px-6 py-3 rounded-md h-12 hover:bg-blue-600 disabled:bg-blue-300 transition-colors mt-4"
                    >
                        <SendIcon className="h-5 w-5 mr-2" /> Preguntar
                    </button>
                </form>

                {(isLoading || aiResponse || error) && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        {isLoading && (
                            <p className="text-sm text-gray-600 animate-pulse">
                                Respondiendo...
                            </p>
                        )}
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        {aiResponse && (
                            <div>
                                <p className="text-sm text-gray-800">{aiResponse}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-3">
                                    <SparklesIcon className="h-4 w-4 mr-2 text-meli-blue" />
                                    <span>Respondido por Inteligencia Artificial</span>
                                </div>
                                <div className="flex justify-between items-center mt-4 border-t pt-3">
                                    <div className="flex gap-2">
                                        <button
                                            className="p-1 rounded-full hover:bg-gray-200"
                                            title="Útil"
                                        >
                                            <ThumbsUpIcon className="h-5 w-5 text-gray-500" />
                                        </button>
                                        <button
                                            className="p-1 rounded-full hover:bg-gray-200"
                                            title="No útil"
                                        >
                                            <ThumbsDownIcon className="h-5 w-5 text-gray-500" />
                                        </button>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-sm text-meli-blue hover:underline"
                                    >
                                        Prefiero preguntarle al vendedor
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Última realizada</h3>
                <div className="text-sm">
                    <p className="text-gray-800">Hola tenes stock?</p>
                    <div className="flex mt-3">
                        <CornerDownRightIcon className="h-5 w-5 text-gray-400" />
                        <div className="ml-2">
                            <p className="text-gray-600">
                                Hola, ¿Como estas?, Si, tenemos stock compra tranquilo loco.
                            </p>
                            <p className="text-xs text-gray-400 mt-1">21/05/2025</p>
                        </div>
                    </div>
                </div>
            </div>

            <a
                href="#"
                className="text-meli-blue text-sm font-semibold mt-4 inline-block hover:underline"
            >
                Ver todas las preguntas
            </a>
        </div>
    );
};
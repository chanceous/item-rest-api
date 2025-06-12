import { Item } from '../types/item';
import { API_BASE_URL } from "../config.ts";

interface AiQuestionResponse {
    data: {
        message: string;
    }
}
export const aiApi = {
    askQuestion: async (question: string, item: Item): Promise<AiQuestionResponse> => {
        const response = await fetch(`${API_BASE_URL}/ai/questions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, itemId: item.id }),
        });
        if (!response.ok) {
            throw new Error('No se pudo obtener una respuesta.');
        }
        return response.json();
    },
};
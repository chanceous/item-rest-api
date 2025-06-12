import { Item } from '../types/item';
import { API_BASE_URL } from "../config.ts";

interface ApiResponse {
    statusCode: number;
    data: Item;
}

interface ApiListResponse {
    statusCode: number;
    data: Item[];
}

export const itemApi = {
    getById: async (id: string): Promise<Item> => {
        const response = await fetch(`${API_BASE_URL}/items/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener el producto');
        }

        const result: ApiResponse = await response.json();
        return result.data;
    },

    getAll: async (): Promise<Item[]> => {
        const response = await fetch(`${API_BASE_URL}/items`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener los productos');
        }
        const result: ApiListResponse = await response.json();
        return result.data;
    },
};
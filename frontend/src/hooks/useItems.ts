import { useState, useEffect } from 'react';
import { itemApi } from '../api/items';
import { Item } from '../types/item';

export const useItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedItems = await itemApi.getAll();
                setItems(fetchedItems);
            } catch (err: any) {
                setError(err.message || 'No se pudieron cargar los productos.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return { items, loading, error };
};
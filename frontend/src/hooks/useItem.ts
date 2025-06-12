import { useState, useEffect } from 'react';
import { itemApi } from '../api/items';
import { parseItemIdFromSlug } from '../utils/slug';
import { Item } from '../types/item';

export const useItem = (slug: string | undefined) => {
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) {
            setError('No se especificó un producto.');
            setLoading(false);
            return;
        }

        const fetchItem = async () => {
            setLoading(true);
            setError(null);
            try {
                const itemId = parseItemIdFromSlug(slug);
                const fetchedItem = await itemApi.getById(itemId);
                setItem(fetchedItem);
            } catch (err: any) {
                setError(err.message || 'No se pudo cargar el producto.');
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [slug]);

    return { item, loading, error };
};
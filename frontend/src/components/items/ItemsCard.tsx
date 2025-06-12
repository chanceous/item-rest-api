import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../types/item';
import { createSlug } from '../../utils/slug';

interface ItemsCardProps {
    item: Item;
}

export const ItemsCard: React.FC<ItemsCardProps> = ({ item }) => {
    const slug = createSlug(item.title);

    const cardContent = (
        <>
            <div className="border-b border-gray-200 p-4">
                <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-contain bg-white"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-2xl font-light mb-2">
                    {item.formattedPrice.replace('ARS', '$')}
                </p>
                <h3 className="text-sm text-gray-600 leading-tight mb-2">
                    {item.title}
                </h3>
                <div className="mt-auto">
                    {item.shipping.free && (
                        <p className="text-meli-green font-semibold text-sm">Envío gratis</p>
                    )}
                </div>
            </div>
        </>
    );

    return (
        <Link
            to={`/items/${item.id}-${slug}`}
            className="flex flex-col bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow duration-200 no-underline text-gray-800 h-full relative"
        >
            <div className={!item.isAvailable ? 'opacity-40' : ''}>
                {cardContent}
            </div>

            {!item.isAvailable && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center p-4 rounded-md">
          <span className="text-gray-800 font-semibold bg-gray-200/90 px-4 py-2 rounded-md text-center shadow">
            Publicación pausada
          </span>
                </div>
            )}
        </Link>
    );
};
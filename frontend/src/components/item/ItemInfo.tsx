import React from 'react';
import { Item } from '../../types/item';
import { StarRating } from '../ui/StarRating';
import { PromotionTag } from '../ui/PromotionTag.tsx';
import { usePaymentMethodModal } from '../../hooks/context/ItemContext';
import { HeartIcon } from '../icons';

interface ItemInfoProps {
    item: Item;
}

export const ItemInfo: React.FC<ItemInfoProps> = ({ item }) => {
    const { openModal } = usePaymentMethodModal();

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <p className="text-sm text-meli-lightgray">
                        {item.condition === 'new' ? 'Nuevo' : 'Usado'} | {item.reviewsCount}{' '}
                        vendidos
                    </p>
                    <div className="md:hidden right-6 absolute">
                        {item.rating && item.reviewsCount && (
                            <StarRating rating={item.rating} reviewCount={item.reviewsCount} />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-start mt-2">
                <h1 className="text-lg md:text-2xl font-normal md:font-semibold text-meli-dark pr-4 leading-[1.18] md:leading-[1.18]">
                    {item.title}
                </h1>
                <div className="md:hidden">
                    <HeartIcon className="h-5 w-5 text-meli-blue" />
                </div>
            </div>

            <div className="hidden md:flex">
                {item.rating && item.reviewsCount && (
                    <StarRating rating={item.rating} reviewCount={item.reviewsCount} />
                )}
            </div>

            <div className="hidden md:block">
                <p className="text-4xl font-light text-meli-dark mt-4">
                    {item.formattedPrice.replace('ARS', '$')}
                </p>
                <p className="text-meli-dark">
                    en{' '}
                    <span className="text-meli-green">
            10 cuotas de ${' '}
                        {(item.price / 10).toLocaleString('es-AR', {
                            minimumFractionDigits: 2,
                        })}{' '}
                        sin interés
          </span>
                </p>
                <p className="font-light text-meli-lightgray text-xs">
                    Precio sin impuestos nacionales: ${' '}
                    {(item.price / 1.21).toLocaleString('es-AR', {
                        minimumFractionDigits: 2,
                    })}
                </p>
                <div className="mt-1">
                    <PromotionTag text="10% OFF pagando con PagoChris" />
                </div>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        openModal();
                    }}
                    className="text-sm text-meli-blue hover:underline mt-2 block"
                >
                    Ver medios de pago y promociones
                </a>
            </div>
        </div>
    );
};
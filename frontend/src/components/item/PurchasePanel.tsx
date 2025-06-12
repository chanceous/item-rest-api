import React from 'react';
import { Item } from '../../types/item';
import { PromotionTag } from '../ui/PromotionTag.tsx';
import { usePaymentMethodModal } from '../../hooks/context/ItemContext.tsx';
import {
    TruckIcon,
    ReturnIcon,
    ShieldCheckIcon,
    WarrantyIcon,
    ChevronRightIcon,
} from '../icons';

interface PurchasePanelProps {
    item: Item;
}

export const PurchasePanel: React.FC<PurchasePanelProps> = ({ item }) => {
    const { openModal } = usePaymentMethodModal();
    return (
        <div className="border border-gray-200 rounded-lg p-4 h-fit max-w-sm mx-auto">
            <div className="flex flex-col">
                <div className="block md:hidden mb-3">
                    <p className="text-4xl font-light text-meli-dark">
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

                <div className="flex items-start mb-4">
                    <TruckIcon className="h-5 w-5 mr-3 text-meli-green" />
                    <div>
                        <p className="text-meli-green text-sm">
                            {item.shipping.free
                                ? 'Envío gratis a todo el país'
                                : `Costo de envío: $${item.shipping.cost}`}
                        </p>
                        <p className="text-sm text-meli-lightgray">
                            Llega en {item.shipping.estimatedDays} días
                        </p>
                    </div>
                </div>

                <p className="text-base font-semibold text-meli-dark">
                    Stock disponible
                </p>
                <div className="flex items-center text-sm text-gray-800 mt-2">
                    <span className="font-semibold">Cantidad: 1 unidad</span>
                    <select className="ml-2 border-none focus:ring-0 p-0 text-meli-blue font-semibold">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <span className="text-gray-500 ml-2">
            ({item.stock > 50 ? '+50' : item.stock} disponibles)
          </span>
                </div>

                <div className="mt-4 space-y-2">
                    <button className="w-full bg-meli-blue text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors text-base">
                        Comprar ahora
                    </button>
                    <button className="w-full bg-blue-100 text-meli-blue py-3 rounded-md font-semibold hover:bg-blue-200 transition-colors text-base">
                        Agregar al carrito
                    </button>
                </div>

                <div className="pt-4 space-y-4 text-sm">
                    <div className="flex items-start">
                        <ReturnIcon className="h-5 w-5 mr-3 text-gray-500 shrink-0" />
                        <p className="text-gray-600">
                            <a href="#" className="text-meli-blue hover:underline">
                                Devolución gratis.
                            </a>{' '}
                            Tenés 30 días desde que lo recibís.
                        </p>
                    </div>

                    <div className="flex items-start">
                        <ShieldCheckIcon className="h-4 w-4 mr-3 mt-1 text-gray-500 shrink-0" />
                        <p className="text-gray-600">
                            <a href="#" className="text-meli-blue hover:underline">
                                Compra Protegida
                            </a>
                            , recibí el producto que esperabas o te devolvemos tu dinero.
                        </p>
                    </div>

                    <div className="flex items-start">
                        <WarrantyIcon className="h-4 w-4 mr-3 mt-0.5 text-gray-500 shrink-0" />
                        <p className="text-gray-600">12 meses de garantía de fábrica.</p>
                    </div>
                </div>
                <a
                    href="#"
                    className="flex items-center justify-between w-full mt-4 text-meli-blue border border-gray-200 rounded-md p-3 hover:bg-gray-50"
                >
                    <span className="font-semibold">Agregar a una lista</span>
                    <ChevronRightIcon className="h-5 w-5" />
                </a>
            </div>
        </div>
    );
};
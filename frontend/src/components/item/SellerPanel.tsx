import React from 'react';
import { Item } from '../../types/item';
import { CheckCircleIcon, ChatBubbleIcon, ClockIcon } from '../icons';

interface SellerPanelProps {
    item: Item;
}

export const SellerPanel: React.FC<SellerPanelProps> = ({ item }) => {
    const sellerMockData = {
        logoUrl: 'https://thispersondoesnotexist.com/',
        bannerUrl: 'https://picsum.photos/seed/picsum/200/300',
        productCount: 1,
        reviewsCountCompleted: '+10mil',
    };

    return (
        <div className="border border-gray-200 rounded-lg bg-white max-w-sm mx-auto relative">
            <div className="h-20 bg-gray-800 rounded-t-lg">
                <img
                    src={sellerMockData.bannerUrl}
                    alt="Banner del vendedor"
                    className="h-full w-full object-cover rounded-t-lg"
                />
            </div>

            <div className="relative px-4 pb-4">
                <div className="absolute -top-8 left-4">
                    <img
                        src={sellerMockData.logoUrl}
                        alt="Logo del vendedor"
                        className="h-16 w-16 rounded-md bg-white border p-1 shadow"
                    />
                </div>

                <div className="pt-10">
                    <h2 className="text-xl font-bold">{item.seller.name}</h2>
                    <div className="flex items-center text-sm text-gray-600">
                        <CheckCircleIcon className="h-5 w-5 mr-1 text-meli-blue" />
                        <span>Tienda oficial de Mercado Libre</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                        +{sellerMockData.productCount} Producto
                    </p>
                </div>

                <div className="flex w-full my-4 h-2 rounded-full overflow-hidden">
                    <div className="w-1/5 bg-pink-200"></div>
                    <div className="w-1/5 bg-yellow-200"></div>
                    <div className="w-1/5 bg-yellow-300"></div>
                    <div className="w-1/5 bg-green-200"></div>
                    <div className="w-1/5 bg-meli-green"></div>
                </div>

                <div className="flex justify-around text-center border-b border-gray-200 pb-4">
                    <div className="flex flex-col items-center w-1/3">
                        <p className="text-lg font-semibold">
                            {sellerMockData.reviewsCountCompleted}
                        </p>
                        <p className="text-xs text-gray-500 leading-tight">
                            Ventas concretadas
                        </p>
                    </div>
                    <div className="flex flex-col items-center w-1/3 px-2">
                        <ChatBubbleIcon className="h-6 w-6 text-gray-500 mb-1" />
                        <p className="text-xs text-gray-500 leading-tight">
                            Brinda buena atención
                        </p>
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                        <ClockIcon className="h-6 w-6 text-gray-500 mb-1" />
                        <p className="text-xs text-gray-500 leading-tight">
                            Despacha sus productos a tiempo
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-4 pb-4">
                <a
                    href="#"
                    className="flex items-center justify-center w-full text-meli-blue bg-blue-100 rounded-md py-2.5 font-semibold hover:bg-blue-200 transition-colors"
                >
                    Ir a la Tienda oficial
                </a>
            </div>
        </div>
    );
};
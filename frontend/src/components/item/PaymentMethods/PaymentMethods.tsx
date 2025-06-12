import React from 'react';
import { Item } from '../../../types/item';

interface PaymentMethodsProps {
    item: Item;
}

const logoDataMap: {
    [key: string]: { src: string; alt: string; className: string };
} = {
    mercadopago: {
        src: '/img/mercadopago.svg',
        alt: 'Mercado Pago',
        className: 'h-7',
    },
    visa: { src: '/img/visa.svg', alt: 'Visa', className: 'h-4' },
    mastercard: {
        src: '/img/mastercard.svg',
        alt: 'Mastercard',
        className: 'h-6',
    },
    amex: { src: '/img/amex.svg', alt: 'American Express', className: 'h-6' },
    naranja: { src: '/img/naranjax.svg', alt: 'Naranja X', className: 'h-5' },
    visadebit: {
        src: '/img/visadebit.svg',
        alt: 'Visa Débito',
        className: 'h-4',
    },
    maestro: { src: '/img/maestro.svg', alt: 'Maestro', className: 'h-6' },
    cabaldebit: {
        src: '/img/cabal.svg',
        alt: 'Cabal Débito',
        className: 'h-5',
    },
    mastercarddebit: {
        src: '/img/mastercarddebit.svg',
        alt: 'Mastercard Débito',
        className: 'h-6',
    },
    pagofacil: {
        src: '/img/pagofacil.svg',
        alt: 'Pago Fácil',
        className: 'h-8',
    },
    rapipago: { src: '/img/rapipago.svg', alt: 'Rapipago', className: 'h-6' },
};

const sectionTitles: { [key: string]: string } = {
    credit_card: 'Tarjetas de crédito',
    debit_card: 'Tarjetas de débito',
    bank_transfer: 'Cuotas sin Tarjeta',
    cash: 'Efectivo',
};

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ item }) => {
    const groupedMethods = item.paymentMethods.reduce(
        (acc, method) => {
            const type = method.type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(method);
            return acc;
        },
        {} as { [key: string]: typeof item.paymentMethods },
    );

    return (
        <>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Medios de pago</h3>
            <div className="space-y-6">
                {Object.entries(groupedMethods).map(([type, methods]) => {
                    const title = sectionTitles[type];
                    if (!title) return null;

                    return (
                        <div key={type}>
                            <h4 className="font-semibold text-gray-700 mb-4">{title}</h4>
                            <div className="flex items-center flex-wrap gap-x-6 gap-y-4">
                                {methods.map((method) => {
                                    const logoData = logoDataMap[method.id];
                                    return logoData ? (
                                        <img
                                            key={method.id}
                                            src={logoData.src}
                                            alt={logoData.alt}
                                            className={logoData.className}
                                        />
                                    ) : null;
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
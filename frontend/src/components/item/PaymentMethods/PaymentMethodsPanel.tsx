import React from 'react';
import { Item } from '../../../types/item';
import { PaymentMethods } from './PaymentMethods';

interface PaymentMethodsPanelProps {
    item: Item;
}

export const PaymentMethodsPanel: React.FC<PaymentMethodsPanelProps> = ({
                                                                            item,
                                                                        }) => {
    return (
        <div className="border border-gray-200 rounded-lg bg-white p-6 max-w-sm mx-auto">
            <PaymentMethods item={item} />
        </div>
    );
};
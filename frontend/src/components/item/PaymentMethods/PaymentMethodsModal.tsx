import React from 'react';
import { Item } from '../../../types/item';
import { PaymentMethods } from './PaymentMethods';
import { CloseIcon } from '../../icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: Item;
}

export const PaymentMethodsModal: React.FC<ModalProps> = ({
                                                              isOpen,
                                                              onClose,
                                                              item,
                                                          }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-6 relative w-full max-w-lg mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200"
                    aria-label="Cerrar modal"
                >
                    <CloseIcon className="h-6 w-6 text-gray-500" />
                </button>

                <PaymentMethods item={item} />
            </div>
        </div>
    );
};
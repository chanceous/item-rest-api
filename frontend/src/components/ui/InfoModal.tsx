import React, { ReactNode } from 'react';
import { CloseIcon } from '../icons';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export const InfoModal: React.FC<InfoModalProps> = ({
                                                        isOpen,
                                                        onClose,
                                                        title,
                                                        children,
                                                    }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-6 relative w-full max-w-lg mx-auto shadow-xl animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label="Cerrar modal"
                    >
                        <CloseIcon className="h-6 w-6 text-gray-500" />
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};
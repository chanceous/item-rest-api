import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const ItemContext = createContext<ModalContextType | undefined>(undefined);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({
                                                                    children,
                                                                }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ItemContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </ItemContext.Provider>
    );
};

export const usePaymentMethodModal = () => {
    const context = useContext(ItemContext);
    if (context === undefined) {
        throw new Error('useItem must be used within a ItemProvider');
    }
    return context;
};
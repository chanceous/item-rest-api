import React from 'react';
import { useParams } from 'react-router-dom';
import { useItem } from '../hooks/useItem';
import { Loader } from '../components/Loader';
import { ImageGallery } from '../components/item/ImageGallery';
import { PurchasePanel } from '../components/item/PurchasePanel';
import { ItemInfo } from '../components/item/ItemInfo.tsx';
import { Breadcrumbs } from '../components/item/Breadcumbs';
import { SellerPanel } from '../components/item/SellerPanel';
import { Reviews } from '../components/item/Reviews';
import { Questions } from '../components/item/Questions';
import { PaymentMethodsModal } from '../components/item/PaymentMethods/PaymentMethodsModal';
import {
    ItemProvider,
    usePaymentMethodModal,
} from '../hooks/context/ItemContext';
import { PaymentMethodsPanel } from '../components/item/PaymentMethods/PaymentMethodsPanel.tsx';
import { UnavailableProduct } from '../components/item/UnavailableProduct.tsx';

const PageContent: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { item, loading, error } = useItem(slug);
    const { isModalOpen, closeModal } = usePaymentMethodModal();

    if (loading) return <Loader />;
    if (error || !item)
        return (
            <UnavailableProduct
                title="Ooops"
                description={error}
                buttonText="Volver al inicio"
            />
        );

    return (
        <>
            <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
                    <div className="md:col-span-7">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            <div className="md:col-span-3 order-2 md:order-none">
                                <ImageGallery images={item.images} altText={item.title} />
                            </div>
                            <div className="md:col-span-2 order-1 md:order-none">
                                <ItemInfo item={item} />
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <PurchasePanel item={item} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
                    <div className="md:col-span-7 mr-1">
                        <div className="border-0 md:border-t pt-8">
                            <h2 className="text-2xl text-meli-dark mb-6">Descripción</h2>
                            <p className="text-meli-gray text-lg whitespace-pre-line leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-3 mt-0 md:mt-8">
                        <SellerPanel item={item} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
                    <div className="md:col-span-7 order-2 md:order-none mr-1">
                        <div className="border-t pt-8">
                            <h2 className="text-2xl text-meli-dark mb-3">Preguntas</h2>
                            <Questions item={item}/>
                        </div>
                        <div className="border-t pt-8">
                            <h2 className="text-2xl text-meli-dark mb-6">
                                Opiniones del producto
                            </h2>
                            <Reviews item={item} />
                        </div>
                    </div>

                    <div className="md:col-span-3 order-1 md:order-none mt-8">
                        <PaymentMethodsPanel item={item} />
                    </div>
                </div>
            </div>

            <PaymentMethodsModal
                isOpen={isModalOpen}
                onClose={closeModal}
                item={item}
            />
        </>
    );
};

export const ItemPage: React.FC = () => {
    return (
        <ItemProvider>
            <div className="max-w-7xl mx-auto py-0 md:py-4 px-0 md:px-4 font-sans">
                <Breadcrumbs />
                <PageContent />
            </div>
        </ItemProvider>
    );
};
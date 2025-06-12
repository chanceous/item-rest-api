export interface Item {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    formattedPrice: string;
    images: string[];
    condition: 'new' | 'used';
    stock: number;
    isAvailable: boolean;
    seller: {
        id: string;
        name: string;
        reputation: number;
        location: string;
    };
    paymentMethods: Array<{
        id: string;
        name: string;
        type: string;
    }>;
    shipping: {
        free: boolean;
        cost: number;
        estimatedDays: number;
    };
    rating?: number;
    reviewsCount?: number;
    reviews?: [];
}
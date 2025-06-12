import { Item } from '../../domain/entities/item.entity';

export class ItemResponseDto {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    formattedPrice: string;
    images: string[];
    condition: string;
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
    reviews: Array<{
        id: number;
        rating: number;
        date: string;
        review: string;
        likes: number;
    }>;

    static fromEntity(item: Item): ItemResponseDto {
        const dto = new ItemResponseDto();
        dto.id = item.id;
        dto.title = item.title;
        dto.description = item.description;
        dto.price = item.price;
        dto.currency = item.currency;
        dto.formattedPrice = item.formattedPrice;
        dto.images = item.images;
        dto.condition = item.condition;
        dto.stock = item.stock;
        dto.isAvailable = item.isAvailable;
        dto.seller = {
            id: item.seller.id,
            name: item.seller.name,
            reputation: item.seller.reputation,
            location: item.seller.location,
        };
        dto.paymentMethods = item.paymentMethods.map(pm => ({
            id: pm.id,
            name: pm.name,
            type: pm.type,
        }));
        dto.shipping = {
            free: item.shipping.free,
            cost: item.shipping.cost,
            estimatedDays: item.shipping.estimatedDays,
        };
        dto.rating = item.rating;
        dto.reviewsCount = item.reviewsCount;
        dto.reviews = item.reviews.map(rv => ({
            id: rv.id,
            rating: rv.rating,
            date: rv.date,
            review: rv.review,
            likes: rv.likes
        }))

        return dto;
    }
}
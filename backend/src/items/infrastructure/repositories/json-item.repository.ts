import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import {Item, Seller, PaymentMethod, Shipping, Review} from '../../domain/entities/item.entity';
import { ItemRepository } from '../../domain/repositories/item.repository';

@Injectable()
export class JsonItemRepository implements ItemRepository {
    private readonly dataPath = join(__dirname, '../../../data/items.json');

    async findById(id: string): Promise<Item | null> {
        const items = await this.loadItems();
        const itemData = items.find(item => item.id === id);

        return itemData ? this.mapToEntity(itemData) : null;
    }

    async findAll(): Promise<Item[]> {
        const items = await this.loadItems();
        return items.map(item => this.mapToEntity(item));
    }

    private async loadItems(): Promise<any[]> {
        try {
            const data = await fs.readFile(this.dataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading items:', error);
            return [];
        }
    }

    private mapToEntity(data: any): Item {
        const seller = new Seller(
            data.seller.id,
            data.seller.name,
            data.seller.reputation,
            data.seller.location,
        );

        const paymentMethods = data.paymentMethods.map(
            (pm: any) => new PaymentMethod(pm.id, pm.name, pm.type),
        );

        const shipping = new Shipping(
            data.shipping.free,
            data.shipping.cost,
            data.shipping.estimatedDays,
        );

        const reviews = data.reviews.map(
            (rv: any) => new Review(rv.id, rv.rating, rv.date, rv.review, rv.likes),
        );

        return new Item(
            data.id,
            data.title,
            data.description,
            data.price,
            data.currency,
            data.images,
            data.condition,
            data.stock,
            seller,
            paymentMethods,
            shipping,
            data.rating,
            data.reviewsCount,
            reviews
        );
    }
}
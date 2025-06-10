import { Item } from '../entities/item.entity';

export abstract class ItemRepository {
    abstract findById(id: string): Promise<Item | null>;
    abstract findAll(): Promise<Item[]>;
}
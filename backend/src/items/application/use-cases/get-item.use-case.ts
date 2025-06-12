import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../../domain/entities/item.entity';
import { ItemRepository } from '../../domain/repositories/item.repository';
import { ItemOutOfStockException } from '../../domain/exceptions/item-out-of-stock.exception';

@Injectable()
export class GetItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    async execute(id: string): Promise<Item> {
        const item = await this.itemRepository.findById(id);

        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }

        if (!item.isAvailable) {
            throw new ItemOutOfStockException(id);
        }

        return item;
    }
}
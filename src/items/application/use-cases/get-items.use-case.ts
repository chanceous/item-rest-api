import { Injectable } from '@nestjs/common';
import { Item } from '../../domain/entities/item.entity';
import { ItemRepository } from '../../domain/repositories/item.repository';

@Injectable()
export class GetItemsUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    async execute(): Promise<Item[]> {
        return this.itemRepository.findAll();
    }
}
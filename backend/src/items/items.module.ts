import { Module } from '@nestjs/common';
import { ItemsController } from './presentation/controllers/items.controller';
import { GetItemUseCase } from './application/use-cases/get-item.use-case';
import { GetItemsUseCase } from './application/use-cases/get-items.use-case';
import { ItemRepository } from './domain/repositories/item.repository';
import { JsonItemRepository } from './infrastructure/repositories/json-item.repository';

@Module({
    controllers: [ItemsController],
    providers: [
        GetItemUseCase,
        GetItemsUseCase,
        {
            provide: ItemRepository,
            useClass: JsonItemRepository,
        },
    ],
    exports: [GetItemUseCase],
})
export class ItemsModule {}
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GetItemUseCase } from '../../application/use-cases/get-item.use-case';
import { GetItemsUseCase } from '../../application/use-cases/get-items.use-case';
import { ItemResponseDto } from '../dto/item-response.dto';

@Controller('items')
@UseGuards(ThrottlerGuard)
export class ItemsController {
    constructor(
        private readonly getItemUseCase: GetItemUseCase,
        private readonly getItemsUseCase: GetItemsUseCase,
    ) {}

    @Get()
    async findAll(): Promise<ItemResponseDto[]> {
        const items = await this.getItemsUseCase.execute();
        return items.map(item => ItemResponseDto.fromEntity(item));
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ItemResponseDto> {
        const item = await this.getItemUseCase.execute(id);
        return ItemResponseDto.fromEntity(item);
    }
}
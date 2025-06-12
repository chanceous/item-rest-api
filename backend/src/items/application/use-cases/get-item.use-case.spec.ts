import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetItemUseCase } from './get-item.use-case';
import { ItemRepository } from '../../domain/repositories/item.repository';
import { Item, Seller, PaymentMethod, Shipping } from '../../domain/entities/item.entity';
import { ItemOutOfStockException } from '../../domain/exceptions/item-out-of-stock.exception';

describe('GetItemUseCase', () => {
    let useCase: GetItemUseCase;
    let repository: jest.Mocked<ItemRepository>;

    const mockSeller = new Seller('seller1', 'Test Seller', 4.5, 'Buenos Aires');
    const mockPaymentMethods = [new PaymentMethod('visa', 'Visa', 'credit_card')];
    const mockShipping = new Shipping(true, 0, 2);

    const mockItem = new Item(
        'test-id',
        'Test Item',
        'Test Description',
        100000,
        'ARS',
        ['image1.jpg'],
        'new',
        10,
        mockSeller,
        mockPaymentMethods,
        mockShipping,
    );

    const mockItemOutOfStock = new Item(
        'no-stock-id',
        'Item Sin Stock',
        'Descripción...',
        50000,
        'ARS',
        ['image.jpg'],
        'new',
        0,
        mockSeller,
        mockPaymentMethods,
        mockShipping,
    );

    beforeEach(async () => {
        const mockRepository = {
            findById: jest.fn(),
            findAll: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetItemUseCase,
                {
                    provide: ItemRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        useCase = module.get<GetItemUseCase>(GetItemUseCase);
        repository = module.get(ItemRepository);
    });

    it('should return item when found and available', async () => {
        repository.findById.mockResolvedValue(mockItem);
        const result = await useCase.execute('test-id');
        expect(result).toBe(mockItem);
        expect(repository.findById).toHaveBeenCalledWith('test-id');
    });

    it('should throw NotFoundException when item not found', async () => {
        repository.findById.mockResolvedValue(null);
        await expect(useCase.execute('non-existent')).rejects.toThrow(NotFoundException);
    });

    it('should throw ItemOutOfStockException when item is not available', async () => {
        repository.findById.mockResolvedValue(mockItemOutOfStock);

        await expect(useCase.execute('no-stock-id')).rejects.toThrow(ItemOutOfStockException);
        await expect(useCase.execute('no-stock-id')).rejects.toThrow(
            'Item with ID no-stock-id is out of stock.',
        );
    });
});
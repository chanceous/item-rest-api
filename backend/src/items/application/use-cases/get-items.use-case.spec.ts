import { Test, TestingModule } from '@nestjs/testing';
import { GetItemsUseCase } from './get-items.use-case';
import { ItemRepository } from '../../domain/repositories/item.repository';
import { Item, Seller, PaymentMethod, Shipping } from '../../domain/entities/item.entity';

describe('GetItemsUseCase', () => {
    let useCase: GetItemsUseCase;
    let repository: jest.Mocked<ItemRepository>;

    const mockSeller = new Seller('seller1', 'Test Seller', 4.5, 'Buenos Aires');
    const mockPaymentMethods = [new PaymentMethod('visa', 'Visa', 'credit_card')];
    const mockShipping = new Shipping(true, 0, 2);

    const mockItems = [
        new Item(
            'test-id-1',
            'Test Item 1',
            'Test Description 1',
            100000,
            'ARS',
            ['image1.jpg'],
            'new',
            10,
            mockSeller,
            mockPaymentMethods,
            mockShipping
        ),
        new Item(
            'test-id-2',
            'Test Item 2',
            'Test Description 2',
            200000,
            'ARS',
            ['image2.jpg'],
            'used',
            5,
            mockSeller,
            mockPaymentMethods,
            mockShipping
        ),
    ];

    beforeEach(async () => {
        const mockRepository = {
            findById: jest.fn(),
            findAll: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetItemsUseCase,
                {
                    provide: ItemRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        useCase = module.get<GetItemsUseCase>(GetItemsUseCase);
        repository = module.get(ItemRepository);
    });

    it('should return all items', async () => {
        repository.findAll.mockResolvedValue(mockItems);

        const result = await useCase.execute();

        expect(result).toEqual(mockItems);
        expect(result).toHaveLength(2);
        expect(repository.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no items found', async () => {
        repository.findAll.mockResolvedValue([]);

        const result = await useCase.execute();

        expect(result).toEqual([]);
        expect(repository.findAll).toHaveBeenCalled();
    });
});
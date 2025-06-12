import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ItemsController } from './items.controller';
import { GetItemUseCase } from '../../application/use-cases/get-item.use-case';
import { GetItemsUseCase } from '../../application/use-cases/get-items.use-case';
import { Item, Seller, PaymentMethod, Shipping } from '../../domain/entities/item.entity';

describe('ItemsController', () => {
    let controller: ItemsController;
    let getItemUseCase: jest.Mocked<GetItemUseCase>;
    let getItemsUseCase: jest.Mocked<GetItemsUseCase>;

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
        mockShipping
    );

    beforeEach(async () => {
        const mockGetItemUseCase = {
            execute: jest.fn(),
        };

        const mockGetItemsUseCase = {
            execute: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemsController],
            providers: [
                {
                    provide: GetItemUseCase,
                    useValue: mockGetItemUseCase,
                },
                {
                    provide: GetItemsUseCase,
                    useValue: mockGetItemsUseCase,
                },
            ],
        })
            .overrideGuard(ThrottlerGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<ItemsController>(ItemsController);
        getItemUseCase = module.get(GetItemUseCase);
        getItemsUseCase = module.get(GetItemsUseCase);
    });

    it('should return single item', async () => {
        getItemUseCase.execute.mockResolvedValue(mockItem);

        const result = await controller.findOne('test-id');

        expect(result.id).toBe('test-id');
        expect(result.title).toBe('Test Item');
        expect(getItemUseCase.execute).toHaveBeenCalledWith('test-id');
    });

    it('should return all items', async () => {
        getItemsUseCase.execute.mockResolvedValue([mockItem]);

        const result = await controller.findAll();

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('test-id');
        expect(getItemsUseCase.execute).toHaveBeenCalled();
    });
});
import { JsonItemRepository } from './json-item.repository';
import { Item } from '../../domain/entities/item.entity';
import { promises as fs } from 'fs';

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
    },
}));

const mockFs = fs as jest.Mocked<typeof fs>;

describe('JsonItemRepository', () => {
    let repository: JsonItemRepository;
    let consoleErrorSpy: jest.SpyInstance;

    const mockJsonData = [
        {
            id: 'item-1',
            title: 'Test Item 1',
            price: 100,
            seller: { id: 'seller-1', name: 'Test Seller' },
            paymentMethods: [{ id: 'visa', name: 'Visa' }],
            shipping: { free: true },
        },
    ];

    beforeEach(() => {
        repository = new JsonItemRepository();
        jest.clearAllMocks();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    describe('findAll', () => {
        it('should return all items when file exists', async () => {
            mockFs.readFile.mockResolvedValue(JSON.stringify(mockJsonData));
            const result = await repository.findAll();
            expect(result.length).toBe(1);
            expect(result[0]).toBeInstanceOf(Item);
        });

        it('should return empty array when file read fails', async () => {
            mockFs.readFile.mockRejectedValue(new Error('File not found'));
            const result = await repository.findAll();
            expect(result).toEqual([]);
            expect(consoleErrorSpy).toHaveBeenCalled();
        });
    });

    describe('findById', () => {
        it('should return item when found', async () => {
            mockFs.readFile.mockResolvedValue(JSON.stringify(mockJsonData));
            const result = await repository.findById('item-1');
            expect(result).toBeInstanceOf(Item);
            expect(result?.id).toBe('item-1');
        });

        it('should return null when item not found', async () => {
            mockFs.readFile.mockResolvedValue(JSON.stringify(mockJsonData));
            const result = await repository.findById('non-existent-id');
            expect(result).toBeNull();
        });

        it('should return null when file read fails', async () => {
            mockFs.readFile.mockRejectedValue(new Error('File not found'));
            const result = await repository.findById('item-1');
            expect(result).toBeNull();
            expect(consoleErrorSpy).toHaveBeenCalled();
        });
    });
});
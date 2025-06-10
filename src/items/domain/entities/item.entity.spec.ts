import { Item, Seller, PaymentMethod, Shipping } from './item.entity';

describe('Item Entity', () => {
    const mockSeller = new Seller('seller1', 'Test Seller', 4.5, 'Buenos Aires');
    const mockPaymentMethods = [new PaymentMethod('visa', 'Visa', 'credit_card')];
    const mockShipping = new Shipping(true, 0, 2);

    it('should format price correctly', () => {
        const item = new Item(
            'test-id',
            'Test Item',
            'Description',
            100000,
            'ARS',
            ['image1.jpg'],
            'new',
            10,
            mockSeller,
            mockPaymentMethods,
            mockShipping
        );

        expect(item.formattedPrice).toBe('ARS 100,000');
    });

    it('should return true for isAvailable when stock > 0', () => {
        const item = new Item(
            'test-id',
            'Test Item',
            'Description',
            100000,
            'ARS',
            ['image1.jpg'],
            'new',
            5,
            mockSeller,
            mockPaymentMethods,
            mockShipping
        );

        expect(item.isAvailable).toBe(true);
    });

    it('should return false for isAvailable when stock = 0', () => {
        const item = new Item(
            'test-id',
            'Test Item',
            'Description',
            100000,
            'ARS',
            ['image1.jpg'],
            'new',
            0,
            mockSeller,
            mockPaymentMethods,
            mockShipping
        );

        expect(item.isAvailable).toBe(false);
    });
});
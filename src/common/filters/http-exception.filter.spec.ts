import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { ItemOutOfStockException } from '../../items/domain/exceptions/item-out-of-stock.exception';

describe('HttpExceptionFilter', () => {
    let filter: HttpExceptionFilter;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;
    let mockGetResponse: jest.Mock;

    beforeEach(() => {
        filter = new HttpExceptionFilter();
        mockJson = jest.fn();
        mockStatus = jest.fn(() => ({ json: mockJson }));
        mockGetResponse = jest.fn(() => ({
            status: mockStatus,
        }));
    });

    const mockArgumentsHost = {
        switchToHttp: () => ({
            getResponse: mockGetResponse,
            getRequest: () => ({ url: '/test' }),
        }),
    } as any;

    it('should format a standard HttpException correctly', () => {
        const exception = new HttpException('Not Found', HttpStatus.NOT_FOUND);

        filter.catch(exception, mockArgumentsHost);

        expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
        expect(mockJson).toHaveBeenCalledWith({
            statusCode: HttpStatus.NOT_FOUND,
            timestamp: expect.any(String),
            path: '/test',
            message: 'Not Found',
            code: 'HTTP_EXCEPTION',
        });
    });

    it('should format our custom ItemOutOfStockException correctly', () => {
        const exception = new ItemOutOfStockException('item-123');

        filter.catch(exception, mockArgumentsHost);

        expect(mockStatus).toHaveBeenCalledWith(HttpStatus.CONFLICT);
        expect(mockJson).toHaveBeenCalledWith({
            statusCode: HttpStatus.CONFLICT,
            timestamp: expect.any(String),
            path: '/test',
            message: 'Item with ID item-123 is out of stock.',
            code: 'ITEM_OUT_OF_STOCK',
        });
    });
});
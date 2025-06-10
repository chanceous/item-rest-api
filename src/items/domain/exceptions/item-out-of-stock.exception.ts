import { HttpException, HttpStatus } from '@nestjs/common';

export class ItemOutOfStockException extends HttpException {
    constructor(itemId: string) {
        super(
            {
                message: `Item with ID ${itemId} is out of stock.`,
                code: 'ITEM_OUT_OF_STOCK',
            },
            HttpStatus.CONFLICT,
        );
    }
}
import { HttpException, HttpStatus } from '@nestjs/common';

export class RateLimitException extends HttpException {
    constructor(
        message: string = 'You have exceeded the request limit. Please try again later.',
        code: string = 'RATE_LIMIT_EXCEEDED',
    ) {
        super(
            {
                message,
                code,
                statusCode: HttpStatus.TOO_MANY_REQUESTS,
            },
            HttpStatus.TOO_MANY_REQUESTS,
        );
    }
}
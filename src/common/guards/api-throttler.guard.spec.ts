import { ApiThrottlerGuard } from './api-throttler.guard';
import { RateLimitException } from '../exceptions/rate-limit.exception';

describe('ApiThrottlerGuard', () => {
    let guard: ApiThrottlerGuard;

    beforeEach(() => {
        guard = new ApiThrottlerGuard(
            [{ limit: 10, ttl: 60000 }],
            jest.fn() as any,
            jest.fn() as any,
        );
    });

    it('should throw RateLimitException when throttling', async () => {
        await expect(
            (guard as any).throwThrottlingException(),
        ).rejects.toBeInstanceOf(RateLimitException);
    });
});
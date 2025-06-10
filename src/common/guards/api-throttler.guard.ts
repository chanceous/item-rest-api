import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RateLimitException } from '../exceptions/rate-limit.exception';

@Injectable()
export class ApiThrottlerGuard extends ThrottlerGuard {
    protected async throwThrottlingException(
        context: ExecutionContext,
    ): Promise<void> {
        throw new RateLimitException();
    }

    protected async getTracker(req: Record<string, any>): Promise<string> {
        return req.ips.length ? req.ips[0] : req.ip;
    }
}
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface EnvelopedResponse<T> {
    statusCode: number;
    data: T;
}

@Injectable()
export class TransformResponseInterceptor<T>
    implements NestInterceptor<T, EnvelopedResponse<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<EnvelopedResponse<T>> {
        const statusCode = context.switchToHttp().getResponse().statusCode;

        return next.handle().pipe(
            map(data => ({
                statusCode: statusCode,
                data: data,
            })),
        );
    }
}
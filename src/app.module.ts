import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ItemsModule } from './items/items.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiThrottlerGuard } from './common/guards/api-throttler.guard';

@Module({
    imports: [
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 50,
            },
        ]),
        ItemsModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ApiThrottlerGuard,
        },
    ],
})
export class AppModule {}
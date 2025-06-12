import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { ItemsModule } from './items.module';
import { ItemsController } from './presentation/controllers/items.controller';
import { GetItemUseCase } from './application/use-cases/get-item.use-case';

describe('ItemsModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                ItemsModule,
                ThrottlerModule.forRoot([
                    {
                        ttl: 60000,
                        limit: 50,
                    },
                ]),
            ],
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should provide the ItemsController and its dependencies', () => {
        const controller = module.get<ItemsController>(ItemsController);
        const useCase = module.get<GetItemUseCase>(GetItemUseCase);
        expect(controller).toBeDefined();
        expect(useCase).toBeDefined();
    });
});
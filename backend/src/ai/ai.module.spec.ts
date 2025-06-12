import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { AiModule } from './ai.module';
import { AiController } from './presentation/controllers/ai.controller';
import { AnswerQuestion } from './application/use-cases/answer-question.use-case';

describe('AiModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                AiModule,
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

    it('should provide the AiController and its dependencies', () => {
        const controller = module.get<AiController>(AiController);
        const service = module.get<AnswerQuestion>(AnswerQuestion);
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });
});
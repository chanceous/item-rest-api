import { Test, TestingModule } from '@nestjs/testing';
import { AiController } from './ai.controller';
import { AnswerQuestion } from '../../application/use-cases/answer-question.use-case';
import { QuestionsDto } from '../dto/questions.dto';

describe('AiController', () => {
    let controller: AiController;
    let service: jest.Mocked<AnswerQuestion>;

    const mockAnswerQuestion = {
        execute: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AiController],
            providers: [
                {
                    provide: AnswerQuestion,
                    useValue: mockAnswerQuestion,
                },
            ],
        }).compile();

        controller = module.get<AiController>(AiController);
        service = module.get(AnswerQuestion);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('resumeReviews', () => {
        it('should call the AnswerQuestion service and return the response wrapped in a message object', async () => {
            const questionsDto: QuestionsDto = {
                itemId: 'MLA123',
                question: '¿Tienen stock?',
            };
            const expectedResult = 'Sí, tenemos stock, puede ofertar sin problemas.';

            service.execute.mockResolvedValue(expectedResult);

            const response = await controller.resumeReviews(questionsDto);

            expect(service.execute).toHaveBeenCalledWith(questionsDto.itemId, questionsDto.question);
            expect(service.execute).toHaveBeenCalledTimes(1);
            expect(response).toEqual({ message: expectedResult });
        });
    });
});
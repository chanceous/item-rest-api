import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { AnswerQuestion } from './answer-question.use-case';
import { GetItemUseCase } from '../../../items/application/use-cases/get-item.use-case';
import { Item, Seller, PaymentMethod, Shipping } from '../../../items/domain/entities/item.entity';

const mockSeller = new Seller('seller1', 'Test Seller', 4.5, 'Buenos Aires');
const mockPaymentMethods = [new PaymentMethod('visa', 'Visa', 'credit_card')];
const mockShipping = new Shipping(true, 0, 2);
const mockItem = new Item(
    'test-id',
    'Test Item',
    'Test Description',
    100000,
    'ARS',
    ['image1.jpg'],
    'new',
    10,
    mockSeller,
    mockPaymentMethods,
    mockShipping,
);

describe('AnswerQuestion Service', () => {
    let service: AnswerQuestion;
    let getItemUseCase: jest.Mocked<GetItemUseCase>;
    let httpService: jest.Mocked<HttpService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnswerQuestion,
                { provide: GetItemUseCase, useValue: { execute: jest.fn() } },
                { provide: HttpService, useValue: { post: jest.fn() } },
            ],
        }).compile();

        service = module.get<AnswerQuestion>(AnswerQuestion);
        getItemUseCase = module.get(GetItemUseCase);
        httpService = module.get(HttpService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('execute', () => {
        const itemId = 'test-id';
        const question = '¿Tienen stock?';

        it('should return an AI-generated answer on success', async () => {
            const aiResponse = '¡Hola! Sí, tenemos stock. ¡Aprovechá y comprá ahora!';
            const mockGroqResponse: AxiosResponse = {
                data: { choices: [{ message: { content: aiResponse } }] },
                status: 200, statusText: 'OK', headers: {}, config: { headers: {} as any },
            };
            getItemUseCase.execute.mockResolvedValue(mockItem);
            httpService.post.mockReturnValue(of(mockGroqResponse));

            const result = await service.execute(itemId, question);

            expect(result).toBe(aiResponse.trim());
        });

        describe('when handling errors', () => {
            let consoleErrorSpy: jest.SpyInstance;

            beforeEach(() => {
                consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            });

            afterEach(() => {
                consoleErrorSpy.mockRestore();
            });

            it('should throw InternalServerErrorException and log error if HttpService fails', async () => {
                getItemUseCase.execute.mockResolvedValue(mockItem);
                const error = new Error('Network Error');
                httpService.post.mockReturnValue(throwError(() => ({ response: {}, status: 500, ...error } as AxiosError)));

                await expect(service.execute(itemId, question)).rejects.toThrow(InternalServerErrorException);

                expect(consoleErrorSpy).toHaveBeenCalled();
            });

            it('should throw an error and log it if GetItemUseCase fails', async () => {
                const error = new NotFoundException('Item no encontrado');
                getItemUseCase.execute.mockRejectedValue(error);

                await expect(service.execute(itemId, question)).rejects.toThrow(NotFoundException);
                expect(consoleErrorSpy).toHaveBeenCalledWith('Error al responder:', 'Item no encontrado');
            });
        });

        it('should return a default message if AI response is empty', async () => {
            const mockGroqResponse: AxiosResponse = { data: { choices: [] }, status: 200, statusText: 'OK', headers: {}, config: { headers: {} as any }};
            getItemUseCase.execute.mockResolvedValue(mockItem);
            httpService.post.mockReturnValue(of(mockGroqResponse));

            const result = await service.execute(itemId, question);

            expect(result).toBe('No se pudo generar un resumen.');
        });
    });
});
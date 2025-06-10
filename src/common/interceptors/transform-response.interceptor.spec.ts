import { of } from 'rxjs';
import { TransformResponseInterceptor } from './transform-response.interceptor';
import { CallHandler } from '@nestjs/common';

describe('TransformResponseInterceptor', () => {
    let interceptor: TransformResponseInterceptor<any>;

    beforeEach(() => {
        interceptor = new TransformResponseInterceptor();
    });

    it('should wrap the response object in a "data" property', (done) => {
        const mockResponseData = { id: '123', title: 'Test Item' };

        const callHandler: CallHandler = {
            handle: () => of(mockResponseData),
        };

        const mockExecutionContext = {
            switchToHttp: () => ({
                getRequest: () => ({}), // Mock de la petición
                getResponse: () => ({}), // Mock de la respuesta
            }),
        };

        interceptor.intercept(mockExecutionContext as any, callHandler).subscribe(response => {

            expect(response).toEqual({ data: mockResponseData });
            done();
        });
    });
});
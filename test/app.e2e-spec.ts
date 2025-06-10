import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ItemsController (e2e)', () => {
    let app: INestApplication;
    const API_PREFIX = '/api/v1';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix(API_PREFIX.substring(1));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe(`GET ${API_PREFIX}/items`, () => {
        it('should return an array of items with status code 200', async () => {
            const response = await request(app.getHttpServer())
                .get(`${API_PREFIX}/items`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('title');
            expect(response.body[0]).toHaveProperty('price');
        });
    });

    describe(`GET ${API_PREFIX}/items/:id`, () => {
        it('should return an existing item (Elder Wand) with status code 200', async () => {
            const itemId = 'MLA1400921865';
            const response = await request(app.getHttpServer())
                .get(`${API_PREFIX}/items/${itemId}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', itemId);
            expect(response.body).toHaveProperty('title', 'Varita de Sauco 100% real no fake');
            expect(response.body).toHaveProperty('seller');
            expect(response.body).toHaveProperty('paymentMethods');
            expect(response.body).toHaveProperty('stock', 1);
        });

        it('should return a 409 Conflict for an out-of-stock item (Nike Sneakers)', async () => {
            const itemId = 'MLA1574805028';
            const response = await request(app.getHttpServer())
                .get(`${API_PREFIX}/items/${itemId}`)
                .expect(409);

            expect(response.body).toHaveProperty('code', 'ITEM_OUT_OF_STOCK');
            expect(response.body).toHaveProperty('message', `Item with ID ${itemId} is out of stock.`);
        });


        it('should return a 404 status code for a non-existing item', async () => {
            await request(app.getHttpServer())
                .get(`${API_PREFIX}/items/NON-EXISTENT-ID-XYZ`)
                .expect(404);
        });

        it('should return a clear error message for a non-existing item (404)', async () => {
            const response = await request(app.getHttpServer())
                .get(`${API_PREFIX}/items/NON-EXISTENT-ID-XYZ`)
                .expect(404);

            expect(response.body).toHaveProperty('statusCode', 404);
            expect(response.body).toHaveProperty('message', expect.stringMatching(/^Item with ID .* not found$/));
            expect(response.body).toHaveProperty('error', 'Not Found');
        });
    });
});
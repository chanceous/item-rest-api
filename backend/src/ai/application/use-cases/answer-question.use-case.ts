import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetItemUseCase } from '../../../items/application/use-cases/get-item.use-case';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GROQ_API_URL, GROQ_MODEL, GROQ_TOKEN } from "@/config";

@Injectable()
export class AnswerQuestion {
    constructor(
        private readonly getItemUseCase: GetItemUseCase,
        private readonly httpService: HttpService,
    ) {}

    async execute(itemId: string, question: string): Promise<string> {
        try {
            const item = await this.getItemUseCase.execute(itemId);

            const prompt = `
                Eres un vendedor profesional. Eres ${item.seller.name}.
                Se breve respondiendo.
                Siempre respondés con un tono cordial, claro y persuasivo. 
                Tu tarea es generar una respuesta vendedora en español para el siguiente producto, incluyendo:
                    - Un saludo inicial
                    - Una descripción atractiva del producto destacando sus características principales (no inventes características que no se mencionan).
                    - Detalles importantes: condición del producto (${item.condition === 'new' ? 'Nuevo' : 'Usado'}), precio (${item.formattedPrice}), stock disponible (${item.stock} unidades).
                    - Una llamada a la acción clara para invitar a comprar o seguir consultando.

                Aquí están los datos del producto:
                    - Título: ${item.title}
                    - Condición: ${item.condition === 'new' ? 'Nuevo' : 'Usado'}
                    - Precio: ${item.formattedPrice}
                    - Stock disponible: ${item.stock} unidades
                   
                Medios de pago habilitados:
                    - ${item.paymentMethods} 
                
                El mensaje que debes responder es: ${question}
            `;

            const response = await firstValueFrom(
                this.httpService.post(
                    GROQ_API_URL,
                    {
                        model: GROQ_MODEL,
                        messages: [{ role: 'user', content: prompt }],
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${GROQ_TOKEN}`,
                        },
                    },
                ),
            );

            return response.data.choices[0]?.message?.content.trim() || 'No se pudo generar un resumen.';

        } catch (error) {
            console.error('Error al responder:', error.response?.data || error.message);

            if (error.status !== 500) {
                throw error;
            }

            throw new InternalServerErrorException('Hubo un problema al contactar el servicio de IA.');
        }
    }
}
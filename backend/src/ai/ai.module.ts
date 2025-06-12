import { Module } from '@nestjs/common';
import { ItemsModule } from '../items/items.module';
import { AiController } from './presentation/controllers/ai.controller';
import { AnswerQuestion } from './application/use-cases/answer-question.use-case';
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        ItemsModule,
        HttpModule
    ],
    controllers: [AiController],
    providers: [AnswerQuestion],
})
export class AiModule {}
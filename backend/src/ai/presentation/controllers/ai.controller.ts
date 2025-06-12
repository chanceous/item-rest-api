import { Controller, Post, Body } from '@nestjs/common';
import { AnswerQuestion } from '../../application/use-cases/answer-question.use-case';
import { QuestionsDto } from "@/ai/presentation/dto/questions.dto";

@Controller('ai')
export class AiController {
    constructor(
        private readonly generateAnswers: AnswerQuestion,
    ) {}

    @Post('questions')
    async resumeReviews(@Body() questionsDto: QuestionsDto) {
        const { itemId, question } = questionsDto;
        const resume = await this.generateAnswers.execute(itemId, question);
        return { message: resume };
    }
}
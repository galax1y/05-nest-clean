import { QuestionsRepository } from '../repositories/questions-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    question: Question
  }
>

@Injectable()
export class ChooseQuestionBestAnswerUseCase {
  // Dependency Injection - Repository Pattern
  constructor(
    private answersRepository: AnswersRepository,
    private questionRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toValue(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return right({ question })
  }
}

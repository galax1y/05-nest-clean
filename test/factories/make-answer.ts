import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAnswerMapper } from '@/infra/database/prisma/mappers/prisma-answer-mapper'

// Partial torna todos os campos opcionais
export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      // Propriedades padrões
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),

      ...override, // Se houver algo no override, ela sobrescreve as propriedades padrões
    },
    id,
  )

  return answer
}

@Injectable()
export class AnswerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswer(data: Partial<AnswerProps> = {}): Promise<Answer> {
    const answer = makeAnswer(data)

    await this.prisma.answer.create({
      data: PrismaAnswerMapper.toPrisma(answer),
    })

    return answer
  }
}

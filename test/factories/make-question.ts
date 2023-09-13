import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

// Partial torna todos os campos opcionais
export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      // Propriedades padrões
      authorId: new UniqueEntityID('1'),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),

      ...override, // Se houver algo no override, ela sobrescreve as propriedades padrões
    },
    id,
  )

  return question
}

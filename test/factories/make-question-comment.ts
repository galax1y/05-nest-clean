import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment'

// Partial torna todos os campos opcionais
export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  const questionComment = QuestionComment.create(
    {
      // Propriedades padrões
      authorId: new UniqueEntityID('1'),
      questionId: new UniqueEntityID('1'),
      content: faker.lorem.text(),

      ...override, // Se houver algo no override, ela sobrescreve as propriedades padrões
    },
    id,
  )

  return questionComment
}

import { QuestionComment } from '../../enterprise/entities/question-comment'
import { PaginationParams } from '@/core/repositories/pagination-params'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
  findById(commentId: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
}

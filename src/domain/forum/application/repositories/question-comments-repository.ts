import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { PaginationParams } from '@/core/repositories/pagination-params'

export abstract class QuestionCommentsRepository {
  abstract create(questionComment: QuestionComment): Promise<void>
  abstract delete(questionComment: QuestionComment): Promise<void>
  abstract findById(commentId: string): Promise<QuestionComment | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>
}

import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'

import { PrismaService } from '../prisma.service'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper'

import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)

    await this.prisma.comment.create({
      data,
    })
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: questionComment.id.toString(),
      },
    })
  }

  async findById(commentId: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    })

    if (!questionComment) {
      return null
    }

    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComments = await this.prisma.comment.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionComments.map(PrismaQuestionCommentMapper.toDomain)
  }
}

import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

// A Mapper is a class responsible for the conversion of data structures between the layers of the application

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Invalid attachment type.')
    }

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        questionId: new UniqueEntityID(raw.questionId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrismaUpdateMany(
    attachments: QuestionAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) => {
      return attachment.id.toString()
    })

    return {
      where: {
        id: {
          in: attachmentIds, // Update attachment if id matches any of the ids in 'attachmentIds' array
        },
      },
      data: {
        questionId: attachments[0].questionId.toString(), // questionId was null, and now it will be linked with a question
      },
    }
  }
}

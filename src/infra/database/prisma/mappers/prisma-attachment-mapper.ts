import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Attachment as PrismaAttachment, Prisma } from '@prisma/client'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

// A Mapper is a class responsible for the conversion of data structures between the layers of the application

export class PrismaAttachmentMapper {
  static toPrisma(
    attachment: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }

  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    )
  }
}

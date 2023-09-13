import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'

export interface CommentProps {
  authorId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

// Classe abstrata não pode ser instanciada, mas pode conter implementação de métodos
export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  // Se algum setter for ativado, o campo updatedAt deve ser atualizado
  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(newContent: string) {
    this.props.content = newContent
    this.touch()
  }
}

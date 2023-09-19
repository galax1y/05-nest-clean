import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/student'
import { PrismaStudentMapper } from '@/infra/database/prisma/mappers/prisma-student-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

// Partial torna todos os campos opcionais
export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID,
) {
  const student = Student.create(
    {
      // Propriedades padrões
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),

      ...override, // Se houver algo no override, ela sobrescreve as propriedades padrões
    },
    id,
  )

  return student
}

@Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.prisma.user.create({
      data: PrismaStudentMapper.toPrisma(student),
    })

    return student
  }
}

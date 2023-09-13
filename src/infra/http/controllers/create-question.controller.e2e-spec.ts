import { test, describe } from 'vitest'
import request from 'supertest'

import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { AppModule } from '@/infra/app.module'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/infra/prisma/prisma.service'

describe('Create question (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Test user',
        email: 'user@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Test question',
        content: 'Test question content.',
      })

    expect(response.statusCode).toBe(201)

    const question = await prisma.question.findFirst({
      where: {
        title: 'Test question',
      },
    })

    expect(question).toBeTruthy()
  })
})

import { test, describe } from 'vitest'
import request from 'supertest'

import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { AppModule } from '@/infra/app.module'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/infra/prisma/prisma.service'

describe('Fetch questions (e2e)', () => {
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

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Test user',
        email: 'user@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          title: 'first question',
          slug: 'first-question',
          content: 'first question content',
          authorId: user.id,
        },
        {
          title: 'second question',
          slug: 'second-question',
          content: 'second question content',
          authorId: user.id,
        },
        {
          title: 'third question',
          slug: 'third-question',
          content: 'third question content',
          authorId: user.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'first question' }),
        expect.objectContaining({ title: 'second question' }),
        expect.objectContaining({ title: 'third question' }),
      ],
    })
  })
})

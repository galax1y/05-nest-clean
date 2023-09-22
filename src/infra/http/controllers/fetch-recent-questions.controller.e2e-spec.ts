import request from 'supertest'
import { test, describe } from 'vitest'
import { StudentFactory } from 'test/factories/make-student'
import { QuestionFactory } from 'test/factories/make-question'

import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch questions (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await Promise.all([
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'first question',
      }),
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'second question',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'second question' }),
        expect.objectContaining({ title: 'first question' }),
      ],
    })
  })
})

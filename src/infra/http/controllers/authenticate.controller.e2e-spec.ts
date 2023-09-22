import { hash } from 'bcryptjs'
import { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { Test } from '@nestjs/testing'
import { test, describe, expect } from 'vitest'
import { StudentFactory } from 'test/factories/make-student'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Authenticate (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await studentFactory.makePrismaStudent({
      email: 'user@example.com',
      password: await hash('123456', 8),
    })

    // Authenticate
    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'user@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})

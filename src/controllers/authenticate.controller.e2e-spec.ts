import { test, describe, expect } from 'vitest'
import request from 'supertest'

import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { hash } from 'bcryptjs'

describe('Authenticate (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    // Create a user to be authenticated
    await prisma.user.create({
      data: {
        name: 'Test user',
        email: 'user@example.com',
        password: await hash('123456', 8),
      },
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

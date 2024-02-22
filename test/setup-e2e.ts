import { config } from 'dotenv'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

import { DomainEvents } from '@/core/events/domain-events'
import { envSchema } from '@/infra/env/env'

import { beforeAll, afterAll } from 'vitest'

import { PrismaClient } from '@prisma/client'
import { Redis } from 'ioredis'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const env = envSchema.parse(process.env)

const prisma = new PrismaClient()
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL environment variable.')
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaUUID = randomUUID()

// Generate a schema for every e2e test
beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaUUID)

  process.env.DATABASE_URL = databaseURL

  DomainEvents.shouldRun = false

  await redis.flushdb()

  execSync('npx prisma migrate deploy')
})

// Clear it after the test is done
// prettier-ignore
afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaUUID}" CASCADE`)
  await prisma.$disconnect()
})

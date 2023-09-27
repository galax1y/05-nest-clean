import { config } from 'dotenv'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

import { beforeAll, afterAll } from 'vitest'

import { PrismaClient } from '@prisma/client'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaUUID = randomUUID()

// Generate a schema for every e2e test
beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaUUID)

  process.env.DATABASE_URL = databaseURL

  execSync('npx prisma migrate deploy')
})

// Clear it after the test is done
// prettier-ignore
afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaUUID}" CASCADE`)
  await prisma.$disconnect()
})

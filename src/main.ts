import { Env } from './env'

import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService: ConfigService<Env> = app.get(ConfigService)
  const port = configService.get('PORT')

  await app.listen(port)
}

bootstrap()

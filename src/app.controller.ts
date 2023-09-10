import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

// Decorador @Controller e decoradores de rotas podem receber strings para customizar o nome de acesso das rotas.
@Controller()
export class AppController {
  // Inversão de dependências
  constructor(
    private appService: AppService,
    private prismaService: PrismaService,
  ) {}

  // Decorador de rota @Get
  @Get()
  hello(): string {
    return this.appService.helloWorld()
  }

  @Post('/users')
  async users() {
    return await this.prismaService.user.findMany()
  }
}

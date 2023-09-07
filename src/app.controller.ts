import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

// Decorador @Controller e decoradores de rotas podem receber strings para customizar o nome de acesso das rotas.
@Controller()
export class AppController {
  // Inversão de dependências
  constructor(private readonly appService: AppService) {}

  // Decorador de rota @Get
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}

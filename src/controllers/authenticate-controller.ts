import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  // @HttpCode(201)
  // @UsePipes(new ZodValidationPipe())
  @Post()
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' })

    return token
  }
}

import { z } from 'zod'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { EnvService } from '../env/env.service'

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EnvService) {
    const publicKey = config.get('JWT_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  // If there a token exists, but there is no uuid inside token's sub, throws an error.
  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload)
  }
}

import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'

// Cryptography stub implementation

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}

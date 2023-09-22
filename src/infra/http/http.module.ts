import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

import { EditAnswerController } from './controllers/edit-answer.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'

import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    EditAnswerController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    EditAnswerUseCase,
  ],
})
export class HttpModule {}
